const ArticlieAboutRepairs = require("../models/Articlies-about-repairs");

async function addArticleAboutRepairs(article) {
  const newArticleAboutRepairs = await ArticlieAboutRepairs.create(article);

  await newArticleAboutRepairs.populate({
    path: "comments",
    populate: "author",
  });

  return newArticleAboutRepairs;
}

async function editArticleAboutRepairs(id, article) {
  const newArticleAboutRepairs = await ArticlieAboutRepairs.findByIdAndUpdate(
    id,
    article,
    {
      returnDocument: "after",
    }
  );

  await newArticleAboutRepairs.populate({
    path: "comments",
    populate: "author",
  });

  return newArticleAboutRepairs;
}

function deleteArticleAboutRepairs(id) {
  return ArticlieAboutRepairs.deleteOne({ _id: id });
}

async function getArticlesAboutRepairs(searsh = "", limit = 6, page = 1) {
  const [article, count] = await Promise.all([
    ArticlieAboutRepairs.find({ title: { $regex: searsh, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    ArticlieAboutRepairs.countDocuments({
      title: { $regex: searsh, $options: "i" },
    }),
  ]);

  return {
    article,
    lastPage: Math.ceil(count / limit),
  };
}

function getArticleAboutRepairs(id) {
  return ArticlieAboutRepairs.findById(id).populate({
    path: "comments",
    populate: "author",
  });
}

module.exports = {
  addArticleAboutRepairs,
  editArticleAboutRepairs,
  deleteArticleAboutRepairs,
  getArticlesAboutRepairs,
  getArticleAboutRepairs,
};
