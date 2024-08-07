import classes from "./LoginPanel.module.css";
import { useRef, useState, useEffect } from "react";
import FormInput from "../FormInput";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { profileActions } from "../../store/profileSlice";

export default function LoginPanel({ setLogStatus }) {
  const dispatch = useDispatch();

  const loginRef = useRef(null);
  const [loginWasSubmitted, setLoginWasSubmitted] = useState(false);
  const [loginErrorOption, setLoginErrorOption] = useState("");

  const passwordRef = useRef(null);
  const [passwordWasSubmitted, setPasswordWasSubmitted] = useState(false);
  const [passwordErrorOption, setPasswordErrorOption] = useState("");

  const [formWasSubmittedAndIsValid, setFromWasSubmittedAndIsValid] =
    useState(false);

  const [loading, setLoading] = useState(false);

  function checkLogin() {
    if (loginRef.current.value === "") {
      setLoginErrorOption("Input required.");
      setLoginWasSubmitted(false);
    } else {
      setLoginErrorOption("");
      setLoginWasSubmitted(true);
    }
  }
  function checkPassword() {
    if (passwordRef.current.value === "") {
      setPasswordErrorOption("Input required.");
      setPasswordWasSubmitted(false);
    } else {
      setPasswordErrorOption("");
      setPasswordWasSubmitted(true);
    }
  }

  useEffect(() => {
    setFromWasSubmittedAndIsValid(false);
    if (formWasSubmittedAndIsValid) {
      async function login() {
        try {
          const data = await fetch(`http://localhost:8080/player/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: loginRef.current.value,
              password: passwordRef.current.value,
            }),
          });
          const user = await data.json();

          if (user.status === 200) {
            setLoading(true);
            dispatch(
              profileActions.LOGIN({
                name: loginRef.current.value,
                gold: user.data.gold,
                power: user.data.power,
                cave_floor: user.data.cave_floor,
                forest_floor: user.data.forest_floor,
                level: user.data.level,
                health: user.data.health,
                class: user.data.class,
                abilities: user.data.abilities,
              })
            );
            if (user.data.power > 1)
              dispatch(profileActions.CHANGE_MAX_HEALTH(33 + user.data.power));

            setLogStatus("loggedIn");
            setLoading(false);
          } else if (user.status === 422) {
            setLoginErrorOption("Login or password is incorrect.");
            setPasswordErrorOption("Login or password is incorrect.");
          } else if (user.status === 404) {
            setLoginErrorOption("This Login doesn't exist.");
          } else if (user.status === 500) {
            setLoginErrorOption("Server error.");
            setPasswordErrorOption("Server error.");
          }
        } catch (error) {
          console.error("Error fetching:", error);
        }
      }
      login();
    }
  }, [
    formWasSubmittedAndIsValid,
    loginRef,
    passwordRef,
    dispatch,
    setLogStatus,
  ]);

  function handleSubmit() {
    if (loginWasSubmitted && passwordWasSubmitted) {
      setFromWasSubmittedAndIsValid(true);
    }
  }

  return (
    <div className={classes.loginPanelDiv} key="loginPanel">
      <div className={classes.loginForm}>
        <h1>Login</h1>
        <div className={classes.form}>
          <FormInput
            label="Name"
            id="name"
            ref={loginRef}
            onChange={checkLogin}
            errorMessage={loginErrorOption}
            onClick={() => setLoginErrorOption("")}
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            ref={passwordRef}
            onChange={checkPassword}
            errorMessage={passwordErrorOption}
            onClick={() => setPasswordErrorOption("")}
          />
        </div>
        <div className={classes.buttonsDiv}>
          <Button onClick={handleSubmit} loading={loading}>
            Submit
          </Button>
          <Button isEmpty onClick={() => setLogStatus("register")}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
