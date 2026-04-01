import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { middleware } from "./middleware";

const app = express();



app.post("/signUp", (req,res)=>{
    console.log("Sign up");
})

app.post("/signIn", (req,res)=>{

    const userId = 1; 

    const token = jwt.sign({userId}, JWT_SECRET);
    res.json({
        token
    });
});

app.post("/room", middleware ,(req,res)=>{
    console.log("Room created");

    res.json({
        message: "Room created"
    })
});


app.listen(3001, () => {
    console.log("Server started on port 3001");
});