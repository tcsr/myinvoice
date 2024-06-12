// src/keycloakHelper.js
import keycloak from './keycloak';

let keycloakInitPromise;

const initializeKeycloak = () => {
    if (!keycloakInitPromise) {
        keycloakInitPromise = keycloak.init({ onLoad: 'login-required' });
    }
    return keycloakInitPromise;
};

export const isAuthenticated = async () => {
    const isAuthenticated = await initializeKeycloak();
    return isAuthenticated && keycloak.authenticated;
};

export const getToken = async () => {
    await initializeKeycloak();
    await keycloak.updateToken(30);
    return keycloak.token;
};

export const getUserInfo = () => {
    return keycloak.tokenParsed;
};