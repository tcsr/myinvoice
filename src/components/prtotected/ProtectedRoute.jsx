import { useEffect, useState } from 'react';
import { useKeycloak } from '../../context/KeycloakProvider';
import Loading from '../loader/Loading';

const ProtectedRoute = ({ children }) => {
    const { keycloak, keycloakInitialized } = useKeycloak();
    const [isAuthenticated, setIsAuthenticated] = useState(keycloak.authenticated);

    useEffect(() => {
        const checkToken = async () => {
            if (keycloak.isTokenExpired()) {
                try {
                    await keycloak.updateToken(5);
                    setIsAuthenticated(true);
                } catch (error) {
                    keycloak.login();
                }
            } else {
                setIsAuthenticated(true);
            }
        };

        if (keycloakInitialized) {
            checkToken();
        }
    }, [keycloak, keycloakInitialized]);

    if (!keycloakInitialized || !isAuthenticated) {
        return <Loading />;
    }

    return children;
};

export default ProtectedRoute;
