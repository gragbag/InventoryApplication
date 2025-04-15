import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const pool = new Pool({
	host: "localhost", // or wherever the db is hosted
	user: "julian",
	database: "game_inventory",
	password: process.env.DB_PASS,
	port: 5432, // The default port
});

export default pool;
