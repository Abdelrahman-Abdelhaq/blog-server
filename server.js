import express from "express"
import cors from "cors"
import  dotenv from "dotenv/config"
import pool from "./db.js";
import { addPost, deletePost, getPosts, updatePost } from "./controllers.js";

const port = process.env.port|| 4000;

const app = express();

app.use(cors());
app.use(express.json())

app.get('/posts',getPosts)      

app.post("/posts" , addPost)

app.delete('/posts/:id',deletePost)

app.put("/posts/:id", updatePost)

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`)
})