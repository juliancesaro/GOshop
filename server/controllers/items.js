const itemsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Item = require("../models/item")
const User = require("../models/user")

itemsRouter.get("/", async (request, response) => {
  const items = await Item.find({}).populate("user", { username: 1 })
  response.json(items.map((item) => item.toJSON()))
})

itemsRouter.get("/:id", async (request, response) => {
  const item = await Item.findById(request.params.id)
  if (item) {
    response.json(item.toJSON())
  } else {
    response.status(404).end()
  }
})

itemsRouter.post("/", async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const item = new Item({
    title: body.title,
    price: body.price,
    date: new Date(),
    user: user,
  })

  const savedItem = await item.save()
  user.items = user.items.concat(savedItem._id)
  await user.save()

  response.json(savedItem.toJSON())
})

itemsRouter.delete("/:id", async (request, response) => {
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // const item = await Item.findById(request.params.id)
  // const user = await User.findById(item.user.toString())

  // const userItems = user.items.filter(
  //   (useritem) => useritem.toString() !== request.params.id
  // )

  // const newUser = {
  //   items: userItems,
  // }

  // if (decodedToken.id === item.user.toString()) {
  await Item.findByIdAndRemove(request.params.id)
  // await User.findByIdAndUpdate(item.user, newUser, {
  //   new: true,
  // })
  // }

  response.status(204).end()
})

itemsRouter.put("/:id", async (request, response, next) => {
  const body = request.body

  const item = {
    title: body.title,
    price: body.price,
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(request.params.id, item, {
      new: true,
    })
    response.json(updatedItem.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = itemsRouter
