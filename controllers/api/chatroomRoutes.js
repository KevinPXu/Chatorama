const router = require('express').Router();
const { Chatroom, User, Message } = require('../../models');

router.post('/', async (req, res) => { //creates a new chatroom
    try {
      const chatroomData = await Chatroom.create(req.body);
      res.status(200).json(chatroomData);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;