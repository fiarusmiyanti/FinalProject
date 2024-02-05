module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    desc: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });
  Product.associate = function (models) {
    Product.hasMany(models.Transaction);
  };
  return Product;
};
