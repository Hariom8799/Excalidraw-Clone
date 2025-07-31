import { WebSocketServer } from "ws";
import jwt, {JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
  ws.on("error", console.error);

  const url = request.url;
  const params = new URLSearchParams(url?.split("?")[1]);
  const token = params.get("token") || "";

  const decoded = jwt.verify(token, JWT_SECRET)

  if(!decoded || !(decoded as JwtPayload).userId){
    return ws.close(1008, "Unauthorized!");
  }

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
