import express from "express"
import cors from "cors"
import  dotenv from "dotenv/config"
import { addPost, deletePost, getPosts, /*updatePost*/ } from "./controllers.js";
import pool from "./db.js";

const port = process.env.port|| 4000;

const app = express();

app.use(cors());
app.use(express.json())

app.get('/posts',getPosts)
app.get('/posts/:id', async (req,res) => {
    try {
        const {id} = req.params
        const result = await pool.query('select * from posts where post_id =$1',[id])
        res.json(result.rows[0])
    } catch (err) {
        console.error(`${err} at server starting from line 14`)
    }
})

app.post("/posts" , addPost)
app.post('/signup', async (req,res) => {
    const {user,mail,pass} = req.body
    const result = await pool.query('Insert into users(user_name,user_email,user_password) values($1,$2,$3)',[user,mail,pass])
    res.json("New User Added Successfully!")
} )

app.delete('/posts/:id',deletePost)

// app.put("/posts/:id", updatePost)

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`)
})