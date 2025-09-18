import express from "express"
import cors from "cors"
import  dotenv from "dotenv/config"
import { addComment, addPost, deletePost, getComments, getPost, getPosts, /*updatePost*/ } from "./controllers.js";
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


app.delete('/posts/:id',deletePost)

app.put('/postpage', async(req,res) => {
    const {comment_id,post_id} = req.body
    const result = await pool.query('update post_comments set comment_likes=comment_likes + 1 where comment_id=$1 and post_id=$2',[comment_id,post_id])
    res.json(result.rows[0])
})

// app.put("/posts/:id", updatePost)
app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`)
})

// so now we need 3 apis 
// first one is a post api that will be used when we add a new comment , it will send
// the comment id ,username, and default false liked state

// then one to fetch all  the data from the comments_likes table and it will be fetched on the parent 
// to an array object

// then pass it as prop to the children comments
// now for each children you will use if statement to check for the username comment id and liked state
// first 2 matches and the last one is false then we can like if not then we cant 

// when we like we increase the likes number by one and change the image and state