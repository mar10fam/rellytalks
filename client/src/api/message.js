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

// send text to the current chat 
export const sendText = async (message) => {
    try {
        const res = await instance.post("/message", message);
        return res.data
    } catch(err) {
        throw err;
    }
}

// find most recent message from convo id 
export const getLastMsg = async (id) => {
    try {
        const res = await instance.get(`/message/mostRecent/${id}`);
        console.log(res);
        return res.data;
    } catch(err) {
        throw err;
    }
}