const express = require("express");
const dataBase = require("./ConfigFolder");
const routers = require("./Routes/index");
require("dotenv/config");

const { port } = process.env;

const PORT = port;

const app = express();
app.use(express.json())
app.use("/api", routers);
dataBase();

app.listen(PORT, () => {
  console.log(new Date().toLocaleDateString(), PORT);
});
