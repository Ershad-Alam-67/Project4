import React from "react"
import "./Input.css"

const Input = (props) => {
  return (
    <div>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      ></input>
    </div>
  )
}

export default Input
