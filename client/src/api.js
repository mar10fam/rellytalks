import axios from 'axios';

const API_BASE = "http://localhost:3001"

const instance = axios.create({
    baseURL: API_BASE
});

export const login = async (body) => {
    try {
        const res = await instance.post("/auth/login", body)
        return res;
    } catch(err) {
        console.error("Login error: ", err);
    }
}
