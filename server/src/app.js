import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import apiRouter from "./router/api.router.js";
import cookieParser from "cookie-parser";

const __dirname = path.dirname(new URL(import.meta.url).pathname); // Define __dirname using import.meta

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cookieParser());

app.use("/api", apiRouter);

export { app as default };
