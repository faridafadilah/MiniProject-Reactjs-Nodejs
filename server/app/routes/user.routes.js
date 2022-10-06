const { authJwt } = require("../middleware"); // Call Middleware
const controller = require("../controllers/user.controller"); // Call Controller

module.exports = function (app) {
  // Middleware Access Token
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Route Method Get All Access
  app.get("/api/test/all", controller.allAccess);

  // Route Method Get For User and Check auth
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // Route Method Get For Super Admin and Check auth
  app.get(
    "/api/test/super",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    controller.superBoard
  );

  // Route Method Get For Admin and Check auth
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
