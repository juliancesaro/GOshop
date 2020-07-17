import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import logo from "../../images/logo.png"
import logoSmall from "../../images/logo-small.png"
import AccountBoxIcon from "@material-ui/icons/AccountBox"
import Button from "@material-ui/core/Button"
import SmallAccountMenu from "../smallAccountMenu/SmallAccountMenu"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"

const styles = makeStyles((theme) => ({
  customBadge: {
    backgroundColor: "#03989e",
    color: "white",
  },
}))

const SmallNav = ({ user, cartItems, handleLogout, toggleLoginForm }) => {
  const classes = styles()
  const [accountMenuVisible, setAccountMenuVisible] = useState(false)
  const accountClick = () => {
    setAccountMenuVisible(!accountMenuVisible)
  }
  return (
    <div className="navbar">
      <div className="nav-contents row">
        <div className="nav-left">
          <NavLink exact className="link" activeClassName="activelink" to="/">
            <img className="logo" src={logo} alt="logo" width="190px" />
            <img
              className="logoSmall"
              src={logoSmall}
              alt="logoSmall"
              width="100px"
            />
          </NavLink>
        </div>
        <div className="nav-right">
          {user === null ? (
            <Button
              variant="contained"
              onClick={toggleLoginForm}
              style={{
                margin: 10,
                height: 35,
              }}
            >
              Login
            </Button>
          ) : (
            <>
              <IconButton
                aria-label="Account"
                onClick={accountClick}
                style={{ paddingRight: 0 }}
              >
                <AccountBoxIcon fontSize="large" />
                {accountMenuVisible ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </IconButton>
              <div className="accountMenu">
                <SmallAccountMenu
                  user={user}
                  setAccountMenuVisible={setAccountMenuVisible}
                  accountMenuVisible={accountMenuVisible}
                  handleLogout={handleLogout}
                />
              </div>
            </>
          )}
          <NavLink
            exact
            className="link"
            activeClassName="activelink"
            to="/cart"
          >
            <IconButton aria-label="Cart">
              <Badge
                badgeContent={cartItems}
                classes={{ badge: classes.customBadge }}
              >
                <ShoppingCartIcon fontSize="large" />
              </Badge>
            </IconButton>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default SmallNav
