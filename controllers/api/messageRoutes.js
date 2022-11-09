const router = require('express').Router();
const { Message } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newMessageData = await Message.create({
            text: req.body.text,
            user_id: req.body.user_id,
            chatroom_id: req.body.chatroom_id
        });

        res.status(200).json(newMessageData);

    } catch (error) {
        console.log(err);
        res.status(500).json(err);
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
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;