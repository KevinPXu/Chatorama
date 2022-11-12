const router = require('express').Router();
const { Message, User, Chatroom } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newMessageData = await Message.create({
            text: req.body.text,
            user_id: req.session.user_id,
            chatroom_id: req.body.chatroom_id
        });

        res.status(200).json(newMessageData);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedMessageData = await Message.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(deletedMessageData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const messageData = await Message.findAll({
            include: [User, Chatroom]
        });
        res.status(200).json(messageData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const messageData = await Message.findByPk(req.params.id, {
            include: [{
                model: [User, Chatroom]
            }]
        });
        res.status(200).json(messageData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//create a route to get the latest message in a specific chat room

router.get('/latest/:chatroomid', async (req, res) => {
    try {
        res.status(200).json(await Message.findOne({
            where: {
                chatroom_id: req.params.chatroomid
            },
            order: [ [ 'id', 'DESC' ]],
            include: {
                model: User,
                attributes: {
                    exclude: ['password']
                },
            }
        }));
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;