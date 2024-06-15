import axios from 'axios';
import keycloak from '../config/keycloak';

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
    async (config) => {
        if (keycloak.isTokenExpired()) {
            try {
                await keycloak.updateToken(5);
            } catch (error) {
                keycloak.login();
            }
        }

        const token = keycloak.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
