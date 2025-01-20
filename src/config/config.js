// config.js
export const config = {
    passwordProtectionEnabled: true,
    validPassword: 'test'
};

// Add this to check if protection is enabled
export function isPasswordProtectionEnabled() {
    return config.passwordProtectionEnabled;
}

// Add this to check if user is authenticated
export function isAuthenticated() {
    if (!isPasswordProtectionEnabled()) return true;
    return sessionStorage.getItem('authenticated') === 'true';
}

// Add this to set authentication
export function setAuthenticated(status) {
    sessionStorage.setItem('authenticated', status);
}