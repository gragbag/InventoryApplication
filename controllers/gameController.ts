import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import db from "../db/queries";

const validateInput = [
	body("title").trim().notEmpty().withMessage("Title is required."),

	body("genres").custom((values) => {
		if (!values || (Array.isArray(values) && values.length === 0)) {
			throw new Error("At least one genre must be selected.");
		}
		return true;
	}),

	body("developers").custom((values) => {
		if (!values || (Array.isArray(values) && values.length === 0)) {
			throw new Error("At least one developer must be selected.");
		}
		return true;
	}),
];

const displayGameForm = async (req: Request, res: Response) => {
	const genres = await db.getAllGenres();
	const developers = await db.getAllDevelopers();
	res.render("new", { genres, developers });
};

const insertNewGame = [
	validateInput,
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const genres = await db.getAllGenres();
			const developers = await db.getAllDevelopers();
			return res.status(400).render("new", { errors: errors.array(), genres, developers });
		}

		const title = req.body.title;
		let genres = req.body.genres;
		let developers = req.body.developers;

		if (!Array.isArray(genres)) {
			genres = [genres];
		}

		if (!Array.isArray(developers)) {
			developers = [developers];
		}

		let game_id = db.insertGame(title, genres, developers);
		console.log(game_id);

		res.redirect("/");
	},
];

const gameController = {
	displayGameForm,
	insertNewGame,
};

export default gameController;
