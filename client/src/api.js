import axios from 'axios';

const API_BASE = "http://localhost:3001"

const instance = axios.create({
    baseURL: API_BASE,
    withCredentials: true // ensure cookies get sent with requests 
});

// attempts to login user 
export const login = async (body) => {
    try {
        const res = await instance.post("/auth/login", body)
        return res;
    } catch(err) {
        console.error("Login error: ", err);
    }
}

// registers a user 
export const register = async (body) => {
    try {
        const res = await instance.post("/auth/register", body)
        return res;
    } catch(err) {
        console.error("Register error: ", err);
        throw err.response.data;
    }
}

// checks if user is authenticated 
export const checkAuth = async () => {
    try {
        const res = await instance.get("/auth/check");
        return res.data;
    } catch(err) {
        console.error("Authentication error: ", err);
        return null;
    }
}