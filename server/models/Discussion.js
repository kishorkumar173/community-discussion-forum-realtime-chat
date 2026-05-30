import mongoose from "mongoose";

const discussionSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      tags: [
        {
          type: String,
        },
      ],

      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      votes: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

const Discussion = mongoose.model(
  "Discussion",
  discussionSchema
);

export default Discussion;