import Comment from "../models/Comment.js";

// Create Comment
export const createComment =
  async (req, res) => {
    try {

      const { text } =
        req.body;

      const comment =
        await Comment.create({
          discussionId:
            req.params.id,

          userId:
            req.user._id,

          text,
        });

      const populatedComment =
        await Comment.findById(
          comment._id
        ).populate(
          "userId",
          "name"
        );

      res.status(201).json(
        populatedComment
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Get Comments
export const getComments =
  async (req, res) => {
    try {

      const comments =
        await Comment.find({
          discussionId:
            req.params.id,
        })
          .populate(
            "userId",
            "name"
          )
          .sort({
            createdAt: -1,
          });

      res.json(comments);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };