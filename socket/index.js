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
    console.log("receiverId:",receiverId);
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
        removeUser(socket.id);
    });

    socket.on("checkActive", (id) => {
        const active = checkActive(id);
        socket.emit("activeStatus", active);
    });
});

io.listen(3002);