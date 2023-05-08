import express,{Router} from "express";
import AuthController from "../controllers/auth/user.login";
import chatController from "../controllers/chat/chat";

const routes:Router=express.Router();

routes.post("/chats/addchat",
AuthController.authoriseuser,
chatController.isUser,
chatController.addChatMessage);

routes.post("/chats/getchats",
AuthController.authoriseuser,
chatController.getUsersChat);

routes.delete("/chats/deletememberchat/:chatid",
AuthController.authoriseuser,
chatController.deleteChatMessage);

routes.delete("/chats/deletegroupchat/:groupid",
AuthController.authoriseuser,
chatController.deleteChatOfGroup);

export default routes;