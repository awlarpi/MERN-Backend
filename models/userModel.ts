import { model, Schema } from "mongoose"

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = model("User", schema)

export default User
