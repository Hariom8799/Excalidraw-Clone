import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection',function connection(ws, req){

    const url = req.url;
    if(!url){
        return;
    }
    const queryParam = new URLSearchParams(url.split("?")[1]);
    const token = queryParam.get("token") || "";
    const decoded = jwt.verify(token, "secret");

    if(!decoded || !(decoded as JwtPayload).userId){
        ws.close();
        return;
    }

    const userId = (decoded as JwtPayload).userId;


    ws.on('message', function message(data){
        console.log(data);
        ws.send("pong");
    })
})