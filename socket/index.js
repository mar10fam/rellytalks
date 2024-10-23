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
    users = users.filter((user) => user.socketId !== socketId);
}

const findUser = (receiverId) => {
    return users.find((user) => user.userId === receiverId);
}

io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
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
        console.log("user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});

io.listen(3002);