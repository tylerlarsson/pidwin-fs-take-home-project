import express from "express";
import login from "./user-login.js";
import signup from "./user-signup.js";
import changePassword from "./user-change-password.js";
import wager from "./user-wager.js";
import userProfile from "./user-profile.js";
import auth from "../utils/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);
router.post("/wager", auth, wager);
router.post("/userProfile", auth, userProfile);

export default router;
