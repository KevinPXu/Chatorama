const chatID = Number(document.querySelector('#message-form').dataset.chatid);
const userID = Number(document.querySelector('#message-form').dataset.userid);
let socket = io();
socket.emit('channelEmit', chatID);

document.querySelector('#message-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = document.querySelector('#message-bar').value.trim();

    if (text) {
        const response = await fetch('/api/message', {
            method: 'POST',
            body: JSON.stringify({ text, chatroom_id: chatID}),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.querySelector('#message-bar').value = '';
            socket.emit('chatroomUpdate', { id: chatID });
            // document.location.replace(`/chatroom/${chatID}`);
        } else {
            alert('Something went wrong, try again.');
        }
    }
});

// select 
const messageList = document.querySelector('#message-list');



socket.on('updateMessages', async () => { //listen for an update from the server
    console.log('someone is telling you to update!');
    const getNewMessageResponse = await fetch(`/api/message/latest/${chatID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const newestMessage = await getNewMessageResponse.json();
    console.log(newestMessage);
    //if message received matches the current user id then give it class ids that represent that
    //otherwise give it classes that look like a message from another user
    
    let newMessageElement = document.createElement('li');
    newMessageElement.textContent = newestMessage.text + ' --- from ' + newestMessage.User.username;
    messageList.appendChild(newMessageElement);
    newMessageElement.scrollIntoView({
        behavior: 'smooth'
    });
});
