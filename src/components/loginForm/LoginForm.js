import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import "./LoginForm.css"
import loginService from "../../services/login"
import itemService from "../../services/items"
import userService from "../../services/users"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Message from "../message/Message"

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
})(TextField)

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
})(FormControl)

const LoginForm = ({
  toggleLoginForm,
  toggleRegisterLogin,
  setUser,
  setUserItems,
}) => {
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(null)
  const [messageText, setMessageText] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: loginUsername,
        password: loginPassword,
      })
      window.localStorage.setItem("loggedGOshopUser", JSON.stringify(user))
      window.localStorage.setItem(
        "loggedGOshopUserItems",
        JSON.stringify(user.items)
      )
      itemService.setToken(user.token)
      userService.setToken(user.token)
      setUser(user)
      setUserItems(user.items)
      setLoginSuccess(true)
      setMessageText("Login Successful!")
      setTimeout(() => {
        toggleLoginForm()
      }, 1000)
    } catch (exception) {
      setLoginSuccess(false)
    }
  }

  const handleLoginUsernameChange = (event) => {
    setLoginUsername(event.target.value)
  }

  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h2>Login</h2>
      {loginSuccess ? (
        <Message type={"success"} message={messageText} />
      ) : loginSuccess === false ? (
        <Message type={"error"} message={"Wrong username or password!"} />
      ) : null}
      <form onSubmit={handleLogin}>
        {loginSuccess ? (
          <div>
            <SuccessTextField
              className="field"
              required
              id="username"
              label="Username"
              value={loginUsername}
              onChange={handleLoginUsernameChange}
              variant="outlined"
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
            <SuccessFormControl variant="outlined" style={{ width: 278 }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                className="field"
                required
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={handleLoginPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={90}
                style={{
                  marginBottom: 20,
                }}
              />
            </SuccessFormControl>
          </div>
        ) : (
          <div>
            <TextField
              className="field"
              required
              id="username"
              label="Username"
              value={loginUsername}
              onChange={handleLoginUsernameChange}
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
                className="field"
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={handleLoginPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={90}
                style={{
                  marginBottom: 20,
                }}
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
            Login
          </Button>
          <Button variant="contained" type="button" onClick={toggleLoginForm}>
            Cancel
          </Button>
          <div className="registerText">
            <p>No account?</p>
            <p className="registerLink" onClick={toggleRegisterLogin}>
              Register
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
