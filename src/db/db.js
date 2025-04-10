import pg from "pg";
const { Pool } = pg;
// import dotenv from "dotenv"

// dotenv.config();

const pool = new Pool ({
    user: 'dilshod',
    host:'localhost',
    database:'exam',
    password: '1234',
    port: 5432
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL successfully"))
    .catch(err => console.log("Error connecting to PSQL:", err.message));

export default pool;
