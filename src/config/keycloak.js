import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:9000/',
    "realm": "eInvoice-dev",
    "clientId": "portal-local"
})

export default keycloak;