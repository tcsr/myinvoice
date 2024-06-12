import { useKeycloak } from '@react-keycloak/web';

const useAuth = () => {
    const { keycloak } = useKeycloak();

    const isAuthenticated = keycloak.authenticated;
    const isTokenExpired = keycloak.isTokenExpired();

    return { isAuthenticated, isTokenExpired };
};

export default useAuth;
