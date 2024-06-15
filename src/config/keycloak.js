import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'http://localhost:9000/',
    realm: 'eInvoice-dev',
    clientId: 'portal-local',
};

const keycloak = new Keycloak(keycloakConfig)

export default keycloak;