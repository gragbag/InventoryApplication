import { Request, Response } from "express";
import db from "../db/queries";

const displayAllGames = async (req: Request, res: Response) => {
	const games = await db.getAllGames();
	res.render("index", { games });
};

const indexController = { displayAllGames };

export default indexController;
