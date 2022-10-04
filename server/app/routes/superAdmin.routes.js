module.exports = app => {
    const users = require('../controllers/superAdmin.controller');
  
    var router = require("express").Router();
  
    // Retrieve all users
    router.get("/", users.findAll);
  
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", users.update);
  
    // Delete a User with id
    router.delete("/:id", users.delete);
  
    app.use('/api/super', router);
  };