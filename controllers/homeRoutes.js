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

    // for (let i = 0; i < chatrooms.length; i++) {
    //   const userChatData = await UserChat.findAll({
    //     Where: {
    //       chatroom_id: chatrooms_id[i],
    //     },
    //   });

    //   userCount.push(userChatData);
    // }
    // console.log(userCount);

    res.status(200).render("homepage", { chatrooms });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    // Change route to profile if we want to once it is created
    res.redirect("/");
  }

  res.render("login");
});

module.exports = router;
