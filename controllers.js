import { addingPostQ, deleteingPostQ, gettingPostsQ, updatingPostQ } from "./queries.js";

export const getPosts = async (req,res)=>{
    const {limit,offset} = req.query;
    const result = await pool.query(gettingPostsQ(limit,offset))
    res.json(result.rows);
}

export const addPost = async (req,res)=>{
    const {post_category,post_title,post_description} = req.body;
    const result = await pool.query(addingPostQ,[post_category,post_title,post_description])
    res.json(result.rows[0])
    res.json("New Post Added Successfully!")

}

export const deletePost = async (req,res) =>{
    const {id} = req.params;
    const result = await pool.query(deleteingPostQ,[id])
    res.json("Post Deleted Successfully!")
}

export const updatePost = async(req,res)=>{
    const {id} = req.params;
    const {post_category,post_title,post_description} = req.body;
    const result = await pool.query(updatingPostQ,[post_category,post_title,post_description,id])
    res.json(result.rows[0])
}