import { profileActions } from "./profileSlice";

export const updateGold = (amount) => async (dispatch, getState) => {
  dispatch(profileActions.CHANGE_GOLD(amount));
  const { name, gold } = getState().profile;
  const data = await fetch("http://localhost:8080/player/stats", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      statName: "gold",
      value: gold,
    }),
  });
  const user = await data.json();
  if (user.status !== 200) {
    console.log("Error: Could not update the user&apos;s stats!");
  }
};

export const updateLevel = (amount, update) => async (dispatch, getState) => {
  dispatch(profileActions.CHANGE_LEVEL(amount));
  const { name, level, power, health } = getState().profile;
  //dispatch(profileActions.CHANGE_MAX_HEALTH(33 + power));
  const data1 = await fetch("http://localhost:8080/player/stats", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      statName: "power",
      value: power,
    }),
  });
  const data2 = await fetch("http://localhost:8080/player/stats", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      statName: "level",
      value: level,
    }),
  });
  const user1 = await data1.json();
  const user2 = await data2.json();
  if (user1.status !== 200 || user2.status !== 200) {
    console.log("Error: Could not update the user&apos;s stats!");
  }

  if (updateLevel) {
    const data3 = await fetch("http://localhost:8080/player/stats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        statName: "health",
        value: health,
      }),
    });

    const user3 = await data3.json();
    if (user3.status !== 200) {
      console.log("Error: Could not update the user&apos;s health!");
    }
  }
};
export const updateHealth = (amount) => async (dispatch, getState) => {
  dispatch(profileActions.TAKE_DAMAGE(amount));
  const { name, health } = getState().profile;
  const data = await fetch("http://localhost:8080/player/stats", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      statName: "health",
      value: health,
    }),
  });
  const user = await data.json();
  if (user.status !== 200) {
    console.log("Error: Could not update the user&apos;s stats!");
  }
};
