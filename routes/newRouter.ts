import { Router } from "express";
const newRouter = Router();

import db from "../db/queries";

newRouter.get("/", async (req, res) => {
	const genres = await db.getAllGenres();
	const developers = await db.getAllDevelopers();
	res.render("new", { genres, developers });
});

newRouter.post("/", async (req, res) => {
	const title = req.body.title;
	const genre = req.body.genre;
	const developer = req.body.developer;
});

export default newRouter;
