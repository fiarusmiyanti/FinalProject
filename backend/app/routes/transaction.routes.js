module.exports = (app) => {
  const transactions = require("../controllers/transaction.controller.js");

  var router = require("express").Router();

  router.post("/transaction", transactions.create);
  router.get("/transaction", transactions.findAll);
  router.get("/transaction/:id", transactions.findOne);
  router.put("/transaction/:id", transactions.update);
  router.delete("/transaction/:id", transactions.delete);

  app.use("/", router);
};
