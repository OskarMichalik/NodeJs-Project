import { useDispatch, useSelector } from "react-redux";
import classes from "./PlayerIsDead.module.css";
import { profileActions } from "../../../store/profileSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PlayerIsDead({ setLocation, setDeaths }) {
  const dispatch = useDispatch();

  const cave_floor = useSelector((state) => state.profile.cave_floor);
  const forest_floor = useSelector((state) => state.profile.forest_floor);
  const power = useSelector((state) => state.profile.power);
  const gold = useSelector((state) => state.profile.gold);

  const name = useSelector((state) => state.profile.name);

  const [loading, setLoading] = useState(true);
  const [scoreVisible, setScoreVisible] = useState(true);

  useEffect(() => {
    async function resetStats() {
      dispatch(profileActions.CHANGE_MAX_HEALTH(34));
      dispatch(profileActions.REFILL_ABILITY_NUMBER());
      const data = await fetch("http://localhost:8080/player/stats/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      const user = await data.json();
      dispatch(
        profileActions.LOGIN({
          name,
          gold: 15,
          power: 1,
          cave_floor: 1,
          forest_floor: 1,
          level: 0,
          health: 34,
          class: 0,
          abilities: [
            [20, 10, 3], 
            [20, 5, 10], 
            [5, 10, 2], 
          ],
        })
      );
      if (user.status === 200) {
        setLoading(false);
      }
    }
    if (!scoreVisible) resetStats();
  }, [scoreVisible]);

  function startAgain() {
    if (!loading) {
      setDeaths((prev) => prev + 1);
      setLocation("");
    }
  }

  function skipScore() {
    setScoreVisible(false);
  }

  return (
    <motion.div
      className={classes.deathScreen}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
      >
        You Died!
      </motion.h2>
      {scoreVisible && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
        >
          <span className={classes.scoreTitle}>Score:</span>
          <br />
          Cave Floor: {cave_floor}
          <br />
          Forest Floor: {forest_floor}
          <br />
          Gold: {gold}
          <br />
          Power: {power}
        </motion.p>
      )}
      {scoreVisible && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          onClick={() => skipScore()}
          className={classes.tryAgainText}
        >
          Next
        </motion.p>
      )}
      {!scoreVisible && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          onClick={() => startAgain()}
          className={classes.tryAgainText}
        >
          {!loading ? "Try again" : "Loading..."}
        </motion.p>
      )}
    </motion.div>
  );
}
