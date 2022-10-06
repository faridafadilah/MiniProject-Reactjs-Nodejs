module.exports = (app) => {
  const main = require("../controllers/mainForum.controller");

  var router = require("express").Router();

  // Create main
  router.post("/create", main.create);

  // Retrieve all main
  router.get("/", main.findAll);

  // Retrieve a single Main with id
  router.get("/:id", main.findOne);

  // Update a Main with id
  router.put("/:id", main.update);

  // Delete a Main with id
  router.delete("/:id", main.delete);

  app.use("/api/main", router);
};
