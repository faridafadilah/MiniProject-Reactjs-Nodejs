module.exports = app => {
    const user_roles = require("../controllers/userRole.controller");

    var router = require("express").Router();

    // Retrieve All user By Id
    router.get("/user/:id", user_roles.getUserAllById);

    // Retrieve All user
    router.get("/", user_roles.getUserRole);

    // Retrieve a single userRole by Id
    router.get("/:id", user_roles.getUserById);

    //Update a single userRole by Id
    router.put("/:userId", user_roles.updateUserRole);

    app.use("/api/userRole", router);
}