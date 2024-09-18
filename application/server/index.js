const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");

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

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/conversation", conversationRoute);
app.use("/message", messageRoute);

app.listen(3001, () => {
    console.log("Server running!");
})