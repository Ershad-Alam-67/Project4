import React, { useContext } from "react"

import classes from "./Navigation.module.css"
import { AuthStore } from "../context/global-states"

const Navigation = (props) => {
  const ctx = useContext(AuthStore)
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
