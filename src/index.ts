import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import v1Routes from './features/v1/index';
import errorHandlingMiddleWare, { ApiError } from './middlewares/error-handler';
import logger from "./helpers/logger";
import redisSession from "../redis-session";
import keycloak from "./keycloak-config";
const compression = require("compression");
import passport from "passport";
import { basicLoggerMiddleware, detailedAccessLoggerMiddleware } from "./middlewares/morgan";

// Config
const app = express();
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json({ limit: "100mb" })); // Body parser add
app.use(basicLoggerMiddleware); // Morgan Logger Middleware
app.use(detailedAccessLoggerMiddleware); // Morgan Logger Middleware
app.use(cors()); // cors added for all routes
app.use(redisSession); // Configure session
app.use(keycloak.middleware()); // Keycloak Middleware
app.use(passport.initialize());
dotenv.config();
const port = Number(process.env.PORT) || 3000;

app.use(express.urlencoded({ extended: true })); // URL parser
app.use(compression());

app.get("/", (req, res) => res.send("ok"));
app.use("/v1", v1Routes);
app.use('*', (req: Request, res: Response, next: NextFunction) => next(ApiError.notFound()));
app.use(errorHandlingMiddleWare);

app.listen(port, () => {
   logger.info(`Express server started on port ${port}`);
})
