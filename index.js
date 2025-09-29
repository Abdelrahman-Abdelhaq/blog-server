import express from "express"
import cors from "cors"
import { addComment, addPost, addUser, deletePost, getComments, getPost, getPosts, refreshAccessToken, userLogin, /*updatePost*/ } from "./controllers.js";
import { verifyToken } from "./verifyToken.js";

const app = express();

app.use(cors());
app.use(express.json())

app.get('/posts',getPosts)
app.get('/posts/:id', getPost )
app.get('/postpage/:id' , getComments)


app.post("/posts" ,verifyToken, addPost)
app.post('/postpage/:id',verifyToken, addComment)
app.post('/signup', addUser)
app.post('/', userLogin)
app.post("/refresh", refreshAccessToken);

app.delete('/posts/:id',deletePost)

export default app
// app.put("/posts/:id", updatePost)
