import {Pool} from "pg";

const pool = new Pool({
    connectionString: process.env.database_url,
    ssl:{rejectUnauthorized:false}
});

export default pool;