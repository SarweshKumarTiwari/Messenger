import { Socket } from "socket.io";
import { ClientToServerEmits, ServerToClientEmits } from "./Server_Client_configs";

type SocketConfigs=Socket<ClientToServerEmits,ServerToClientEmits>

class SocketSetups{
    isUserConneted(socket:SocketConfigs){
        socket.on("connected",(userId:string)=>{
            socket.join(userId);
            socket.broadcast.emit("new_user",userId);
        })
    }
    addedNewFriend(socket:SocketConfigs){
        socket.on("added_friend",(userId)=>{
            socket.broadcast.emit("get_friend",userId);
        })
    }

    onUserDisconnect(socket:SocketConfigs){
        socket.on("disconnected",(userId:string)=>{
            socket.broadcast.emit("user_disconnected",userId);
            socket.disconnect();
        })
    }

    onRoomDisconnected(socket:SocketConfigs){
        socket.on("leave_room",(room_id:string)=>{
            socket.leave(room_id)
        })
    }

    joinNewRoom(socket:SocketConfigs){
        socket.on("new_room",(userId:string,room_id:string)=>{
            socket.join(room_id);
        });
    }

    pushConversation(socket:SocketConfigs){
        socket.on("send_message",(room_id:string,message)=>{
            socket.to(room_id).emit("message_sent",message);
        });
    }
}

export default new  SocketSetups();