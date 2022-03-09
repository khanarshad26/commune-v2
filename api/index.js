import express from "express";
import cors from 'cors';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from "morgan";
import userRoute from "./routes/users.js";
import instituteRoute from "./routes/institute/institute.js";
import cellRoute from "./routes/institute/cell.js";

import workshopRoute from "./routes/workshop.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import forumRoute from "./routes/forum.js";

import aboutRoute from './routes/portfolio/about.js';
import achievementsRoute from './routes/portfolio/achievements.js';
import educationRoute from './routes/portfolio/education.js';
import projectRoute from './routes/project.js';
import eventRoute from './routes/event.js';
import experienceRoute from './routes/portfolio/experience.js';
import interestRoute from './routes/portfolio/interest.js';
import commentRoute from './routes/comment.js';
import connectionRoute from './routes/connection.js';



import path from 'path';
import multer from 'multer';
const __dirname = path.resolve();
const PORT = process.env.PORT || 8800

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex : true
})
.then(()=>{
   console.log('MongoDB is connected')
})
.catch((err)=>{
   console.log(`there is a problem with ${err}`);
   process.exit(-1)
})

app.use("/", express.static(path.join(__dirname, "/public")));

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/forum", forumRoute);
app.use('/api/event', eventRoute);
app.use('/api/project', projectRoute);
app.use('/api/workshop', workshopRoute);

app.use("/api/institute", instituteRoute);
app.use('/api/cell', cellRoute);

app.use('/api/about', aboutRoute);
app.use('/api/education', educationRoute);
app.use('/api/experience', experienceRoute);
app.use('/api/achievement', achievementsRoute);
app.use('/api/interest', interestRoute);

app.use('/api/comment',commentRoute);
app.use('/api/connection',connectionRoute);

app.listen(PORT, () => {
  console.log("Backend server is running!");
});
