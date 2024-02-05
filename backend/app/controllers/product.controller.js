const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Nama Product Harus Diisi !",
    });
    return;
  } else if (!req.body.price) {
    res.status(400).send({
      message: "Harga Product Harus Diisi !",
    });
    return;
  } else if (!req.body.desc) {
    res.status(400).send({
      message: "Deskripsi Product Harus Diisi !",
    });
    return;
  }
  // } else if (!req.files) {
  //   res.status(400).send({
  //     message: "Gambar Product Harus Diisi !",
  //   });
  //   return;
  // }

  // const file = req.files.file;

  // file.mv(`${__dirname}/frontend/public/uploads/${file}`, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).send(err);
  //   }
  //   res.json({ fileName: file, filePath: `/upload/${file}` });
  // });

  const product = {
    name: req.body.name,
    price: Number(req.body.price),
    desc: req.body.desc,
    // image: UFileName,
  };

  Product.create(product)
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
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Product.findAll({
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

  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Product dengan id ${id} tidak ditemukan`,
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

  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product berhasil di update",
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

  Product.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product berhasil di hapus",
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
