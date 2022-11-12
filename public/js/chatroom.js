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
    console.log('current user', userID);
    //if message received matches the current user id then give it class ids that represent that
    //otherwise give it classes that look like a message from another user
    const newMessageDiv = createMessageElement(newestMessage);
    messageList.appendChild(newMessageDiv);
    newMessageDiv.scrollIntoView({
        behavior: 'smooth'
    });
});

function createMessageElement (newestMessage) {
    const divWrapper = document.createElement('div');
    if(newestMessage.user_id == userID) {
        divWrapper.classList.add('row', 'justify-content-end', 'message', 'this-user', 'this-user-bottom');
    } else {
        divWrapper.classList.add('row', 'justify-content-start', 'message', 'other-user', 'other-user-bottom');
        const pName = document.createElement('p');
        pName.classList.add('message-username');
        pName.textContent = newestMessage.User.username;
        divWrapper.appendChild(pName);
    }

    const pText = document.createElement('p');
    pText.textContent = newestMessage.text;
    divWrapper.appendChild(pText);
    console.log(divWrapper);
    return divWrapper;
}