const mongoose = require("mongoose");
const validator = require("validator");

const NewsArticleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Image should be a valid url",
      },
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentNews",
      },
    ],
  },
  { timestamps: true }
);

const NewsArticle = mongoose.model("NewsArticle", NewsArticleSchema);

module.exports = NewsArticle;
