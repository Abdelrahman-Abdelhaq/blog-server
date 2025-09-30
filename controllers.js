import { addingCommentQ, addingPostQ, addingUserQ, deleteingPostQ, gettingComments, gettingPostQ, gettingPostsQ, userLoginQ, /*updatingPostQ*/ } from "./queries.js";
import pool from "./db.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const accessSecretKey = process.env.accessTokenSecret
const refreshSecretKey = process.env.refreshTokenSecret

const generateAccessToken = (payload) => {
    return jwt.sign(payload,accessSecretKey,{expiresIn:"15m"})
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload,refreshSecretKey,{expiresIn:"7d"})
}

export const getPosts = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const userId = req.user.user_id;   
    const parsedLimit = parseInt(limit,10)
    const parsedOffset = parseInt(offset,10)
    console.log("req.user:", req.user);
    console.log("limit:", limit, "offset:", offset);
    console.log("parsed:", parsedLimit, parsedOffset);
    const result = await pool.query(gettingPostsQ, [userId, parsedLimit, parsedOffset]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching posts:", error);   // full error, not just .message
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


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

export const addPost = async (req, res) => {
console.log("Decoded user:", req.user);
console.log("req.user:", req.user);
console.log("req.body:", req.body);
  const { post_category, post_title, post_description, post_paragraph } = req.body;
  const userId = req.user.userId; 

  try {
    const result = await pool.query(addingPostQ, [
      post_category,
      post_title,
      post_description,
      post_paragraph,
      userId
    ]);

    res.status(201).json(result.rows[0]); 
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Failed to add post" });
  }
};

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
        const result = await pool.query(userLoginQ,[mail])
        if(result.rows.length === 0)
            {return res.status(404).json("Email is Not Registered !")}
        const { user_id, user_name, user_password } = result.rows[0];
        const hashedPass = user_password;
        const match = await bcrypt.compare(pass,hashedPass)
        if(!match){
            return res.status(401).json("UnAuthorized Access!")
        }
        const payload = {userId: user_id,email: mail}
        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)

        return res.status(200).json({
            message:"Logged In",
            accessToken,
            refreshToken,
            user: {id: user_id,name: user_name,email: mail}
        })
    } catch (error) {
        console.error(`Login Error ${error}`)
        res.status(500).json("Server Error!")
    }
}

export const refreshAccessToken = (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, process.env.refreshTokenSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
      }

      const newAccessToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email },
        process.env.accessTokenSecret,
        { expiresIn: "15m" }
      );

      return res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({ message: "Server error while refreshing token" });
  }
};
// export const updatePost = async(req,res)=>{
//     const {id} = req.params;
//     const {post_category,post_title,post_description,post_paragraph} = req.body;
//     const result = await pool.query(updatingPostQ,[post_category,post_title,post_description,post_paragraph,id])
//     res.json(result.rows[0])
// }





// const cPass = pass
//     const payLoad = {
//         mail:mail,
//     }
    
//     try {
//         const result = await pool.query(userLoginQ,[mail])
//         const hashedPass = result.rows[0].user_password
//         const match = await bcrypt.compare(cPass,hashedPass)
//         if(match) {
//             const token = jwt.sign(payLoad,secretKey)
//             res.status(200).json({
//                 message: "Loged In",
//                 token: token
//             })
//         }else if (!match){
//             res.status(401).json("UnAuthorized Access")
//         }
//     } catch (error) {
//         res.status(500).json("Server Error")
//     }
// }

export const deletePost = async (req,res) =>{
    const {id} = req.params;
    const result = await pool.query(deleteingPostQ,[id])
    res.json("Post Deleted Successfully!")
}