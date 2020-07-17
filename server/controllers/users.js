const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const usersRouter = require("express").Router()
const User = require("../models/user")
const Item = require("../models/item")
const _ = require("lodash")

usersRouter.post("/", async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.put("/:id", async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const user = {
    balance: body.balance,
  }

  const items = body.items

  //Add each cart item's price to its seller's balance and delete the item
  //Must not be .foreach() since it does not handle async
  for (let i = 0; i < items.length; i++) {
    const item = await Item.findById(items[i].id)
    const seller = await User.findById(item.user)

    const sellerItems = seller.items.filter(
      (selleritem) => selleritem.toString() !== item.id
    )

    const updatedSeller = {
      balance: _.round(seller.balance + item.price, 2),
      items: sellerItems,
    }

    await Item.findByIdAndRemove(items[i].id)
    await User.findByIdAndUpdate(seller.id, updatedSeller, { new: true })
  }

  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, {
    new: true,
  }).populate("items", { title: 1, date: 1 })

  if (decodedToken.id === request.params.id.toString()) {
    try {
      response.json(updatedUser.toJSON())
    } catch (error) {
      next(error)
    }
  }
})

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("items", { title: 1, date: 1 })
  response.json(users.map((u) => u.toJSON()))
})

usersRouter.delete("/:id", async (request, response) => {
  const user = await User.findById(request.params.id)

  //delete users items
  for (let i = 0; i < user.items.length; i++) {
    await Item.findByIdAndRemove(user.items[i])
  }

  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter
