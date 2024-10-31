const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    const removedUser = users.find((user) => user.socketId === socketId);
    users = users.filter((user) => user !== removedUser);
    return removedUser;
}

const findUser = (receiverId) => {
    return users.find((user) => user.userId === receiverId);
}

const checkActive = (id) => {
    const user = findUser(id);
    if(user) return true;
    return false; 
}

io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("userOnline", userId);
    });

    socket.on("sendMessage", (body) => {
        const senderId = body.senderId;
        const receiverId = body.receiverId;
        const text = body.text;
        
        const receiver = findUser(receiverId);
        if(!receiver) return;

        io.to(receiver.socketId).emit("getMessage", {
            senderId, 
            text
        });
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if(user) io.emit("userOffline", user.userId);
    });
});

io.listen(3002);