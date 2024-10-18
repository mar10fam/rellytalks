import instance from "./api";

// get all messages from a convo
export const getMessages = async (convoId) => {
    try {
        const res = await instance.get(`/message/${convoId}`)
        return res.data;
    } catch(err) {
        throw err;
    }
}