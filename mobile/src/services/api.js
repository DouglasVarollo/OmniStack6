import axios from 'axios';

const api = axios.create({
	baseURL: "https://omnistack-backend-dv.herokuapp.com",
});

export default api;