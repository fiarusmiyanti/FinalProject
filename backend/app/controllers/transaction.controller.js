const db = require("../models");
const Transaction = db.transaction;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const transaction = {
    name: req.body.name,
    email: req.body.email,
    nomorHandphone: req.body.nomorHandphone,
    alamat: req.body.alamat,
    productName: req.body.productName,
  };

  Transaction.create(transaction)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message ? err.message : "Oops ! Something went wrong",
      });
    });
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;

  Transaction.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message ? err.message : "Oops ! Something went wrong",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Transaction.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Transaksi dengan id ${id} tidak ditemukan`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message ? err.message : "Oops ! Something went wrong",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Transaction.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Transaksi berhasil di update",
        });
      } else {
        res.send({
          message: `Gagal mengupdate !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message ? err.message : "Oops ! Something went wrong",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Transaction.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Transaksi berhasil di hapus",
        });
      } else {
        res.send({
          message: `Gagal menghapus !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message ? err.message : "Oops ! Something went wrong",
      });
    });
};
