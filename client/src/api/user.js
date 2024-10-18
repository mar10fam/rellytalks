import instance from "./api";

export const getUser = async (userId) => {
    try {
        const res = await instance.get(`/users/${userId}`);
        return res.data;
    } catch(err) {
        throw err;
    }
}