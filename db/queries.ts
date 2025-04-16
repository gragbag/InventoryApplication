import pool from "./pool";

async function getAllGames() {
	const { rows } = await pool.query(
		`SELECT games.id as id, games.title, array_agg(DISTINCT genres.genre) AS genres, array_agg(DISTINCT developers.developer) AS developers
		 FROM games
		 LEFT JOIN gamegenres ON games.id = gamegenres.game_id
		 LEFT JOIN genres ON gamegenres.genre_id = genres.id
		 LEFT JOIN gamedevelopers ON games.id = gamedevelopers.game_id
		 LEFT JOIN developers ON gamedevelopers.developer_id = developers.id
		 GROUP BY games.id, games.title
		 ORDER BY games.id;
		 `
	);
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

async function getGameById(id: string) {
	const result = await pool.query("SELECT * FROM games WHERE id=($1)", [id]);
	const title = result.rows[0].title;
	return title;
}

async function getGenresOfGame(id: string) {
	const result = await pool.query(
		`SELECT array_agg(DISTINCT genres.genre) AS genres
		 FROM games
		 LEFT JOIN gamegenres ON games.id = gamegenres.game_id
		 LEFT JOIN genres ON gamegenres.genre_id = genres.id
		 WHERE games.id = ($1)
		 GROUP BY games.id, games.title
		 ORDER BY games.id
		`,
		[id]
	);

	return result.rows[0].genres;
}

async function getDevelopersOfGame(id: string) {
	const result = await pool.query(
		`SELECT array_agg(DISTINCT developers.developer) AS developers
		 FROM games
		 LEFT JOIN gamedevelopers ON games.id = gamedevelopers.game_id
		 LEFT JOIN developers ON gamedevelopers.developer_id = developers.id
		 WHERE games.id = ($1)
		 GROUP BY games.id, games.title
		 ORDER BY games.id
		`,
		[id]
	);

	return result.rows[0].developers;
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

const db = { getAllGames, insertGame, getAllGenres, getAllDevelopers, getGameById, getGenreId, getDeveloperId, getGenresOfGame, getDevelopersOfGame };

export default db;
