import express,{Router} from "express";
import friends from "../controllers/groupAndFriends/friends";
import AuthController from "../controllers/auth/user.login"
import group from "../controllers/groupAndFriends/group";

const routes:Router=express.Router();

//friend Routes
routes.post("/friends/add",
AuthController.authoriseuser,
friends.checkisnotPresent,
friends.checkisFriendAlready,
friends.add);

routes.delete("/friends/delete/:groupid",
AuthController.authoriseuser,
friends.delete);

routes.post("/friends/getfriends",
AuthController.authoriseuser,
friends.getFriends);

//group Routes
routes.post("/groups/addgroup",AuthController.authoriseuser,group.newGroup);
routes.put("/groups/addmember",AuthController.authoriseuser,group.isUser,group.addGroupmember);
routes.post("/groups/getallgroups",AuthController.authoriseuser,group.showGroups);
routes.post("/groups/getfriendsandgroups",AuthController.authoriseuser,group.getAllFriendsAndGroups);
routes.put("/groups/removemember",AuthController.authoriseuser,group.removeGroupmember);
routes.delete("/groups/removegroups/:groupid",AuthController.authoriseuser,group.deleteGroup);

export default routes;