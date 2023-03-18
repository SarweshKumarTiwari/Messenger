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

routes.delete("/friends/delete",
AuthController.authoriseuser,
friends.delete);

routes.get("/friends/getfriends",
AuthController.authoriseuser,
friends.getFriends);

//group Routes
routes.post("/groups/addgroup",AuthController.authoriseuser,group.newGroup);
routes.put("/groups/addmember",AuthController.authoriseuser,group.addGroupmember);
routes.get("/groups/getallgroups",AuthController.authoriseuser,group.showGroups);
routes.get("/groups/getfriendsandgroups",AuthController.authoriseuser,group.getAllFriendsAndGroups);
routes.delete("/groups/removemember",AuthController.authoriseuser,group.removeGroupmember);
routes.delete("/groups/removegroups",AuthController.authoriseuser,group.deleteGroup);

export default routes;