module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/user", users.create);
  router.get("/user", users.findAll);
  router.get("/user/:id", users.findOne);
  router.put("/user/:id", users.update);
  router.delete("/user/:id", users.delete);
  router.post('/user/login', users.login)

  app.use("/", router);
};
