import express from "express";
const authRoute = express.Router();

import * as auth from "../controllers/authController.js";
import { requriedLoggedIn } from "../middlewares/authMiddleware.js"


authRoute.post("/pre-signup", auth.preSignup);
authRoute.post("/user/signup", auth.createUser);
authRoute.post("/signup", auth.signup);
authRoute.post("/login", auth.login);
authRoute.post("/forgot-password", auth.forgotPassword);
authRoute.post("/access-account", auth.accessAccount);
authRoute.post("/reset-password/:resetCode", auth.resetPassword);
authRoute.get("/refresh-token" , auth.refreshToken)
// authRoute.put("/", auth.refreshToken);
authRoute.get("/loggedIn-user", requriedLoggedIn, auth.loggedInUser);
authRoute.get("/profile/:username", auth.publicProfile);
authRoute.put("/change-password", requriedLoggedIn, auth.changePassword);
authRoute.put("/update-profile", requriedLoggedIn, auth.updateProfile);

export default authRoute;