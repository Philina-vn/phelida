import jwt from 'jwt-decode';

export const getJwtToken = () => {
    return localStorage.getItem("jwt-token") || null;
}

export const setJwtToken = (token) => {
    localStorage.setItem("jwt-token", token);
}

export const isAuth = () => {
    return getJwtToken() !== null;
}

export const deleteJwtToken = () => {
    localStorage.removeItem("jwt-token");
}

export const getRoles = () => {
    return jwt(getJwtToken()).roles;
}

export const isAdmin = () => {
    if (!getJwtToken()) {
        return false;
    } else {
        return getRoles(getJwtToken())
            .some((obj) => obj.authority === "ROLE_ADMIN");
    }
}
