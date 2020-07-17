import React, { useState } from "react"
import "./CheckoutForm.css"
import Button from "@material-ui/core/Button"
import Message from "../message/Message"
import userService from "../../services/users"
const _ = require("lodash")

const CheckoutForm = ({
  user,
  setUser,
  items,
  setItems,
  cartItems,
  setCartItems,
  toggleCheckoutForm,
}) => {
  const [purchaseSuccess, setPurchaseSuccess] = useState(null)
  const [messageText, setMessageText] = useState("")
  const lowBalance =
    user.balance - cartItems.reduce((a, b) => a + b.price, 0) < 0

  const purchaseItems = async () => {
    try {
      if (!lowBalance) {
        const newBalance =
          user.balance - cartItems.reduce((a, b) => a + b.price, 0)
        const returnedUser = await userService.update(user.id, {
          balance: _.round(newBalance, 2),
          items: cartItems,
        })
        window.localStorage.setItem(
          "loggedGOshopUser",
          JSON.stringify(returnedUser)
        )
        window.localStorage.setItem(
          "loggedGOshopUserItems",
          JSON.stringify(returnedUser.items)
        )
        window.localStorage.removeItem("loggedGOshopUserCartItems")
        setUser(returnedUser)
        setItems(items.filter((item) => !cartItems.includes(item)))
        setCartItems([])
        setMessageText("Items purchased!")
        setPurchaseSuccess(true)
        setTimeout(() => {
          toggleCheckoutForm()
        }, 1000)
      } else {
        throw new Error("Balance too low!")
      }
    } catch (error) {
      setPurchaseSuccess(false)
      if (error.message === "Balance too low!") {
        setMessageText(error.message)
      }
    }
  }

  return (
    <div>
      <h2>Checkout?</h2>
      {purchaseSuccess ? (
        <Message type={"success"} message={messageText} />
      ) : purchaseSuccess === false ? (
        <Message type={"error"} message={messageText} />
      ) : null}
      <div className="totals">
        <p>
          Cart total:{" "}
          <strong>${cartItems.reduce((a, b) => a + b.price, 0)}</strong>
        </p>
        <p>
          Balance: <strong>${user.balance}</strong>
        </p>
      </div>
      <div className="actions">
        <Button
          variant="contained"
          type="submit"
          style={{
            marginBottom: 15,
          }}
          onClick={purchaseItems}
        >
          Purchase Items
        </Button>
        <Button variant="contained" type="button" onClick={toggleCheckoutForm}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default CheckoutForm
