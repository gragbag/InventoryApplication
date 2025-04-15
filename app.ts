import express, { Request, Response } from "express";
import cors from "cors";
const path = require("node:path");

import indexRouter from "./routes/indexRouter";
import newRouter from "./routes/newRouter";
import updateRouter from "./routes/updateRouter";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", indexRouter);

app.use("/new", newRouter);

app.use("/update", updateRouter);

app.listen(PORT);
