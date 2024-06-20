import { createContext, useContext, useState, useEffect, useRef } from 'react';
import keycloak from '../config/keycloak';
import { useUserDetails } from './UserDetailsContext';
import Loading from '../components/loader/Loading';

const KeycloakContext = createContext();

export const useKeycloak = () => useContext(KeycloakContext);

const KeycloakProvider = ({ children }) => {
    const [keycloakInitialized, setKeycloakInitialized] = useState(false);
    const didKeycloakInitiate = useRef(false);
    const { updateUserProfile } = useUserDetails();

    useEffect(() => {
        const initKeycloak = async () => {
            if (didKeycloakInitiate.current) {
                return;
            }
            didKeycloakInitiate.current = true;
            try {
                const authenticated = await keycloak.init({
                    onLoad: 'login-required',
                    checkLoginIframe: true,
                    checkLoginIframeInterval: 60,
                });
                if (!authenticated) {
                    keycloak.login();
                } else {
                    setKeycloakInitialized(true);
                    const profile = await keycloak.loadUserProfile();
                    updateUserProfile(profile);

                    // Set fresh login flag in localStorage only if it's not already set
                    if (!localStorage.getItem('freshLogin')) {
                        localStorage.setItem('freshLogin', 'true');
                    }

                    keycloak.onTokenExpired = () => {
                        keycloak.updateToken(5).catch(() => {
                            keycloak.login();
                        });
                    };

                    keycloak.onAuthRefreshSuccess = () => {
                        // Token refreshed, no need to set fresh login flag
                    };
                }
            } catch (error) {
                console.error('Failed to initialize Keycloak', error);
                keycloak.login();
            }
        };

        initKeycloak();
    }, [updateUserProfile]);

    if (!keycloakInitialized) {
        return <Loading />;
    }

    return (
        <KeycloakContext.Provider value={{ keycloak, keycloakInitialized }}>
            {children}
        </KeycloakContext.Provider>
    );
};

export default KeycloakProvider;
