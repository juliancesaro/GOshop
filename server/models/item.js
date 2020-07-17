const mongoose = require("mongoose")

mongoose.set("useFindAndModify", false)

const url = process.env.MONGODB_URI

console.log("connecting to", url)

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    maxlength: 20,
    required: true,
  },
  price: {
    type: Number,
    min: 0.01,
    max: 99999,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

itemSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Item", itemSchema)
