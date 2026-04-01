import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";


export function middleware(req: Request,res: Response,next: NextFunction){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    req.userId = decodedToken.userId;
    next();
}