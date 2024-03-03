import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import userRoute from './routes/user.js';
import followRoute from './routes/follow.js';
import commentRoute from './routes/comment.js';
import postRoute from './routes/post.js';
import reactRoute from './routes/react.js';
import reactCommentRoute from './routes/reactComment.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_LOCAL);
        console.log("Mongoose connection successfully established");
    } catch (error) {
        console.log('Mongoose connection error: ' + error);
    }
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

const corsOption = { origin: true,};
app.use(cors(corsOption));
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/react", reactRoute);
app.use("/api/follow", followRoute);
app.use("/api/reactComment", reactCommentRoute);

app.get('/', async (req, res) => {
    res.send("<center><h1>Welcome to GP Express</h1></center>");
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`listening on http://localhost:${PORT}`);
});