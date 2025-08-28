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

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`)
})