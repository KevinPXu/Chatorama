const router = require('express').Router();
const { Chatroom, User, Message } = require('../../models');
const auth = require("../../utils/authenticate");

router.post('/', async (req, res) => { //creates a new chatroom
    try {
      const chatroomData = await Chatroom.create({
        name: req.body.chatName,
        owner_id: req.session.user_id
      });
      res.status(200).json(chatroomData);
    } catch (error) {
      res.status(400).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const allChats = await Chatroom.findAll({
            include: Message
        });
      res.status(200).json(allChats);

    } catch (error) {
      res.status(400).json(error);
        
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteData = await Chatroom.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(deleteData);
    } catch (error) {
        res.status(400).json(error);
    }
}); 

module.exports = router;