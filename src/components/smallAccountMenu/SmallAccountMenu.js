import React from "react"
import "./SmallAccountMenu.css"
import { NavLink } from "react-router-dom"

const SmallAccountMenu = ({
  user,
  setAccountMenuVisible,
  accountMenuVisible,
  handleLogout,
}) => {
  const clickLogout = (event) => {
    event.preventDefault()
    setAccountMenuVisible(!accountMenuVisible)
    handleLogout()
  }
  return (
    <div className="smallAccountMenu-wrapper">
      <div className={"accountMenu " + (accountMenuVisible ? "on" : "off")}>
        <div className="accountMenu-header">
          <div className="accountMenu-items">
            <p className="accountMenu-item" id="accountMenu-greeting">
              Hi, {user.username}
            </p>
            <p
              className="accountMenu-item"
              id="accountMenu-logout"
              onClick={clickLogout}
            >
              Logout
            </p>
          </div>
          <hr></hr>
          <div className="accountMenu-items">
            <p className="accountMenu-item">My balance</p>
            <p className="accountMenu-item">${user.balance}</p>
          </div>
          <div className="account-link-wrapper">
            <NavLink exact className="account-link" to="/account">
              My account
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmallAccountMenu
