import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import "./RegisterForm.css";
import userService from "../../services/users";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Message from "../message/Message";

const SuccessTextField = withStyles({
  root: {
    "& label": {
      color: "green",
    },
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "green",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      "&:hover fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

const SuccessFormControl = withStyles({
  root: {
    "& label": {
      color: "green",
    },
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "green",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      "&:hover fieldset": {
        borderColor: "green",
      },
    },
  },
})(FormControl);

const RegisterForm = ({ toggleRegisterForm, toggleRegisterLogin }) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userInputError, setUserInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(null);
  const [messageText, setMessageText] = useState("");

  //password validation
  const [passwordLen15, setPasswordLen15] = useState(null);
  const [passwordLowercase, setPasswordLowercase] = useState(null);
  const [passwordNumber, setPasswordNumber] = useState(null);
  const [passwordLen8, setPasswordLen8] = useState(null);
  const [passwordCorrect, setPasswordCorrect] = useState(null);

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      if (registerPassword === confirmPassword && passwordCorrect) {
        await userService.create({
          username: registerUsername,
          password: registerPassword,
        });
        setRegisterSuccess(true);
        setMessageText("Account created!");
        setTimeout(() => {
          toggleRegisterLogin();
        }, 1000);
      } else if (!passwordCorrect) {
        throw new Error("Bad password!");
      } else {
        throw new Error("Passwords don't match!");
      }
    } catch (error) {
      setRegisterSuccess(false);
      if (error.message === "Passwords don't match!") {
        setMessageText(error.message);
      } else if (error.message === "Bad password!") {
        setMessageText(error.message);
      } else if (
        error.response.data.error.includes("is longer than the maximum")
      ) {
        setMessageText("Username too long!");
      } else if (error.response.data.error.includes("to be unique")) {
        setMessageText("Username taken!");
      }
    }
  };

  const handleClickShowRegisterPassword = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegisterUsernameChange = (event) => {
    const input = String(event.target.value);
    setRegisterUsername(input);
    if (input.length > 10) {
      setUserInputError("Must be less than 10 characters!");
    } else {
      setUserInputError("");
    }
  };

  const handleRegisterPasswordChange = (event) => {
    const input = String(event.target.value);
    setRegisterPassword(input);
    if (input === confirmPassword) {
      setPasswordInputError(false);
    } else {
      setPasswordInputError(true);
    }
    if (input.length >= 15) {
      setPasswordCorrect(true);
      setPasswordLen15(true);
      setPasswordLen8(null);
      setPasswordNumber(null);
      setPasswordLowercase(null);
    } else if (input.match(/^(?=.*\d)(?=.*[a-z]).{8,}$/)) {
      setPasswordCorrect(true);
      setPasswordLen15(null);
      setPasswordLen8(true);
      setPasswordNumber(true);
      setPasswordLowercase(true);
    } else if (input.length < 15) {
      setPasswordLen15(false);
      if (input.length >= 8) {
        setPasswordLen8(true);
      } else if (input.length < 8) {
        setPasswordLen8(false);
      }
      if (input.match(/\d/)) {
        setPasswordNumber(true);
      } else if (!input.match(/\d/)) {
        setPasswordNumber(false);
      }
      if (input.match(/[a-z]/)) {
        setPasswordLowercase(true);
      } else if (!input.match(/[a-z]/)) {
        setPasswordLowercase(false);
      }
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const input = String(event.target.value);
    setConfirmPassword(input);
    if (registerPassword === input) {
      setPasswordInputError(false);
    } else {
      setPasswordInputError(true);
    }
  };

  const clickCancel = () => {
    toggleRegisterForm();
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {registerSuccess ? (
        <Message type={"success"} message={messageText} />
      ) : registerSuccess === false ? (
        <Message type={"error"} message={messageText} />
      ) : null}
      <form onSubmit={registerUser}>
        {registerSuccess ? (
          <div>
            <SuccessTextField
              required
              id="username-register"
              label="Username"
              value={registerUsername}
              onChange={handleRegisterUsernameChange}
              variant="outlined"
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
            <SuccessFormControl
              required
              variant="outlined"
              style={{ width: 278 }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password-register"
                type={showRegisterPassword ? "text" : "password"}
                value={registerPassword}
                onChange={handleRegisterPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRegisterPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showRegisterPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={90}
                style={{
                  marginBottom: 20,
                }}
              />
            </SuccessFormControl>
            <SuccessFormControl variant="outlined" style={{ width: 278 }}>
              <InputLabel
                required
                htmlFor="outlined-adornment-confirm-password"
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password-confirm"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={150}
                style={{
                  marginBottom: 20,
                }}
              />
            </SuccessFormControl>
          </div>
        ) : (
          <div>
            <TextField
              required
              error={userInputError !== ""}
              helperText={userInputError}
              id="username-register"
              label="Username"
              value={registerUsername}
              onChange={handleRegisterUsernameChange}
              variant="outlined"
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
            <FormControl required variant="outlined" style={{ width: 278 }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password-register"
                type={showRegisterPassword ? "text" : "password"}
                value={registerPassword}
                onChange={handleRegisterPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRegisterPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showRegisterPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={90}
              />
            </FormControl>
            <span className="validation">
              <p>Should be</p>
              {passwordLen15 ? (
                <p className="true">at least 15 characters</p>
              ) : passwordLen15 === false ? (
                <p className="false">at least 15 characters</p>
              ) : (
                <p>at least 15 characters</p>
              )}
              <p>OR</p>
              {passwordLen8 ? (
                <p className="true">at least 8 characters</p>
              ) : passwordLen8 === false ? (
                <p className="false">at least 8 characters</p>
              ) : (
                <p>at least 8 characters</p>
              )}
              {passwordNumber ? (
                <p className="true">including a number</p>
              ) : passwordNumber === false ? (
                <p className="false">including a number</p>
              ) : (
                <p>including a number</p>
              )}
              {passwordLowercase ? (
                <p className="true" id="lowercase">
                  and a lowercase letter
                </p>
              ) : passwordLowercase === false ? (
                <p className="false" id="lowercase">
                  and a lowercase letter
                </p>
              ) : (
                <p id="lowercase">and a lowercase letter</p>
              )}
              <p>.</p>
            </span>
            <FormControl
              error={passwordInputError}
              variant="outlined"
              style={{
                marginTop: 10,
                marginBottom: 20,
                width: 278,
              }}
            >
              <InputLabel
                required
                htmlFor="outlined-adornment-confirm-password"
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password-confirm"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={150}
              />
            </FormControl>
          </div>
        )}

        <div className="actions">
          <Button
            variant="contained"
            type="submit"
            style={{
              marginBottom: 15,
            }}
          >
            Register
          </Button>
          <Button variant="contained" type="button" onClick={clickCancel}>
            Cancel
          </Button>
          <div className="registerText">
            <p>Have an account?</p>
            <p className="registerLink" onClick={toggleRegisterLogin}>
              Sign in
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
