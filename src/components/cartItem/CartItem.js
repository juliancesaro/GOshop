import React from "react"
import "./CartItem.css"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 10,
    boxShadow: "0px 10px 15px lightgrey",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  priceWrapper: {
    display: "inline-block",
    float: "left",
    textAlign: "left",
    color: "white",
    background: "linear-gradient(90deg, #03989e, #02c7cf)",
    borderRadius: 20,
  },
  price: {
    margin: 0,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
  },
  actions: {
    display: "inline-block",
    float: "right",
    textAlign: "left",
  },
  title: {
    textAlign: "left",
  },
}))

const CartItem = ({ user, title, price, removeCartItem }) => {
  const classes = useStyles()
  return (
    <div className="cartItem">
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography className={classes.title} component="h6" variant="h6">
              Seller: {user}
            </Typography>
            <Typography
              className={classes.title}
              variant="subtitle1"
              color="textSecondary"
            >
              {title}
            </Typography>
            <div className={classes.priceWrapper}>
              <p className={classes.price}>${price}</p>
            </div>
          </CardContent>
        </div>
        <CardActions className={classes.actions}>
          <IconButton aria-label="Remove" onClick={removeCartItem}>
            <DeleteForeverIcon
              style={{ fontSize: "18px", margin: 0, marginTop: 3 }}
            />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export default CartItem
