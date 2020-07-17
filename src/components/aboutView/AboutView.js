import React from "react"
import "./AboutView.css"

const AboutView = () => {
  return (
    <div className="aboutView row">
      <h2>About</h2>
      <div className="aboutView-content">
        <p>
          GOshop is a mock online-store created to test my ReactJS and Node.js
          knowledge.
        </p>
        <p>Currently, users can:</p>
        <ul>
          <li>Create an account</li>
          <li>Log in</li>
          <li>Post items</li>
          <li>Add items to their cart</li>
          <li>Purchase items</li>
          <li>Delete their own items</li>
          <li>Log out</li>
        </ul>
      </div>
    </div>
  )
}

export default AboutView
