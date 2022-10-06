module.exports = (app) => {
  const thread = require("../controllers/thread.controller");

  var router = require("express").Router();

  // Create thread
  router.post("/create", thread.create);

  // Retrieve all thread
  router.get("/", thread.findAll);

  // Retrieve a single Thread with id
  router.get("/:id", thread.findOne);

  // Delete a Thread with id
  router.delete("/:id", thread.delete);

  app.use("/api/thread", router);
};
