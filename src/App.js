import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import NavBar from "./components/navbar/NavBar"
import SmallNav from "./components/smallNav/SmallNav"
import Items from "./components/items/Items"
import Footer from "./components/footer/Footer"
import itemService from "./services/items"
import userService from "./services/users"
import Form from "./components/form/Form"
import LoginForm from "./components/loginForm/LoginForm"
import RegisterForm from "./components/registerForm/RegisterForm"
import ItemForm from "./components/itemForm/ItemForm"
import CheckoutForm from "./components/checkoutForm/CheckoutForm"
import CartView from "./components/cartView/CartView"
import AboutView from "./components/aboutView/AboutView"
import AccountView from "./components/accountView/AccountView"

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [newFilter, setNewFilter] = useState("")
  const [userItems, setUserItems] = useState([])
  const [user, setUser] = useState(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [showItemForm, setShowItemForm] = useState(false)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)

  useEffect(() => {
    itemService.getAll().then((initialItems) => {
      setItems(initialItems)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedGOshopUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      itemService.setToken(user.token)
      userService.setToken(user.token)
    }
    const loggedUserItemsJSON = window.localStorage.getItem(
      "loggedGOshopUserItems"
    )
    if (loggedUserItemsJSON) {
      const userItems = JSON.parse(loggedUserItemsJSON)
      setUserItems(userItems)
    }
    const loggedUserCartItemsJSON = window.localStorage.getItem(
      "loggedGOshopUserCartItems"
    )
    if (loggedUserCartItemsJSON) {
      const cartItems = JSON.parse(loggedUserCartItemsJSON)
      setCartItems(cartItems)
    }
  }, [])

  const deleteItem = async (id) => {
    const item = items.find((item) => item.id === id).title
    if (window.confirm(`Delete '${item}'?`)) {
      await itemService.deleteItem(id)
      const initialItems = await itemService.getAll()
      setItems(initialItems)
      setUserItems(userItems.filter((userItem) => userItem.id !== id))
    }
  }

  const handleLogout = async () => {
    try {
      itemService.clearToken()
      userService.clearToken()
    } catch (exception) {
      console.log(exception)
    }
    window.localStorage.removeItem("loggedGOshopUser")
    window.localStorage.removeItem("loggedGOshopUserItems")
    setUser(null)
    setUserItems([])
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const itemsToShow =
    newFilter.length === "0"
      ? items
      : items.filter((item) =>
          item.title.toLowerCase().includes(newFilter.toLowerCase())
        )

  const incrementCartItems = (item) => {
    if (cartItems.some((cartItem) => cartItem.id === item.id)) {
      window.confirm(`This item is already in your cart!`)
    } else {
      setCartItems(cartItems.concat(item))
      window.localStorage.setItem(
        "loggedGOshopUserCartItems",
        JSON.stringify(cartItems.concat(item))
      )
    }
  }

  const removeCartItem = (item) => {
    const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id)
    setCartItems(newCartItems)
    window.localStorage.setItem(
      "loggedGOshopUserCartItems",
      JSON.stringify(newCartItems)
    )
  }

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm)
  }

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm)
  }

  const toggleRegisterLogin = () => {
    toggleLoginForm()
    toggleRegisterForm()
  }

  const toggleItemForm = () => {
    setShowItemForm(!showItemForm)
  }

  const toggleCheckoutForm = () => {
    setShowCheckoutForm(!showCheckoutForm)
  }

  return (
    <div className="app">
      {showLoginForm ? (
        <Form>
          <LoginForm
            toggleLoginForm={toggleLoginForm}
            toggleRegisterLogin={toggleRegisterLogin}
            setUser={setUser}
            setUserItems={setUserItems}
          />
        </Form>
      ) : null}
      {showRegisterForm ? (
        <Form>
          <RegisterForm
            toggleRegisterForm={toggleRegisterForm}
            toggleRegisterLogin={toggleRegisterLogin}
          />
        </Form>
      ) : null}
      {showItemForm ? (
        <Form>
          <ItemForm
            toggleItemForm={toggleItemForm}
            user={user}
            setItems={setItems}
            setUserItems={setUserItems}
            items={items}
            userItems={userItems}
          />
        </Form>
      ) : null}
      {showCheckoutForm ? (
        <Form>
          <CheckoutForm
            user={user}
            setUser={setUser}
            items={items}
            setItems={setItems}
            cartItems={cartItems}
            setCartItems={setCartItems}
            toggleCheckoutForm={toggleCheckoutForm}
          />
        </Form>
      ) : null}
      <Router>
        <Switch>
          <Route path="/cart">
            <SmallNav
              user={user}
              cartItems={cartItems.length}
              handleLogout={handleLogout}
              toggleLoginForm={toggleLoginForm}
            />
          </Route>
          <Route path="/about">
            <SmallNav
              user={user}
              cartItems={cartItems.length}
              handleLogout={handleLogout}
              toggleLoginForm={toggleLoginForm}
            />
          </Route>
          <Route path="/account">
            <SmallNav
              user={user}
              cartItems={cartItems.length}
              handleLogout={handleLogout}
              toggleLoginForm={toggleLoginForm}
            />
          </Route>
          <Route path="/social">
            <SmallNav
              user={user}
              cartItems={cartItems.length}
              handleLogout={handleLogout}
              toggleLoginForm={toggleLoginForm}
            />
          </Route>
          <Route path="/">
            <NavBar
              user={user}
              cartItems={cartItems.length}
              filter={newFilter}
              handleFilterChange={handleFilterChange}
              handleLogout={handleLogout}
              toggleLoginForm={toggleLoginForm}
              toggleItemForm={toggleItemForm}
            />
          </Route>
        </Switch>
        <div className="app-body">
          <Switch>
            <Route path="/cart">
              <CartView
                cartItems={cartItems}
                removeCartItem={removeCartItem}
                toggleCheckoutForm={toggleCheckoutForm}
              />
            </Route>
            <Route path="/about">
              <AboutView />
            </Route>
            <Route path="/account">
              <AccountView
                user={user}
                setUser={setUser}
                userItems={userItems}
                setUserItems={setUserItems}
                setItems={setItems}
              />
            </Route>
            <Route path="/">
              <Items
                items={itemsToShow}
                userItems={userItems}
                handleIncrement={incrementCartItems}
                deleteItem={deleteItem}
              />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
