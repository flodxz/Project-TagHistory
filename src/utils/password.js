function checkPassword(event) {
    event.preventDefault();
    const password = document.getElementById('passwordInput').value;
    const correctPassword = 'test';
    
    if (password === correctPassword) {
        window.location.href = 'timeline.html';
    } else {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('passwordInput').value = '';
    }
    return false;
}