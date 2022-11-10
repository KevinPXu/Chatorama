const router = require("express").Router();
const { User, Message, Chatroom } = require("../models");
//const auth = require("../utils/authenticate");

router.get("/", async (req, res) => {
  try {
    const chatroomData = await Chatroom.findAll({});

    const chatroom = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    res.status(200).render("homepage", { chatroom });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    // Change route to profile if we want to once it is created
    res.redirect('/');
  }

  res.render('login');
})

router.get('/chatroom/:chatroomid', async (req, res) => {
  // get messages and associated name
  // attach attribute for every message (isCurrentuser) that says whether it is from self or someone else
  const messages = await Message.findAll({
    where: {
      chatroom_id: req.params.chatroomid
    },
    include: {
      model: User,
      attributes: { exclude: ['password'] }
    }
  });
  console.log(messages);

  res.status(200).json(messages);
  // res.render('someChatroomHANDLEBAR!', {
  //   messages
  // })
});

module.exports = router;