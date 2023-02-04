import express,{ Router } from "express";
import userRegistration from "../controllers/auth/user.registration";
import AuthController from "../controllers/auth/user.login"
const routes:Router=express.Router();

routes.post("/auth/register",
userRegistration.verifyUserParams,
userRegistration.checkUserExists,
userRegistration.registerUser);

routes.post("/auth/login",AuthController.getUsersCredentials);

routes.get("/auth/authorise_user",AuthController.authoriseuser);

export default routes;