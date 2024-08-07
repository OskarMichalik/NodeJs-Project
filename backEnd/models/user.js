const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gold: {
    type: Number,
    default: 15,
  },
  power: {
    type: Number,
    default: 1,
  },
  level: {
    type: Number,
    default: 0,
  },
  class: {
    type: Number,
    default: 0,
  },
  abilities: {
    type: [[Number]], // This specifies an array of arrays of numbers
    default: [
      [20, 10, 3], // slash: 20, shield_bash: 10, crossbow_attack: 3
      [20, 5, 10], // arrow_shot: 20, poisoned_arrow_shot: 5, dagger_slash: 10
      [5, 10, 2], // fireball: 5, magic_missile: 10, health_regen: 2
    ],
  },
  health: {
    type: Number,
    default: 34,
  },
  cave_floor: {
    type: Number,
    default: 1,
  },
  forest_floor: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("User", userSchema);
