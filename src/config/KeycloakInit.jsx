import { useEffect, useRef, useContext } from "react";
import keycloak from "./keycloak";
import { UserDetailsContext } from "../context/UserDetailsContext";

const KeycloakInit = () => {
  const didKeycloakInitiate = useRef(false);
  const { updateUserProfile } = useContext(UserDetailsContext);

  useEffect(() => {
    if (didKeycloakInitiate.current) {
      return;
    }
    didKeycloakInitiate.current = true;
    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: true,
        checkLoginIframeInterval: 60,
      })
      .then(() => {
        localStorage.setItem("token", keycloak.token);
        keycloak
          .loadUserProfile()
          .then((profile) => {
            updateUserProfile(profile); // Directly set the profile in context
          })
          .catch(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            keycloak.login();
          });
      })
      .catch((error) => {
        console.error("Keycloak initialization error:", error);
      });
  }, [updateUserProfile]);

  return null;
};

export default KeycloakInit;
