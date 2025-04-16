import { Router } from "express";
const newRouter = Router();

import db from "../db/queries";
import gameController from "../controllers/gameController";

newRouter.get("/", gameController.displayGameForm);

newRouter.post("/", ...gameController.insertNewGame);

export default newRouter;
