import React, { useState, useEffect, useReducer } from "react"

import Card from "../UI/Card/Card"
import classes from "./Login.module.css"
import Button from "../UI/Button/Button"
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { val: action.val, isValid: action.val.includes("@") }
  } else if (action.type === "ON_BLUR") {
    return { val: state.val, isValid: state.val.includes("@") }
  }
  return state
}
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { val: action.val, isValid: action.val.length > 6 }
  } else if (action.type === "ON_BLUR") {
    return { val: state.val, isValid: state.val.length > 6 }
  }
}

const Login = (props) => {
  const [emailstate, dispatch] = useReducer(emailReducer, {
    val: "",
    isValid: "false",
  })
  const [passwordState, password_dispatch] = useReducer(passwordReducer, {
    val: "",
    isValid: "false",
  })

  // const [enteredEmail, setEnteredEmail] = useState("")
  // const [emailIsValid, setEmailIsValid] = useState()
  // const [enteredPassword, setEnteredPassword] = useState("")
  // const [passwordIsValid, setPasswordIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false)

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!")
      setFormIsValid(
        emailstate.val.includes("@") && passwordState.val.trim().length > 6
      )
    }, 500)

    return () => {
      clearTimeout(identifier)
    }
  }, [emailstate, passwordState])

  const emailChangeHandler = (event) => {
    dispatch({ type: "USER_INPUT", val: event.target.value })

    setFormIsValid(
      event.target.value.includes("@") && passwordState.val.trim().length > 6
    )
  }

  const passwordChangeHandler = (event) => {
    password_dispatch({ type: "USER_INPUT", val: event.target.value })

    //setEnteredPassword(event.target.value)

    setFormIsValid(
      emailstate.val.includes("@") && event.target.value.trim().length > 6
    )
  }

  const validateEmailHandler = () => {
    dispatch({ type: "ON_BLUR", isValid: emailstate.val.includes("@") })
    // setEmailIsValid(enteredEmail.includes("@"))
  }

  const validatePasswordHandler = () => {
    password_dispatch({
      type: "ON_BLUR",
      isValid: passwordState.val.length > 6,
    })
    //setPasswordIsValid(enteredPassword.trim().length > 6)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onLogin(emailstate.val, passwordState.val)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.val}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
