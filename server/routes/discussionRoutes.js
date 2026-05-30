import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createDiscussion,
  getDiscussions,
  getDiscussionById,
} from "../controllers/discussionController.js";

const router =
  express.Router();

// Create discussion
router.post(
  "/",
  protect,
  createDiscussion
);

// Get all discussions
router.get(
  "/",
  getDiscussions
);
// Get discussion by id
router.get(
  "/:id",
  getDiscussionById
);
export default router;