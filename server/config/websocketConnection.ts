import { Server } from "socket.io";
import SocketConnection from "../websocket/SocketConnection";

export default function (server:any){
    const io=new Server(server,{
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ['Content-Type', 'Authorization', "Accept"]
        }
    })
    io.on("connection",(Socket)=>{
        const connected=new SocketConnection(Socket);
        connected.onConnection();
    })
}