import express, { Express, Request, Response } from "express";
import router from "./routes"

const app: Express = express();

app.use(router)

export default app