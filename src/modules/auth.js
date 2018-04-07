import axios from 'axios';

export function authenticateUser(jwtToken) {
    localStorage.setItem('jwtToken', jwtToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
}

export function isUserAuthenticated() {
    return localStorage.getItem('jwtToken') !== null;
}

export function deauthenticateUser() {
    localStorage.removeItem('jwtToken');
}

export function getJWTToken() {
    const jwtToken = localStorage.getItem('jwtToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    return jwtToken;
}