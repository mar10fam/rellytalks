const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

// setup database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
    } catch(err) {
        console.error("Error connecting to MongoDB: ", err.message);
    }
}

connectDB(); 

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/conversation", conversationRoute);
app.use("/message", messageRoute);

app.listen(3001, () => {
    console.log("Server running!");
});