import express from "express";
import { login, authorityLogin } from "../controllers/auth.js";

// Route for logging in the user
const router = express.Router();

router.post("/login", login);
router.post("/authoritylogin", authorityLogin);
export default router;
