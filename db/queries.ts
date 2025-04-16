import pool from "./pool";

async function getAllGames() {
	const { rows } = await pool.query("SELECT * FROM games");
	return rows;
}

async function insertGame(title: string, genres: string[], developers: string[]) {
	const result = await pool.query("INSERT INTO games (title) VALUES ($1) RETURNING id", [title]);
	const game_id = result.rows[0].id;

	for (const genre of genres) {
		const result = await pool.query("SELECT id FROM genres WHERE genre=($1)", [genre]);
		const genre_id = result.rows[0].id;
		await pool.query("INSERT INTO gamegenres (game_id, genre_id) VALUES ($1, $2)", [game_id, genre_id]);
	}

	for (const developer of developers) {
		const result = await pool.query("SELECT id FROM developers WHERE developer=($1)", [developer]);
		const developer_id = result.rows[0].id;
		await pool.query("INSERT INTO gamedevelopers (game_id, developer_id) VALUES ($1, $2)", [game_id, developer_id]);
	}

	return game_id;
}

async function insertGameGenre(game_id: number, genre_id: number) {
	await pool.query("INSERT INTO gamegenres(game_id, genre_id) VALUES ($1, $2)", [game_id, genre_id]);
}

async function insertGameDeveloper(game_id: number, developer_id: number) {
	await pool.query("INSERT INTO gamedevelopers(game_id, developer_id) VALUES ($1, $2)", [game_id, developer_id]);
}

async function getAllGenres() {
	const { rows } = await pool.query("SELECT genre FROM genres");
	return rows;
}

async function getAllDevelopers() {
	const { rows } = await pool.query("SELECT developer FROM developers");
	return rows;
}

async function getGenreId(genre: string) {
	const result = await pool.query("SELECT id FROM genres WHERE genre=($1)", [genre]);
	const id: number = result.rows[0].id;
	return id;
}

async function getDeveloperId(developer: string) {
	const result = await pool.query("SELECT id FROM developers WHERE developer=($1)", [developer]);
	const id: number = result.rows[0].id;
	return id;
}

const db = { getAllGames, insertGame, getAllGenres, getAllDevelopers, getGenreId, getDeveloperId };

export default db;
