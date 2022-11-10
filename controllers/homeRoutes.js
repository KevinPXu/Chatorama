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
