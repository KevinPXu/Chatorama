const router = require("express").Router();
const { User, Message, Chatroom, UserChat } = require("../models");
//const auth = require("../utils/authenticate");

router.get("/", async (req, res) => {
  try {
    const chatroomData = await Chatroom.findAll({});
    console.log(chatroomData);
    // const chatrooms = chatroomData.map((chatroom) =>
    //   chatrooms.get({ plain: true })
    // );
    // console.log(chatrooms);
    // const chatrooms_id = chatrooms.map((chatroom) => chatroom.id);

    // const messageData = await Message.findAll({
    //   order: [["createdDate", "DESC"]],
    // });
    // const messages = messageData.map((message) => message.get({ plain: true }));

    // const lastMessage = messages[0];
    // console.log(lastMessage);

    // let userCount = [];
    // for (let i = 0; i < chatrooms.length; i++) {
    //   const userChatData = await UserChat.findAll({
    //     Where: {
    //       chatroom_id: chatrooms_id[i],
    //     },
    //   });

    //   userCount.push(userChatData);
    // }
    // console.log(userCount);

    res.status(200).render("homepage", { chatrooms, lastMessage, userCount });
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
