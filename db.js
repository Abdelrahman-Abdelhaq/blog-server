import {Pool} from "pg";

const pool = new Pool({
    port:5432,
    host:"localhost",
    database: "blog",
    user:"postgres",
    password:"0707",
});

export default pool;