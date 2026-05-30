import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createComment,
  getComments,
} from "../controllers/commentController.js";

const router =
  express.Router();

// Add Comment
router.post(
  "/:id",
  protect,
  createComment
);

// Get Comments
router.get(
  "/:id",
  getComments
);

export default router;