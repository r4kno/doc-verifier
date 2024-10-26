// Import the required modules
import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

// Create a Router object
const router = express.Router();

// Route to get user details by id
router.get("/:id", verifyToken, getUser);

// Route to get the friends of a user by id
router.get("/:id/friends", verifyToken, getUserFriends);

// Route to add or remove a friend for a user
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// Export the router object to be used in other parts of the app
export default router;
