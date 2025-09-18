import { addingCommentQ, addingPostQ, deleteingPostQ, gettingComments, gettingPostQ, gettingPostsQ, /*updatingPostQ*/ } from "./queries.js";
import pool from "./db.js";

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