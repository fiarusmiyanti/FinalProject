module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    nomorHandphone: {
      type: Sequelize.STRING,
    },
    alamat: {
      type: Sequelize.STRING,
    },
    productName: {
      type: Sequelize.STRING,
    },
    buktiTransfer: {
      type: Sequelize.STRING,
    },
  });
  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User, { foreignKey: "userEmail" });
  };
  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Product, { foreignKey: "productId" });
  };
  return Transaction;
};
