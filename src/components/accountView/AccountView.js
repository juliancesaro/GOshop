import React from "react"
import "./AccountView.css"
import userService from "../../services/users"
import itemService from "../../services/items"
import Button from "@material-ui/core/Button"

const AccountView = ({ user, setUser, userItems, setUserItems, setItems }) => {
  const deleteUser = async () => {
    try {
      if (window.confirm(`Delete Account?`)) {
        await userService.deleteUser(user.id)
        for (let i = 0; i < user.items.length; i++) {
          await itemService.deleteItem(user.items[i].id)
        }
        const initialItems = await itemService.getAll()
        setItems(initialItems)
        itemService.clearToken()
        userService.clearToken()
        setUser(null)
        setUserItems([])
        window.localStorage.removeItem("loggedGOshopUser")
        window.localStorage.removeItem("loggedGOshopUserItems")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="accountview row">
      {user ? (
        <div>
          <h2>My Account</h2>
          <div className="accountview-contents">
            <p>Username: {user.username}</p>
            <p>Balance: {user.balance}</p>

            {userItems.length === 0 ? (
              <p>You have no items for sale!</p>
            ) : (
              <div>
                <p>My items for sale:</p>
                <ul>
                  {userItems.map((item) => (
                    <li key={item.id}>{item.title}</li>
                  ))}
                </ul>
              </div>
            )}

            <Button variant="contained" type="button" onClick={deleteUser}>
              Delete account
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AccountView
