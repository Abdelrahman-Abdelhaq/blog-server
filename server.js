import express from "express"
import cors from "cors"
import  dotenv from "dotenv/config"
import pool from "./db.js";

const port = process.env.ball|| 4000;

const app = express();

app.use(cors());
app.use(express.json())

app.get('/posts',async (req,res)=>{
    const {limit,offset} = req.query;
    const result = await pool.query(`select * from post order by post_id asc limit ${limit} offset ${offset} `)
    res.json(result.rows);
})      

app.post("/posts" , async (req,res)=>{
    const {post_category,post_title,post_description} = req.body;
    const result = await pool.query("insert into post(post_category,post_title,post_description) values($1,$2,$3) returning *",[post_category,post_title,post_description])
    res.json(result.rows[0])
    res.json("New Post Added Successfully!")

})

app.delete('/posts/:id',async (req,res) =>{
    const {id} = req.params;
    const result = await pool.query("delete from post where post_id=$1",[id])
    res.json("Post Deleted Successfully!")
})

app.put("/posts/:id", async(req,res)=>{
    const {id} = req.params;
    const {post_category,post_title,post_description} = req.body;
    const result = await pool.query("UPDATE post SET post_category = $1, post_title = $2, post_description=$3 where post_id = $4",[post_category,post_title,post_description,id])
    res.json("Post Updated Successfully!")
})

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`)
})