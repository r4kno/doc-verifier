import express from "express";
import { getFeedDocs, getUserDocs, likeDoc } from "../controllers/docs.js";
import { verifyToken } from "../middleware/auth.js";

// Create a new express router instance
const router = express.Router();

// Route to get all the docs in the feed
// Requests to this route must have a valid JWT token
// The request is handled by the `getFeeddocs` function from the `docs` controller
router.get("/", verifyToken, getFeedDocs);

// Route to get all the docs of a specific user
// Requests to this route must have a valid JWT token
// The request is handled by the `getUserdocs` function from the `docs` controller
router.get("/:userId/docs", verifyToken, getUserDocs);

// Route to handle like/unlike of a doc
// Requests to this route must have a valid JWT token
// The request is handled by the `likedoc` function from the `docs` controller
router.patch("/:id/like", verifyToken, likeDoc);

// Export the router instance
export default router;
