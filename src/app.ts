import express, { Express } from "express";
import cors from "cors";
import MongoDB from "./config/mongodb";
import { errorHandler, handleNotFoundRoute } from "./middlewares";
import router from "./routes";

const app: Express = express();

MongoDB.getInstance();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(handleNotFoundRoute);
app.use(errorHandler);

export default app;
