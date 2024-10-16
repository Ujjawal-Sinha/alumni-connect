import express from "express";
import { searchUsers } from "../controllers/search.controller.js"; // Import the controller function

const router = express.Router();

// Route for searching users based on query parameters
router.get("/users", searchUsers);

export default router;
