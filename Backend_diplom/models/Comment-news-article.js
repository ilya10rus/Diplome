const mongoose = require("mongoose");

const CommentNewsSchema = mongoose.Schema(
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

const CommentNews = mongoose.model("CommentNews", CommentNewsSchema);

module.exports = CommentNews;
