import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchProducts = (page, limit, searchQuery) => {
    return axios.get(`${API_BASE_URL}/api/products`, {
        params: {
            page,
            limit,
            search: searchQuery,
        },
    });
};
