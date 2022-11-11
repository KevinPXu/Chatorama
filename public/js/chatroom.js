const chatID = Number(document.querySelector('#message-form').dataset.chatid);
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
            text.value = '';
            document.location.replace(`/chatroom/${chatID}`);
        } else {
            alert('Something went wrong, try again.');
        }
    }
});