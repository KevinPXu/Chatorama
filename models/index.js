const User = require('./User');
const Message = require('./Message');
const Chatroom = require('./Chatroom');
const UserChat = require('./UserChat');

//user-message
Message.belongsTo(User, {
    foreignKey: 'user_id'
});

//user-chatroom (thru UserChat)


//message-chatroom
Message.belongsTo(User, {
    foreignKey: 'chatroom_id'
});



module.exports = {
    User,
    Message,
    Chatroom,
    UserChat
}