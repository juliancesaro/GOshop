import React from "react"
import "./Item.css"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 10,
    boxShadow: "0px 5px 10px lightgrey",
  },
}))

const Item = ({
  item,
  userItems,
  user,
  title,
  price,
  handleIncrement,
  deleteItem,
}) => {
  const classes = useStyles()
  return (
    <div className="item">
      <Card className={classes.root}>
        <CardContent style={{ padding: 0, marginBottom: 0 }}>
          <p className="user">{user}</p>
        </CardContent>
        <CardContent style={{ height: 50 }}>
          <p className="title">{title}</p>
          <p className="price">{`$${price}`}</p>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-around",
            height: 45,
          }}
        >
          {userItems.some((userItem) => userItem.id === item.id) ? (
            <IconButton
              aria-label="Remove"
              onClick={() => {
                deleteItem()
              }}
            >
              <DeleteIcon style={{ fill: "#03989e" }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Cart"
              onClick={() => {
                handleIncrement()
              }}
            >
              <AddShoppingCartIcon style={{ fill: "#03989e" }} />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </div>
  )
}

export default Item
