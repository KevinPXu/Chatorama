document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const chatName = document.querySelector('#chat-name-input').value.trim();
    if (chatName) {
        const response = await fetch('/api/chatroom/', {
            method: 'POST',
            body: JSON.stringify({ chatName }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            const chatData = await response.json()
            document.location.replace(`/chatroom/${chatData.id}`)
        } else {
            console.log(response);
        }
    } else {
        alert('You must enter a name!');
    }
});