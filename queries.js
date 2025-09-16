export const gettingPostsQ = (limit,offset) => `select * from post order by post_id asc limit ${limit} offset ${offset}`

export const addingPostQ = "insert into post(post_category,post_title,post_description) values($1,$2,$3) returning *"

export const deleteingPostQ = "delete from post where post_id=$1"

export const updatingPostQ = "UPDATE post SET post_category = $1, post_title = $2, post_description=$3 where post_id = $4"