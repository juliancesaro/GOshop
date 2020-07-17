import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import "./NavBar.css"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import Badge from "@material-ui/core/Badge"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import Tooltip from "@material-ui/core/Tooltip"
import logo from "../../images/logo.png"
import logoSmall from "../../images/logo-small.png"
import AddIcon from "@material-ui/icons/Add"
import AccountBoxIcon from "@material-ui/icons/AccountBox"
import Button from "@material-ui/core/Button"
import AccountMenu from "../accountMenu/AccountMenu"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"

const styles = makeStyles((theme) => ({
  customBadge: {
    backgroundColor: "#03989e",
    color: "white",
  },
}))

const NavBar = ({
  user,
  cartItems,
  filter,
  handleFilterChange,
  handleLogout,
  toggleLoginForm,
  toggleItemForm,
}) => {
  const classes = styles()
  const [accountMenuVisible, setAccountMenuVisible] = useState(false)
  const accountClick = () => {
    setAccountMenuVisible(!accountMenuVisible)
  }
  return (
    <div className="navbar">
      <div className="nav-contents row">
        <div className="nav-left">
          {/* <div className="menu-button">
            <IconButton edge="start" color="primary" aria-label="menu">
              <MenuIcon fontSize="large" style={{ fill: "#03989e" }} />
            </IconButton>
          </div> */}
          <NavLink exact className="link" activeClassName="activelink" to="/">
            <img className="logo" src={logo} alt="logo" width="190px" />
            <img
              className="logoSmall"
              src={logoSmall}
              alt="logoSmall"
              width="100px"
            />
          </NavLink>
          <div className="web-search">
            <TextField
              color="primary"
              label="Search Items"
              style={{ marginLeft: 10, marginBottom: 15, width: "100%" }}
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
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
              <Tooltip title="Add Item">
                <IconButton aria-label="Add" onClick={toggleItemForm}>
                  <AddIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <AccountMenu
                user={user}
                setAccountMenuVisible={setAccountMenuVisible}
                accountMenuVisible={accountMenuVisible}
                handleLogout={handleLogout}
              />
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
      <div className="mobile-search">
        <TextField
          color="primary"
          label="Search items"
          style={{ marginLeft: 10, marginBottom: 10, width: "80%" }}
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  )
}

export default NavBar
