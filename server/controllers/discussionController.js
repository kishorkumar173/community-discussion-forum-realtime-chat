import Discussion from "../models/Discussion.js";

// Create Discussion
export const createDiscussion =
  async (req, res) => {
    try {

      const {
        title,
        description,
        tags,
      } = req.body;

      const discussion =
        await Discussion.create({
          title,
          description,
          tags,
          createdBy:
            req.user._id,
        });

      res.status(201).json(
        discussion
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Get All Discussions
export const getDiscussions =
  async (req, res) => {
    try {

      const discussions =
        await Discussion.find()
          .populate(
            "createdBy",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json(discussions);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };
  // Get Discussion By ID
export const getDiscussionById =
  async (req, res) => {
    try {

      const discussion =
        await Discussion.findById(
          req.params.id
        ).populate(
          "createdBy",
          "name email"
        );

      if (!discussion) {
        return res.status(404).json({
          message:
            "Discussion not found",
        });
      }

      res.json(discussion);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };