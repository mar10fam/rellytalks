import instance from "./api";

// get all the convos from a user using their id
export const getConversations = async (userId) => {
    try {
        const res = await instance.get(`/conversation/${userId}`);
        return res.data;
    } catch(err) {
        return err;
    }
}

// create a new convo with a user with your id and their id 
export const newConversation = async (senderId, receiverId) => {
    try {
        const res = await instance.post("/conversation", ({
            senderId,
            receiverId
        }));
        return res;
    } catch(err) {
        throw err
    }
}