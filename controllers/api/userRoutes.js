const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  const allUsers = User.findAll();
  res.status(200).json(allUsers);
});

router.post('/', async (req, res) => { //creates a new user
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => { //logs in to an existing user
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect Username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect Username or password, please try again' });
      return;
    }
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => { //logs out of user
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;