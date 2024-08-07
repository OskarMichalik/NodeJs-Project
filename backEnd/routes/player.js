const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const playerController = require("../controllers/player");
//const isAuth = require("../middleware/is-auth");

router.post(
  "/register",
  body("name").trim().notEmpty(),
  body("password").notEmpty(),
  playerController.postRegister
);
router.post(
  "/login",
  body("name").trim().notEmpty(),
  body("password").notEmpty(),
  playerController.postLogin
);
router.put(
  "/stats",
  body("name").trim().notEmpty(),
  body("statName").trim().notEmpty(),
  body("value").notEmpty(),
  playerController.putChangeStats
);
//router.get("/stats/:playerName", playerController.getStats);
router.post(
  "/stats/reset",
  body("name").notEmpty(),
  playerController.postReset
);

module.exports = router;
