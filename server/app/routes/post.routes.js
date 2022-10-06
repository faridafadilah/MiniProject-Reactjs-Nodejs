module.exports = (app) => {
  const post = require("../controllers/post.controller");

  var router = require("express").Router();

  // Create post
  router.post("/create", post.create);

  // Retrieve all post
  router.get("/", post.findAll);

  // Delete a Post with id
  router.delete("/:id", post.delete);

  app.use("/api/post", router);
};
