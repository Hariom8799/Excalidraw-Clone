import { NextFunction, Request, Response } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const Authmiddleware = (req: Request, res: Response, next : NextFunction) => {
    try{
        const token = req.headers["authorization"] ?? "";

        const decoded = jwt.verify(token, JWT_SECRET);

        if(typeof decoded === "object" && decoded !== null && "userId" in decoded){
            req.userId = (decoded as JwtPayload & {userId : number}).userId;
            next();
        }
        else{
            res.status(403).json({
                message : "Unauthorized!"
            })
        }

    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            message : "Unauthorized! error in middleware"
        })
    }
};