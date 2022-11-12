document.querySelector('#logout').addEventListener('click', async (event) => {
    event.preventDefault();
    await fetch('/api/user/logout', {
        method: 'POST'
    });
    document.location.replace('/');
})