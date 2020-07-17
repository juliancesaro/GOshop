import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import "./ItemForm.css"
import itemService from "../../services/items"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import InputAdornment from "@material-ui/core/InputAdornment"
import Message from "../message/Message"

const SuccessTextField = withStyles({
  root: {
    "& label": {
      color: "green",
    },
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "green",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      "&:hover fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField)

const ItemForm = ({
  toggleItemForm,
  setItems,
  setUserItems,
  items,
  userItems,
}) => {
  const [newTitle, setNewTitle] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [addItemSuccess, setAddItemSuccess] = useState(null)
  const [titleInputError, setTitleInputError] = useState("")
  const [priceInputError, setPriceInputError] = useState("")
  const [messageText, setMessageText] = useState("")

  const addItem = async (event) => {
    event.preventDefault()
    try {
      if (!titleInputError && !priceInputError) {
        const returnedItem = await itemService.create({
          title: newTitle,
          price: newPrice,
          date: new Date().toISOString(),
        })
        setItems(items.concat(returnedItem))
        window.localStorage.setItem(
          "loggedGOshopUserItems",
          JSON.stringify(userItems.concat(returnedItem))
        )
        setUserItems(userItems.concat(returnedItem))
        setMessageText("Item posted!")
        setAddItemSuccess(true)
        setTimeout(() => {
          toggleItemForm()
        }, 1000)
      } else if (priceInputError && titleInputError) {
        throw new Error("Bad fields!")
      } else if (priceInputError) {
        throw new Error("Bad price!")
      } else {
        throw new Error("Bad title!")
      }
    } catch (error) {
      setAddItemSuccess(false)
      if (error.message === "Bad fields!") {
        setMessageText(error.message)
      } else if (error.message === "Bad price!") {
        setMessageText(error.message)
      } else if (error.message === "Bad title!") {
        setMessageText(error.message)
      } else if (
        error.response.data.error.includes("is longer than the maximum")
      ) {
        setMessageText("Username too long!")
      } else if (error.response.data.error.includes("to be unique")) {
        setMessageText("Username taken!")
      }
    }
  }

  const handleTitleChange = (event) => {
    const input = String(event.target.value)
    setNewTitle(input)
    if (input.length < 4 || input.length > 20) {
      setTitleInputError("Title must be between 4-20 characters!")
    } else {
      setTitleInputError("")
    }
  }

  const handlePriceChange = (event) => {
    const input = String(event.target.value)
    setNewPrice(input)
    if (input.length === 0) {
      setPriceInputError("")
    } else if (input > 99999) {
      setPriceInputError("Number too high!")
    } else if (input < 0.01) {
      setPriceInputError("Number too low!")
    } else if (input.length > 8) {
      setPriceInputError("Too many digits!")
    } else if (input.match(/^[0-9]*([.][0-9]{1,2})?$/)) {
      setPriceInputError("")
    } else if (input.match(/^[0-9]*[.]$/)) {
      setPriceInputError("")
    } else if (!input.match(/^[0-9]*([.][0-9]*)?$/)) {
      setPriceInputError("Only digits!")
    } else if (!input.match(/^[0-9]*([.][0-9]{1,2})?$/)) {
      setPriceInputError("Too many decimals!")
    }
  }

  return (
    <div>
      <h2>Post Item</h2>
      {addItemSuccess ? (
        <Message type={"success"} message={messageText} />
      ) : addItemSuccess === false ? (
        <Message type={"error"} message={messageText} />
      ) : null}
      <form onSubmit={addItem}>
        {addItemSuccess ? (
          <div>
            <SuccessTextField
              required
              id="title"
              label="Title"
              value={newTitle}
              onChange={handleTitleChange}
              variant="outlined"
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
            <SuccessTextField
              required
              id="price"
              label="Price"
              value={newPrice}
              onChange={handlePriceChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
          </div>
        ) : (
          <div>
            <TextField
              required
              error={titleInputError !== ""}
              helperText={titleInputError}
              id="title"
              label="Title"
              value={newTitle}
              onChange={handleTitleChange}
              variant="outlined"
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
            <TextField
              required
              error={priceInputError !== ""}
              helperText={priceInputError}
              id="price"
              label="Price"
              value={newPrice}
              onChange={handlePriceChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
          </div>
        )}
        <div className="actions">
          <Button
            variant="contained"
            type="submit"
            style={{
              marginBottom: 15,
            }}
          >
            Add Item
          </Button>
          <Button variant="contained" type="button" onClick={toggleItemForm}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ItemForm
