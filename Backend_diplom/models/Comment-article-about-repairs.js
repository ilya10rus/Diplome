const mongoose = require("mongoose");

const CommentArticleAboutRepairsSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const CommentArticleAboutRepairs = mongoose.model(
  "CommentArticleAboutRepairs",
  CommentArticleAboutRepairsSchema
);

module.exports = CommentArticleAboutRepairs;
