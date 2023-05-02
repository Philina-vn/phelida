import jwt from 'jwt-decode';

export const getJwtToken = () => {
    return localStorage.getItem("jwt-token") || null;
}

export const setJwtToken = (token) => {
    localStorage.setItem("jwt-token", token);
}

export const getRoles = (token) => {
    return jwt(token).roles;
}
