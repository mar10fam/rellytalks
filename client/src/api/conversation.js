import instance from "./api";

export const getConversations = async (userId) => {
    try {
        const res = await instance.get(`/conversation/${userId}`);
        console.log(res);
        return res;
    } catch(err) {
        return err;
    }
}