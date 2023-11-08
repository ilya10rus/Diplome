const NewsArticle = require("../models/News-articlies");

//add
async function addNewsArticle(article) {
  const recentNewsArticle = await NewsArticle.create(article);

  await recentNewsArticle.populate({
    path: "comments",
    populate: "author",
  });

  return recentNewsArticle;
}
//edit
async function editNewsArticle(id, article) {
  const recentNewsArticle = await NewsArticle.findByIdAndUpdate(id, article, {
    returnDocument: "after",
  });

  await recentNewsArticle.populate({
    path: "comments",
    populate: "author",
  });

  return recentNewsArticle;
}
//delete
function deleteNewsArticle(id) {
  return NewsArticle.deleteOne({ _id: id });
}
//get list with searsh and pagination
async function getNewsArticles(searsh = "", limit = 6, page = 1) {
  const [article, count] = await Promise.all([
    NewsArticle.find({ title: { $regex: searsh, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    NewsArticle.countDocuments({ title: { $regex: searsh, $options: "i" } }),
  ]);

  return {
    article,
    lastPage: Math.ceil(count / limit),
  };
}
//get item
function getNewsArticle(id) {
  return NewsArticle.findById(id).populate({
    path: "comments",
    populate: "author",
  });
}

module.exports = {
  addNewsArticle,
  editNewsArticle,
  deleteNewsArticle,
  getNewsArticles,
  getNewsArticle,
};
