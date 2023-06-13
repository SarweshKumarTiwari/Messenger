import express,{ Router } from "express";
import userRegistration from "../controllers/auth/user.registration";
import AuthController from "../controllers/auth/user.login"
import userProfile from "../controllers/auth/user.profile";
const routes:Router=express.Router();

routes.post("/auth/register",
userRegistration.verifyUserParams,
userRegistration.checkUserExists,
userRegistration.registerUser);

routes.post("/auth/login",AuthController.getUsersCredentials);

routes.get("/auth/authorise_user",
AuthController.authoriseuser,
AuthController.getdataOfAuthorisedUser);

routes.delete("/auth/logout",
AuthController.authoriseuser,
AuthController.logout
);

routes.get("/auth/getallusers/:userid",
AuthController.authoriseuser,
userProfile.getAllUsers)

routes.post("/auth/updatepic",
AuthController.authoriseuser,
userProfile.updateProfilePic)

routes.get("/auth/getuser/:id",
AuthController.authoriseuser,
userProfile.getUserById)

export default routes;