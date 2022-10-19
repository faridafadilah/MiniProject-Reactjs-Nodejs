module.exports = (app) => {
    const user = require("../controllers/profile.controller"); // Call COntroller
  
    var router = require("express").Router();
  
    // Retrieve a single Main with id
    router.get("/:id", user.findOne);

    // Update a Main with id
    router.patch("/:id", user.update);
  
    app.use("/api/profile", router);
  };
  