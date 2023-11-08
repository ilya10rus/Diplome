const mongoose = require("mongoose");
const validator = require("validator");

const ArticlieAboutRepairsSchema = mongoose.Schema(
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
        ref: "CommentArticleAboutRepairs",
      },
    ],
  },
  { timestamps: true }
);

const ArticlieAboutRepairs = mongoose.model(
  "ArticlieAboutRepairs",
  ArticlieAboutRepairsSchema
);

module.exports = ArticlieAboutRepairs;
