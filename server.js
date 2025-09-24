import express from "express"
import cors from "cors"
import  dotenv from "dotenv/config"
import { addComment, addPost, addUser, deletePost, getComments, getPost, getPosts, userLogin, /*updatePost*/ } from "./controllers.js";
import pool from "./db.js";

const port = process.env.port|| 4000;

const app = express();

app.use(cors());
app.use(express.json())

app.get('/posts',getPosts)
app.get('/posts/:id', getPost )
app.get('/postpage/:id' , getComments)


app.post("/posts" , addPost)
app.post('/postpage/:id', addComment)
app.post('/signup', addUser)
app.post('/', userLogin)



app.delete('/posts/:id',deletePost)


app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`)
})

// app.put("/posts/:id", updatePost)
