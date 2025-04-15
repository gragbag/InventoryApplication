import { Router } from "express";
const newRouter = Router();

import db from "../db/queries";

newRouter.get("/", async (req, res) => {
	const genres = await db.getAllGenres();
	const developers = await db.getAllDevelopers();
	res.render("new", { genres, developers });
});

export default newRouter;
