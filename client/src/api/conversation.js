import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
    withCredentials: true // ensure cookies get sent with requests 
});

export const getConversations = async (userId) => {
    try {
        const res = await instance.get(`/conversation/${userId}`);
        console.log(res);
        return res;
    } catch(err) {
        return err;
    }
}