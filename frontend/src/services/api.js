import axios from 'axios';

const api = axios.create({
	baseURL: "https://omnistack-backend.herokuapp.com",
});

export default api;
