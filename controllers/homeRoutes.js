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
  //check if user exsts in chatroomid thru UserChat, if not add them!

  // get messages and associated name
  // attach attribute for every message (is_this_user) that says whether it is from self or someone else
  const messagesData = await Message.findAll({
    where: {
      chatroom_id: req.params.chatroomid
    },
    include: {
      model: User,
      attributes: { exclude: ['password'] }
    }
  });
  const messages = messagesData.map((msgdata) =>  msgdata.get({ plain: true }))
  for(let i = 0; i < messages.length; i++) {
    if(messages[i].user_id === req.session.user_id) {
      messages[i].is_this_user = true;
    } else {
      messages[i].is_this_user = false;
    }
  }
  res.render('chatroom', {
    messages
  })
});

module.exports = router;