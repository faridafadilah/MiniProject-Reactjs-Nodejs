module.exports = (app) => {
  const sub = require("../controllers/subForum.controller");

  var router = require("express").Router();

  // Create sub
  router.post("/create", sub.create);

  // Retrieve all sub
  router.get("/", sub.findAll);

  // Retrieve a single Sub with id
  router.get("/:id", sub.findOne);

  // Update a Sub with id
  router.put("/:id", sub.update);

  // Delete a Sub with id
  router.delete("/:id", sub.delete);

  app.use("/api/sub", router);
};
