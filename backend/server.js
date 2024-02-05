const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

app.use(bodyParser.json());

require("./app/routes/product.routes")(app.use(cors()));
require("./app/routes/user.routes")(app.use(cors()));
require("./app/routes/transaction.routes")(app.use(cors()));

// const corsOptions = {
//   AccessControlAllowOrigin: "http://localhost:3000",
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// };
app.use(cors());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Database ter sinkronisasi");
  })
  .catch((err) => {
    console.log("Gagal mensinkron database : " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome To App" });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
