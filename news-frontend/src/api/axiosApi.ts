import axios from 'axios';

export const API_URL = 'http://localhost:8000';

const axiosApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json'
    }
});

export default axiosApi;
