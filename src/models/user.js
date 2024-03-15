import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  password: String
})

export const User = mongoose.model('User', userSchema)

export class UserModel {
  static async getAll () {
    const users = await User.find({})
    return users
  }

  static async create ({ input }) {
    const { name, username, password } = input

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      password: passwordHash
    })

    const savedUser = await user.save()

    return savedUser
  }
}
