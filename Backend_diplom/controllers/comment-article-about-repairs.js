const CommentArticleAboutRepairs = require("../models/Comment-article-about-repairs");
const ArticleAboutRepairs = require("../models/Articlies-about-repairs");

//add

async function addCommentRepairs(articleId, comment) {
  const newComment = await CommentArticleAboutRepairs.create(comment);

  await ArticleAboutRepairs.findByIdAndUpdate(articleId, {
    $push: { comments: newComment },
  });

  await newComment.populate("author");

  return newComment;
}

//delete
async function deleteCommentRepairs(articleId, commentId) {
  await CommentArticleAboutRepairs.deleteOne({ _id: commentId });
  await ArticleAboutRepairs.findByIdAndUpdate(articleId, {
    $pull: { comments: commentId },
  });
}

module.exports = {
  addCommentRepairs,
  deleteCommentRepairs,
};
