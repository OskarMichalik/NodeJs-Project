import classes from "./NextFloorMenu.module.css";
import { useDispatch } from "react-redux";
import { profileActions } from "../../../../store/profileSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function NextFloorMenu({ location, setLocation }) {
  const cave_floor = useSelector((state) => state.profile.cave_floor);
  const forest_floor = useSelector((state) => state.profile.forest_floor);
  //location = "cave" / "forest"
  const dispatch = useDispatch();
  const [updateFloor, setUpdateFloor] = useState(false);

  //temp
  const name = useSelector((state) => state.profile.name);

  function nextFloor() {
    setUpdateFloor(true);
    dispatch(profileActions.CHANGE_FLOOR(location));
  }
  function leaveDungeon() {
    setUpdateFloor(true);
    dispatch(profileActions.CHANGE_FLOOR(location));
    setLocation("");
  }
  useEffect(() => {
    async function updateFloorFn() {
      let data;
      if (location === "cave") {
        data = await fetch("http://localhost:8080/player/stats", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            statName: "cave_floor",
            value: cave_floor + 1,
          }),
        });
      } else if (location === "forest") {
        data = await fetch("http://localhost:8080/player/stats", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            statName: "forest_floor",
            value: forest_floor + 1,
          }),
        });
      }
      const user = await data.json();
      if (user.status !== 200) {
        console.log("Error: cannot update floor!");
      }
    }
    if (updateFloor) updateFloorFn();
  }, [updateFloor]);
  return (
    <div className={classes.userOptions}>
      <h2>What is your next move?</h2>
      <motion.p
        className={classes.pointerHover}
        animate={{ x: 0 }}
        whileHover={{ x: 5 }}
        onClick={() => nextFloor()}
      >
        &gt; Go to the next floor
      </motion.p>
      <motion.p
        className={classes.pointerHover}
        animate={{ x: 0 }}
        whileHover={{ x: 5 }}
        onClick={() => leaveDungeon()}
      >
        &gt; Leave the dungeon
      </motion.p>
    </div>
  );
}
