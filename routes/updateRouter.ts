import { Router } from "express";
const updateRouter = Router();

updateRouter.get("/", (req, res) => {
	res.render("update");
});

export default updateRouter;
