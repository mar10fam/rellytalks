import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
    withCredentials: true // ensure cookies get sent with requests 
});

export default instance;