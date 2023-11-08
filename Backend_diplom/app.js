require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
} = require("./controllers/user");
const {
  addArticleAboutRepairs,
  editArticleAboutRepairs,
  deleteArticleAboutRepairs,
  getArticlesAboutRepairs,
  getArticleAboutRepairs,
} = require("./controllers/articlies-about-repairs");
const {
  addNewsArticle,
  editNewsArticle,
  deleteNewsArticle,
  getNewsArticles,
  getNewsArticle,
} = require("./controllers/news-articles");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const ROLES = require("./constants/roles");
const mapArticlie = require("./helpers/mapArticlie");
const {
  addCommentRepairs,
  deleteCommentRepairs,
} = require("./controllers/comment-article-about-repairs");

const {
  addCommentNews,
  deleteCommentNews,
} = require("./controllers/comment-news-article");

const mapComment = require("./helpers/mapComment");

const port = 3001;
const app = express();

app.use(express.static("../Frontend_diplom/build"));

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res.cookie("token", token, { httpOnly: true }).send({
      error: null,
      user: mapUser(user),
    });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);
    res.cookie("token", token, { httpOnly: true }).send({
      error: null,
      user: mapUser(user),
    });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

app.get("/articleaboutrepairs", async (req, res) => {
  const { article, lastPage } = await getArticlesAboutRepairs(
    req.query.search,
    req.query.limit,
    req.query.page
  );
  res.send({ data: { lastPage, posts: article.map(mapArticlie) } });
});

app.get("/newsarticles", async (req, res) => {
  const { article, lastPage } = await getNewsArticles(
    req.query.search,
    req.query.limit,
    req.query.page
  );
  res.send({ data: { lastPage, posts: article.map(mapArticlie) } });
});

app.get("/articleaboutrepairs/:id", async (req, res) => {
  const article = await getArticleAboutRepairs(req.params.id);

  res.send({ data: mapArticlie(article) });
});
app.get("/newsarticles/:id", async (req, res) => {
  const article = await getNewsArticle(req.params.id);

  res.send({ data: mapArticlie(article) });
});

app.use(authenticated);

app.post("/articleaboutrepairs/:id/comments", async (req, res) => {
  const newComment = await addCommentRepairs(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComment(newComment) });
});
app.post("/newsarticles/:id/comments", async (req, res) => {
  const newComment = await addCommentNews(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComment(newComment) });
});

app.delete(
  "/articleaboutrepairs/:articleId/comments/:commentId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteCommentRepairs(req.params.articleId, req.params.commentId);

    res.send({ error: null });
  }
);

app.delete(
  "/newsarticles/:articleId/comments/:commentId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteCommentNews(req.params.articleId, req.params.commentId);

    res.send({ error: null });
  }
);

app.post(
  "/articleaboutrepairs",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const newArticle = await addArticleAboutRepairs({
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageUrl,
    });

    res.send({ data: mapArticlie(newArticle) });
  }
);

app.post(
  "/newsarticles",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const newArticle = await addNewsArticle({
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageUrl,
    });

    res.send({ data: mapArticlie(newArticle) });
  }
);

app.patch(
  "/newsarticles/:id",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const updateArticle = await editNewsArticle(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageUrl,
    });

    res.send({ data: mapArticlie(updateArticle) });
  }
);

app.patch(
  "/articleaboutrepairs/:id",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const updateArticle = await editArticleAboutRepairs(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageUrl,
    });

    res.send({ data: mapArticlie(updateArticle) });
  }
);

app.delete(
  "/articleaboutrepairs/:id",
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteArticleAboutRepairs(req.params.id);

    res.send({ error: null });
  }
);

app.delete("/newsarticles/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteNewsArticle(req.params.id);

  res.send({ error: null });
});

app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = await getRoles();

  res.send({ data: roles });
});

app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newUser) });
});

app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
