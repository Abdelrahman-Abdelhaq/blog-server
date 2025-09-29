export const gettingPostsQ = (limit, offset) => `
SELECT 
  posts.*, 
  users.user_name, 
  users.user_email
FROM posts
JOIN users ON posts.user_id = users.user_id
ORDER BY posts.post_id ASC
LIMIT ${limit} OFFSET ${offset};
`;
export const gettingPostQ = 'select * from posts where post_id =$1'

export const gettingComments = 'select * from post_comments where post_id=$1'

export const addingPostQ = `
INSERT INTO posts (post_category, post_title, post_description, post_paragraph, user_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *`
export const addingCommentQ = 'insert into post_comments(comment_paragraph,post_id) values($1,$2) returning  *'

export const addingUserQ = 'insert into users(user_name,user_email,user_password) values ($1,$2,$3)'

export const userLoginQ = `SELECT user_id, user_name, user_email, user_password FROM users WHERE user_email = $1
`
export const deleteingPostQ = "delete from posts where post_id=$1"

// export const updatingPostQ = "UPDATE post SET post_category = $1, post_title = $2, post_description=$3, post_paragraph=$4 where post_id = $5"