document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    const description = document.querySelector('#signup-description').value.trim();

    const userData = {
        username,
        password,
    };

    if (description) {
        userData.description = description;
    }

    if (username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Something was entered incorrectly, try again.');
        }
    }
});