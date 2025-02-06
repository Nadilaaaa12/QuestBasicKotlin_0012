const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);

const mahasiswaRouter = require("./routes/mahasiswa");
app.use("/api/mahasiswa", mahasiswaRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
