const router = require("express").Router();
const { User, Message, Chatroom, UserChat } = require("../models");
//const auth = require("../utils/authenticate");

router.get("/", async (req, res) => {
  try {
    const chatroomData = await Chatroom.findAll({});

    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    const chatrooms_id = chatrooms.map((chatroom) => chatroom.id);
    console.log(chatrooms_id);

    for (let i = 0; i < chatrooms_id.length; i++) {
      const messageData = await Message.findOne({
        where: {
          chatroom_id: chatrooms_id[i],
        },
        order: [["createdDate", "DESC"]],
      });

      const message = messageData.get({ plain: true });
      console.log(message);
      chatrooms[i].latestMessageDate = message.createdDate;
    }

    for (let i = 0; i < chatrooms.length; i++) {
      const userChatData = await UserChat.findAll({
        where: {
          chatroom_id: chatrooms_id[i],
        },
      });

      const userChat = userChatData.map((user) => user.get({ plain: true }));
      chatrooms[i].numUsers = userChat.length;
    }

    res.status(200).render("homepage", { chatrooms });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    // Change route to profile if we want to once it is created
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/chatroom/:chatroomid", async (req, res) => {
  // //check if user exists in chatroomid thru UserChat, if not add them!
  // console.log(req.session.user_id);
  // const userChatData = await UserChat.findOne({
  //   where: {
  //     chatroom_id: req.params.chatroomid,
  //     user_id: req.session.user_id,
  //   },
  // });
  // console.log(userChatData);
  // if (!userChatData) {
  //   UserChat.create({
  //     chatroom_id: req.params.chatroomid,
  //     user_id: req.session.user_id,
  //   });
  // }

  // get messages and associated name
  // attach attribute for every message (is_this_user) that says whether it is from self or someone else
  const messagesData = await Message.findAll({
    where: {
      chatroom_id: req.params.chatroomid,
    },
    include: {
      model: User,
      attributes: { exclude: ["password"] },
    },
  });
  const messages = messagesData.map((msgdata) => msgdata.get({ plain: true }));
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].user_id === req.session.user_id) {
      messages[i].is_this_user = true;
    } else {
      messages[i].is_this_user = false;
    }
  }
  res.render("chatroom", {
    messages,
    chatroom_id: req.params.chatroomid
  });
});

module.exports = router;
