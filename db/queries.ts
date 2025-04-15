import pool from "./pool";

async function getAllGames() {
	const { rows } = await pool.query("SELECT * FROM games");
	return rows;
}

async function insertGame(title: string, genres: string[], developers: string[]) {
	const result = await pool.query("INSERT INTO games (title) VALUES ($1)", [title]);
	const game_id = result.rows[0]["id"];

	for (let genre in genres) {
		const genre_id = await pool.query("SELECT id FROM genres WHERE genre=$(1)", [genre]);
		await pool.query("INSERT INTO gamegenres (game_id, genre_id) VALUES ($1, $2)", [game_id, genre_id]);
	}

	for (let developer in developers) {
		const developer_id = await pool.query("SELECT id FROM developers WHERE developer=$(1)", [developer]);
		await pool.query("INSERT INTO gamedeveloper (game_id, developer_id) VALUES ($1, $2)", [game_id, developer_id]);
	}
}

async function getAllGenres() {
	const { rows } = await pool.query("SELECT genre FROM genres");
	return rows;
}

async function getAllDevelopers() {
	const { rows } = await pool.query("SELECT developer FROM developers");
	return rows;
}

const db = { getAllGames, insertGame, getAllGenres, getAllDevelopers };

export default db;
