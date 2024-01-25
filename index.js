const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const process = require("process");
require('dotenv').config()
const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME

const DB_URL = process.env.DB_URL;


const DB = `${DB_URL}${DB_NAME}?authSource=admin`;


const app = express();
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/auth/authRoutes"));

app.get("/", (req, res) => {
  console.log("GET request received");
  res.send("Hello, World!");
});

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });
