import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connect as connectToDB } from "../config/db.js";
import { router } from "./routes/index.js";
import cors from 'cors';


dotenv.config();


const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

let origins = [];
if (process.env.FRONTEND) {
  origins = process.env.FRONTEND.split(' ');
}
else {
  origins = ["http://localhost:3001"];
}

app.use(cors({
  credentials: true,
  origin: origins,
  methods: "GET, POST, OPTIONS, PUT, DELETE, PATCH",
}));



app.use(router);

connectToDB();
const server = app.listen(port, (err) => {
  console.log(`Listening to port ${port}`);
});


