import { addingCommentQ, addingPostQ, addingUserQ, deleteingPostQ, gettingComments, gettingPostQ, gettingPostsQ, userLoginQ, /*updatingPostQ*/ } from "./queries.js";
import pool from "./db.js";
import bcrypt from "bcrypt"

export const getPosts = async (req,res)=>{
    const {limit,offset} = req.query;
    const result = await pool.query(gettingPostsQ(limit,offset))
    res.json(result.rows);
}

export const getPost = async (req,res) => {
    try {
        const {id} = req.params
        const result = await pool.query(gettingPostQ,[id])
        res.json(result.rows[0])
    } catch (err) {
        console.error(`${err} at server starting from line 14`)
    }
}

export const getComments = async (req,res) => {
    const {id} = req.params
    const result = await pool.query(gettingComments,[id])
    res.json(result.rows)
}

export const addPost = async (req,res)=>{
    const {post_category,post_title,post_description,post_paragraph} = req.body;
    const result = await pool.query(addingPostQ,[post_category,post_title,post_description,post_paragraph])
    res.json(result.rows[0])
}

export const addComment = async (req,res) => {
    const {id} = req.params
    const {comment_paragraph} = req.body
    const result = await pool.query(addingCommentQ,[comment_paragraph,id])
    res.json(result.rows[0])
}

export const addUser = async (req, res) => {
    const user = req.body.user.toLowerCase();
    const mail = req.body.mail.toLowerCase();
    const pass = req.body.pass;
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(pass,saltRounds)
        const result = await pool.query(addingUserQ,[user,mail,hashedPassword])
        res.status(200).json('Signed Up Successfully')
    } catch (err) {
        if(err.code === "23505") {
        res.status(409).json("Username Already Exists")
        }else{
        console.error(err)
        res.status(500).json("Internal Server Error!")
        }
        
    }
} 

export const userLogin = async (req, res) => {
    const mail = req.body.mail.toLowerCase()
    const pass = req.body.pass
    try {
        const result = await pool.query(userLoginQ,[mail,pass])
        if(result.rowCount > 0 ){
            res.status(200).json("Login Successful")
        }else{
            res.status(401).json("Login Failed")
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Server Error")
    }
}

export const deletePost = async (req,res) =>{
    const {id} = req.params;
    const result = await pool.query(deleteingPostQ,[id])
    res.json("Post Deleted Successfully!")
}

// export const updatePost = async(req,res)=>{
//     const {id} = req.params;
//     const {post_category,post_title,post_description,post_paragraph} = req.body;
//     const result = await pool.query(updatingPostQ,[post_category,post_title,post_description,post_paragraph,id])
//     res.json(result.rows[0])
// }