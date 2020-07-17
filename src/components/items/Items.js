import React from "react"
import "./Items.css"
import Item from "../item/Item"

const Items = ({ items, userItems, handleIncrement, deleteItem }) => {
  return (
    <div className="content">
      <h1>Items</h1>
      <div className="items-list row">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Item
                item={item}
                userItems={userItems}
                user={item.user.username}
                title={item.title}
                price={item.price}
                handleIncrement={() => handleIncrement(item)}
                deleteItem={() => deleteItem(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Items
