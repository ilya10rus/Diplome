const mongoose = require("mongoose");
const mapComment = require("./mapComment");

module.exports = function (article) {
  return {
    id: article.id,
    title: article.title,
    imageUrl: article.image,
    content: article.content,
    comments: article.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
    ),
    publishedAt: article.createdAt,
  };
};
