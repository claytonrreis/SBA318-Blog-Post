const express = require("express");
const router = express.Router();

const posts = require("../data/posts");

//POSTS ROUTES
//POSTS - GET - SHOW ALL POSTS
router.get("/", (req, res) => {
  res.json(posts);
});

//SHOW - GET - SHOW ONE POST
router.get("/:id", (req, res, next) => {
  const post = posts.find((p) => p.id === +req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
    next();
  }
});

// CREATE - POST - CREATE A NEW POST
router.post("/", (req, res) => {
  const { username, title, content } = req.body;
  if (!username || !title || !content) {
    return res.status(400).json({
      error: "Insufficient data. Please provide username, title, and content.",
    });
  }
  const newPost = {
    id: posts[posts.length - 1].id + 1,
    title,
    username,
    content,
    date: new Date(),
    comments: [],
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

//UPDATE -  PATCH  - UPDATE POST BY ID
router.patch("/:id", (req, res, next) => {
  const post = posts.find((p, i) => {
    if (p.id === +req.params.id) {
      for (const key in req.body) {
        posts[i][key] = req.body[key];
      }
      return true;
    }
  });
  if (post) res.json(post);
  else next();
});

//DELETE -  DELETE - DELETE POST BY ID
router.delete("/:id", (req, res, next) => {
  const post = posts.find((p, i) => {
    if (p.id === +req.params.id) {
      posts.splice(i, 1);
      return true;
    }
  });
  if (post) res.json(post);
  else next();
});

//COMMENTS ROUTES
//COMMENTS - GET - SHOW ALL COMMENTS FOR A SPECIFIC POST
router.get("/:postId/comments", (req, res, next) => {
  const postId = +req.params.postId;
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post.comments);
  next();
});

//COMMENTS - GET - SHOW A SPECIFIC COMMENT FOR A SPECIFIC POST
router.get("/:postId/comments/:commentId", (req, res, next) => {
  const postId = +req.params.postId;
  const commentId = +req.params.commentId;
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  const comment = post.comments.find((comment) => comment.id === commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.json(comment);
  next();
});

//COMMENTS - POST - CREATE A COMMENT FOR A SPECIFIC POST
let nextCommentId = 2;
router.post("/:postId/comments", (req, res) => {
  const postId = +req.params.postId;
  const { text, username } = req.body;
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (!text || !username) {
    return res
      .status(400)
      .json({ error: "Insufficient data. Please provide text and username." });
  }

  nextCommentId++;

  const newComment = {
    id: nextCommentId,
    text,
    username,
    date: new Date(),
  };
  post.comments.push(newComment);
  res.status(201).json(newComment);
});

//COMMENTS - PATCH - UPDATE A COMMENT FOR A SPECIFIC POST
router.patch("/:postId/comments/:commentId", (req, res) => {
  const postId = +req.params.postId;
  const commentId = +req.params.commentId;
  const { text } = req.body;

  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const comment = post.comments.find((comment) => comment.id === commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  comment.text = text || comment.text;

  res.json(comment);
});

//COMMENTS - DELETE - DELETE A COMMENT FOR A SPECIFIC POST
router.delete("/:postId/comments/:commentId", (req, res) => {
  const postId = +req.params.postId;
  const commentId = +req.params.commentId;

  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const commentIndex = post.comments.findIndex(
    (comment) => comment.id === commentId
  );
  if (commentIndex === -1) {
    return res.status(404).json({ error: "Comment not found" });
  }

  const deletedComment = post.comments.splice(commentIndex, 1)[0];

  res.json(deletedComment);
});
module.exports = router;
