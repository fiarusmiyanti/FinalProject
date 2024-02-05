module.exports = (app) => {
  const products = require("../controllers/product.controller");

  var router = require("express").Router();

  router.post("/shop", products.create);
  router.get("/shop", products.findAll);
  router.get("/shop/:id", products.findOne);
  router.put("/shop/:id", products.update);
  router.delete("/shop/:id", products.delete);

  app.use("/", router);
};
