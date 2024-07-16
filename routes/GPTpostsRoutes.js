const express = require("express");
const router = express.Router();

const posts = require("../data/posts");

// GET - SHOW ALL POSTS
router.get("/", (req, res) => {
  res.json(posts);
});

// GET - SHOW ONE POST
router.get("/:id", (req, res, next) => {
  const post = posts.find((post) => post.id === +req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// POST - CREATE A NEW POST
router.post("/", (req, res) => {
  const { username, title, content } = req.body;

  // Validate input
  if (!username || !title || !content) {
    return res.status(400).json({
      error: "Insufficient data. Please provide username, title, and content.",
    });
  }

  // Generate new post
  const newPost = {
    id: generateUniqueId(),
    username,
    title,
    content,
    date: new Date().toISOString(),
    comments: [],
  };

  // Add to posts array
  posts.push(newPost);

  // Respond with the newly created post
  res.status(201).json(newPost);
});

// CREATE - POST - create new Post
router.post("/", (req, res) => {
  const { username, title, content } = req.body;

  // Check if all required fields are provided
  if (!username || !title || !content) {
    return res.status(400).json({
      error: "Insufficient data. Please provide username, title, and content.",
    });
  }

  // Generate a new post object
  const newPost = {
    id: generateUniqueId(), // Example function to generate unique IDs
    username,
    title,
    content,
    date: new Date().toISOString(), // Example: Use current date/time as the post creation date
    comments: [], // Assuming comments array starts empty for a new post
  };

  // Add the new post to your posts array (assuming posts is defined and accessible)
  posts.push(newPost);

  // Respond with the newly created post
  res.status(201).json(newPost);
});

// Function to generate unique IDs (example)
function generateUniqueId() {
  // Example implementation, replace with your own logic to generate unique IDs
  return Date.now(); // This is a simple example, not guaranteed to be unique in all cases
}

// PATCH - UPDATE A POST
router.patch("/:id", (req, res, next) => {
  const postId = +req.params.id;
  let updated = false;

  posts.forEach((post) => {
    if (post.id === postId) {
      for (const key in req.body) {
        if (key !== "id") {
          // Ensure id is not updated accidentally
          post[key] = req.body[key];
        }
      }
      updated = true;
      res.json(post);
    }
  });

  if (!updated) {
    res.status(404).json({ error: "Post not found" });
  }
});

// DELETE - DELETE A POST
router.delete("/:id", (req, res, next) => {
  const postId = +req.params.id;
  let deletedPost = null;

  posts.forEach((post, index) => {
    if (post.id === postId) {
      deletedPost = posts.splice(index, 1)[0];
    }
  });

  if (deletedPost) {
    res.json(deletedPost);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// Function to generate unique IDs (example)
function generateUniqueId() {
  return Date.now();
}

// GET all comments for a specific post
router.get("/:postId/comments", (req, res) => {
  const postId = +req.params.postId;
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post.comments);
});

// GET a specific comment for a specific post
router.get("/:postId/comments/:commentId", (req, res) => {
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
});

// POST create a new comment for a specific post
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

  const newComment = {
    id: generateUniqueId(), // Example function to generate unique IDs
    text,
    username,
    date: new Date().toISOString(),
  };

  post.comments.push(newComment);

  res.status(201).json(newComment);
});

// PATCH update an existing comment for a specific post
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

  comment.text = text || comment.text; // Update only if text is provided

  res.json(comment);
});

// DELETE delete a comment for a specific post
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
