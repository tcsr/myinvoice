import { useState } from 'react';
import axiosInstance from './axios-instance';
import { useKeycloak } from '../context/KeycloakProvider';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { keycloak } = useKeycloak();

    const apiCall = async (method, url, data = null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance({
                method,
                url,
                data,
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
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