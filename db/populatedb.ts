#! /usr/bin/env node

import pkg from "pg";
const { Client } = pkg;

import dotenv from "dotenv";
dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
  id SERIAL PRIMARY KEY,
  genre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gamegenres (
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, genre_id)
);

CREATE TABLE IF NOT EXISTS developers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gamedevelopers (
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  developer_id INTEGER REFERENCES developers(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, developer_id)
);

INSERT INTO genres (genre)
VALUES
	('Action'),
	('Adventure'),
	('Fighting'),
	('Sports'),
	('Puzzle'),
	('RPG');

INSERT INTO developers (developer)
VALUES
	('Nintendo'),
	('EA'),
	('Microsoft'),
	('Sony'),
	('Ubisoft'),
	('Epic Games'),
	('Blizzard'),
	('Riot Games');
`;

async function main() {
	console.log("seeding...");
	const client = new Client({
		connectionString: `postgresql://julian:${process.env.DB_PASS}@localhost:5432/game_inventory`,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log("done");
}

main();
