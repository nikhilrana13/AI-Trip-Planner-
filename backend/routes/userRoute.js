import express from "express";
import { UserSignUp, userLogin , Logout } from "../controllers/userAuth.js";
const router = express.Router();


router.post("/signup",UserSignUp);
router.post("/login",userLogin);
router.get("/logout",Logout)

export default router