import { Socket } from "socket.io";
import SocketSetups from "./SocketSetups";
import { ClientToServerEmits, ServerToClientEmits } from "./Server_Client_configs";

class WebSocketConfigs{
    private socket:Socket<ClientToServerEmits,ServerToClientEmits>;
    constructor(socket:Socket){
        this.socket=socket;
    }

    onConnection(){
        SocketSetups.joinNewRoom(this.socket);
        SocketSetups.isUserConneted(this.socket);
        SocketSetups.onUserDisconnect(this.socket);
        SocketSetups.pushConversation(this.socket);
        SocketSetups.onRoomDisconnected(this.socket);
        SocketSetups.addedNewFriend(this.socket);
    }
}
export default WebSocketConfigs;