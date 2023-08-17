import React, { useState } from "react"

export const AuthStore = React.createContext({
  isLoggedIn: true,
  isLoggedInHandler: null,
})

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsloggedIn] = useState(true)
  const logoutHandler = () => {
    setIsloggedIn(false)
  }
  const obj = {
    isLoggedIn: isLoggedIn,
    logoutHandler: logoutHandler,
  }
  return <AuthStore.Provider value={obj}>{props.children}</AuthStore.Provider>
}
