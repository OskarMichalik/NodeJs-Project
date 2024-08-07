const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.postRegister = async (req, res, next) => {
  const error = validationResult(req).array();

  if (error.lenght > 0) {
    res.status(422).json({ message: "Could not create an user!", status: 422 });
    return;
  }

  const userDb = await User.findOne({ name: req.body.name });
  if (userDb) {
    res.status(422).json({ message: "User already exists!", status: 422 });
    return;
  }

  const encryptedPassword = await bcrypt.hash(req.body.password, 12);

  const user = new User({ name: req.body.name, password: encryptedPassword });

  try {
    user.save();

    res.status(201).json({
      message: "User created.",
      user: user,
      status: 201,
    });
  } catch (err) {
    res.status(500).json({ message: "Could not create an user!", status: 500 });
    return;
  }
};

exports.postLogin = async (req, res, next) => {
  const error = validationResult(req).array();

  if (error.lenght > 0) {
    res.status(422).json({ message: "Could not create an user!", status: 422 });
    return;
  }

  const user = await User.findOne({ name: req.body.name });

  if (!user) {
    res.status(404).json({ message: "User does not exists!", status: 404 });
    return;
  }

  if (!bcrypt.compare(req.body.password, user.password)) {
    res.status(422).json({ message: "Password is not correct!", status: 422 });
    return;
  }

  res
    .status(200)
    .json({ massage: "Logged in successfully", data: user, status: 200 });
};

exports.putChangeStats = async (req, res, next) => {
  // Arguments: name, statName, value
  // const user = await User.findOne({ name: req.body.name });
  // if (!user) {
  // res.status(404).json({ message: "User does not exists!", status: 404 });
  // return;
  // }
  console.log(req.body.name);
  console.log(req.body.statName);
  console.log(req.body.value);

  const value = req.body.value;
  const filter = { name: req.body.name };
  let filterValue;

  if (req.body.statName === "gold") {
    filterValue = { gold: value };
    //user.gold = req.body.value;
  } else if (req.body.statName === "power") {
    filterValue = { power: value };
    //user.power = req.body.value;
  } else if (req.body.statName === "level") {
    filterValue = { level: value };
    //user.level = req.body.value;
  } else if (req.body.statName === "class") {
    filterValue = { class: value };
    //user.class = req.body.value;
  } else if (req.body.statName === "ablities") {
    filterValue = { abilities: value };
    //user.abilities = req.body.value;
  } else if (req.body.statName === "health") {
    filterValue = { health: value };
    //user.health = req.body.value;
  } else if (req.body.statName === "cave_floor") {
    filterValue = { cave_floor: value };
    //user.cave_floor = req.body.value;
  } else if (req.body.statName === "forest_floor") {
    filterValue = { forest_floor: value };
    //user.forest_floor = req.body.value;
  }

  try {
    const user = await User.findOneAndUpdate(filter, filterValue);
    //user.save();

    res
      .status(200)
      .json({ message: "User was updated.", user: user, status: 200 });
  } catch (err) {
    res.status(500).json({
      message: "Could not update the user's stats!",
      status: 500,
    });
    return;
  }
};

exports.getStats = async (req, res, next) => {
  const playerName = req.params.playerName;

  const user = await User.findOne({ name: playerName });

  if (!user) {
    console.log("--- Error: User was not found! ---");
    res.status(404).json({ message: "User was not found!", status: 404 });
    return;
  }
  res
    .status(200)
    .json({ message: "User was fetched.", data: user, status: 200 });
};

exports.postReset = async (req, res, next) => {
  const error = validationResult(req).array();

  if (error.lenght > 0) {
    res.status(422).json({ message: "Could not create an user!", status: 422 });
    return;
  }

  const user = await User.findOne({ name: req.body.name });

  if (!user) {
    res.status(404).json({ message: "User does not exists!", status: 404 });
    return;
  }

  user.gold = 15;
  user.power = 1;
  user.level = 0;
  user.class = 0;
  user.abilities = [
    [20, 10, 3],
    [20, 5, 10],
    [5, 10, 2],
  ];
  user.health = 34;
  user.cave_floor = 1;
  user.forest_floor = 1;

  try {
    user.save();

    res
      .status(200)
      .json({ message: "User was updated.", data: user, status: 200 });
  } catch (error) {
    res.status(500).json({ message: "User cannot be updated!", status: 500 });
    return;
  }
};
