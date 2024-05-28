import axios from 'axios';

const API_URL = 'https://apiback-z809.onrender.com/api/';

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;
