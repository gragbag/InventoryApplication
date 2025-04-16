import { Router } from "express";
import gameController from "../controllers/gameController";
const updateRouter = Router();

updateRouter.get("/:id", gameController.displayEditForm);

export default updateRouter;
