// password.js
import { config, setAuthenticated } from './config.js';

function checkPassword(event) {
    event.preventDefault();
    const password = document.getElementById('passwordInput').value;
    
    if (password === config.validPassword) {
        setAuthenticated(true);
        // Redirect to the originally requested page, or timeline by default
        const redirectTo = sessionStorage.getItem('requestedPage') || '/';
        window.location.href = redirectTo;
    } else {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('passwordInput').value = '';
    }
    return false;
}

// Add this to handle initial page load
function handlePageLoad() {
    // Store the current page path if user isn't authenticated
    if (!sessionStorage.getItem('authenticated')) {
        sessionStorage.setItem('requestedPage', window.location.pathname);
    }
}

window.checkPassword = checkPassword;
window.addEventListener('load', handlePageLoad);