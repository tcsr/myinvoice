import { useState } from 'react';
import axios from 'axios';
import keycloak from '../config/keycloak';

// Create an Axios instance
const axiosInstance = axios.create({});

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