const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    maxlength: 10,
  },
  balance: {
    type: Number,
    default: 100,
    required: true,
  },
  passwordHash: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
})

userSchema.plugin(uniqueValidator)
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
    // nor should the balance
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
