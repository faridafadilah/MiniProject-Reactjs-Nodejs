const express = require("express"); // Framework Express
const router = express.Router(); // Router from Express
const db = require("../models"); // Call Model
const Post = db.post; // Call Model User

// Route to Create Post
router.post("/create", (req, res) => {
  // Create a New Post
  const newPost = {
    content: req.body.content,
    threadId: req.body.threadId,
    userId: req.body.userId,
    nameUser: req.body.nameUser
  };

  // Save Post in the database
  Post.create(newPost)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the sub forum.",
      });
    });
});

// Route to All content Post
router.get("/", async (req, res) => {
  const page = req.query.page;
  const perPage = 10;
  const posts = await Post.findAll({
    where: {
      threadId: req.query.threadId,
    },
    limit: perPage,
    offset: perPage * (page - 1),
  });
  res.send(posts);
});

module.exports = router;
