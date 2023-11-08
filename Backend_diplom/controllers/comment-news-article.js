const NewsArticle = require("../models/News-articlies");
const CommentNews = require("../models/Comment-news-article");

//add

async function addCommentNews(articleId, comment) {
  const newComment = await CommentNews.create(comment);

  await NewsArticle.findByIdAndUpdate(articleId, {
    $push: { comments: newComment },
  });

  await newComment.populate("author");

  return newComment;
}

//delete
async function deleteCommentNews(articleId, commentId) {
  await CommentNews.deleteOne({ _id: commentId });
  await NewsArticle.findByIdAndUpdate(articleId, {
    $pull: { comments: commentId },
  });
}

module.exports = {
  addCommentNews,
  deleteCommentNews,
};
