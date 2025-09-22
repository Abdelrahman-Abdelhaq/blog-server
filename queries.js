export const gettingPostsQ = (limit,offset) => `select * from posts order by post_id asc limit ${limit} offset ${offset}`

export const gettingPostQ = 'select * from posts where post_id =$1'

export const gettingComments = 'select * from post_comments where post_id=$1'

export const addingPostQ = "insert into posts(post_category,post_title,post_description,post_paragraph) values($1,$2,$3,$4) returning *"

export const addingCommentQ = 'insert into post_comments(comment_paragraph,post_id) values($1,$2) returning  *'

export const addingUserQ = 'insert into users(user_name,user_email,user_password) values ($1,$2,$3)'

export const userLoginQ = 'select user_password from users where user_email = $1'

export const deleteingPostQ = "delete from posts where post_id=$1"

// export const updatingPostQ = "UPDATE post SET post_category = $1, post_title = $2, post_description=$3, post_paragraph=$4 where post_id = $5"