import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    gold: 0,
    power: 0,
    level: 0,
    class: 0, //0 - knight, 1 - ranger, 2 - mage
    abilities_name: [
      //0 - knight, 1 - ranger, 2 - mage
      ["Sword slash", "Shield Bash", "Crossbow attack"],
      ["Arrow shot", "Poisoned arrow shot", "Dagger slash"],
      ["Fireball", "Magic missle", "Healing spell"],
    ],
    abilities: [
      //0 - knight, 1 - ranger, 2 - mage
      [20, 10, 3], // slash: 20, shield_bash: 10, crossbow_attack: 3
      [20, 5, 10], //  arrow_shot: 20, poisoned_arrow_shot: 5, dagger_slash: 10
      [5, 10, 2], // fireball: 5, magic_missle: 10, health_regen: 2
    ],
    max_health: 34,
    health: 34,
    cave_floor: 1,
    forest_floor: 1,
  },
  reducers: {
    LOGIN(state, action) {
      const name = action.payload.name;
      const gold = action.payload.gold;
      const power = action.payload.power;
      const cave_floor = action.payload.cave_floor;
      const forest_floor = action.payload.forest_floor;
      const level = action.payload.level;
      const health = action.payload.health;
      const c = action.payload.class;
      const abilities = action.payload.abilities;
      state.abilities = abilities;
      state.name = name;
      state.gold = gold;
      state.power = power;
      state.cave_floor = cave_floor;
      state.forest_floor = forest_floor;
      state.level = level;
      state.health = health;
      state.class = c;
    },
    CHANGE_GOLD(state, action) {
      const newGold = state.gold + action.payload;
      state.gold = newGold;
    },
    CHANGE_POWER(state, action) {
      const newPower = state.power + action.payload;
      state.power = newPower;
    },
    CHANGE_LEVEL(state, action) {
      let level = state.level + action.payload;

      if (level >= 100) {
        level = Math.floor(level / 100);
        console.log(level);
        const newPower = state.power + level * 12;
        state.power = newPower;

        const maxHealth = 33 + newPower;
        state.max_health = Math.floor(maxHealth);
        state.health = Math.floor(maxHealth);
        state.abilities = [
          [20, 10, 3],
          [20, 5, 10],
          [5, 10, 2],
        ];
      }

      state.level = level;
    },
    CHANGE_CLASS(state, action) {
      const newClass = action.payload;
      state.class = newClass;
    },
    CHANGE_ABILITY_NUMBER(state, action) {
      var newNumberOfAbilities = state.abilities;
      newNumberOfAbilities[action.payload.classIndex][
        action.payload.abilityIndex
      ] =
        state.abilities[action.payload.classIndex][
          action.payload.abilityIndex
        ] - 1;
      state.abilities = newNumberOfAbilities;
    },
    REFILL_ABILITY_NUMBER(state) {
      state.abilities = [
        [20, 10, 3],
        [20, 5, 10],
        [5, 10, 2],
      ];
    },
    CHANGE_MAX_HEALTH(state, action) {
      const newHealth = action.payload;
      state.max_health = newHealth;
    },
    TAKE_DAMAGE(state, action) {
      if (
        action.payload < 0 &&
        state.health - action.payload > state.max_health
      ) {
        state.health = state.max_health;
      } else {
        const newHealth = state.health - action.payload;
        state.health = newHealth;
      }
    },
    RESET_HEALTH(state) {
      const newHealth = state.max_health;
      state.health = newHealth;
    },
    CHANGE_FLOOR(state, action) {
      if (action.payload === "cave") {
        const newFloor = state.cave_floor + 1;
        state.cave_floor = newFloor;
      } else if (action.payload === "forest") {
        const newFloor = state.forest_floor + 1;
        state.forest_floor = newFloor;
      }
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
