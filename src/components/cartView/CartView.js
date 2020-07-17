import React from "react"
import "./CartView.css"
import CartItem from "../cartItem/CartItem"

const CartView = ({ cartItems, removeCartItem, toggleCheckoutForm }) => {
  return (
    <div className="cartView">
      <div className="titles-top">
        <h2>Your basket</h2>
      </div>
      <div className="cartItem-list">
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={`cartItem-${item.id}`}>
                <CartItem
                  user={item.user.username}
                  title={item.title}
                  price={item.price}
                  removeCartItem={() => removeCartItem(item)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Nothing in your basket!</p>
        )}
      </div>
      <div className="titles-bottom">
        <div id="cartTotal">
          Total
          <p id="total-price">${cartItems.reduce((a, b) => a + b.price, 0)}</p>
        </div>
        <div id="checkout-wrapper" onClick={toggleCheckoutForm}>
          <p id="checkout-text">Checkout</p>
        </div>
      </div>
    </div>
  )
}

export default CartView
