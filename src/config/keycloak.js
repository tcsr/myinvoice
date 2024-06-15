import Keycloak from 'keycloak-js';

// Retrieve the Keycloak configuration from environment variables
const keycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
