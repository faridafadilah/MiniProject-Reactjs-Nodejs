const { verifySignUp } = require("../middleware"); // Call Middleware
const controller = require("../controllers/auth.controller"); // Call Controller

module.exports = function(app) {
  // Middleware Access
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Route Method Post Register
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  // Route Method Post Login
  app.post("/api/auth/signin", controller.signin);
};