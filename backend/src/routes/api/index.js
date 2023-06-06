import { Router } from "express";
import { AuthRouter } from "./authRouter.js";

const ApiRouter = Router();
ApiRouter.use("/auth", AuthRouter);

export { ApiRouter };
