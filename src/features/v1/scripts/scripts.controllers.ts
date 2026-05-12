import { Request, Response, NextFunction } from "express";
import {sendSuccessResponse} from "../../../middlewares/success-handler";
import db from "../../../db/data-source"
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

class ScriptControllers {
    static async dummyScript(req: Request, res: Response, next: NextFunction) {
        try {
    
          sendSuccessResponse(req, res, {message: 'Script route is working fine'});
        } catch (error) {
          console.log("course error", error);
          next(error);
        }
    }
}

export default ScriptControllers;