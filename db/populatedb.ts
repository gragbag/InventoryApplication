#! /usr/bin/env node

import pkg from "pg";
const { Client } = pkg;

import dotenv from "dotenv";
dotenv.config();

const SQL = `
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
