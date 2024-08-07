const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const playerRoutes = require("./routes/player");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes

app.use("/player", playerRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.SERVER_NAME}:${process.env.SERVER_PASSWORD}@practice.4zdvjq5.mongodb.net/game?retryWrites=true&w=majority&appName=practice`
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
