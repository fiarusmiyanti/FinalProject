const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400).send({
        message: "Nama Harus Diisi !",
      });
      return;
    } else if (!req.body.password) {
      res.status(400).send({
        message: "Password Harus Diisi !",
      });
      return;
    }

    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (!existingUser) {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };

      User.create(user)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: "Oops ! Something went wrong",
          });
        });
    } else {
      res.status(400).send({
        message: "Email Sudah Terdaftar",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Terjadi kesalahan saat mencoba membuat pengguna baru.",
    });
  }
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;

  User.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Oops ! Something went wrong",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findOne({
    where: { email: req.body.email, password: req.body.password },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `User dengan id ${id} tidak ditemukan`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Oops ! Something went wrong",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User berhasil di update",
        });
      } else {
        res.send({
          message: `Gagal mengupdate !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Oops ! Something went wrong",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User berhasil di hapus",
        });
      } else {
        res.send({
          message: `Gagal menghapus !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Oops ! Something went wrong",
      });
    });
};

exports.login = (req, res) => {
  User.findOne({
    where: { email: req.body.email, password: req.body.password },
  }).then((data) => {
    if (data) {
      res.status(200).send({ message: "Berhasil Login" });
    } else {
      res.status(204).send({
        message: "Gagal Login",
      });
    }
  });
};
