import { useState } from 'react';
import axios from 'axios';
import keycloak from '../config/keycloak';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:9000',
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
});

// Set up an Axios interceptor to include the token from localStorage
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token expiration and refresh
axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Refresh the token using Keycloak
                await keycloak.updateToken(30); // Update token if it's about to expire in the next 30 seconds
                localStorage.setItem('token', keycloak.token);
                originalRequest.headers['Authorization'] = `Bearer ${keycloak.token}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh error:', refreshError);
                keycloak.login(); // Redirect to login if refresh fails
            }
        }
        return Promise.reject(error);
    }
);


const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiCall = async (method, url, data = null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance({
                method,
                url,
                data,
            });
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const get = (url) => apiCall('get', url);
    const post = (url, data) => apiCall('post', url, data);
    const put = (url, data) => apiCall('put', url, data);
    const del = (url, data) => apiCall('delete', url, data);

    return { get, post, put, del, loading, error };
};

export default useApi;