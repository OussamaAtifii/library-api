import { UserModel } from '../models/user.js'

export class UserController {
  static async getAll (req, res) {
    try {
      const users = await UserModel.getAll()
      return res.json(users)
    } catch (error) {
      res.status(500).json({ message: 'Error getting the users. Please try again later' })
    }
  }

  static async create (req, res) {
    console.log(req.body)
    try {
      const createdUser = await UserModel.create({ input: req.body })
      res.json(createdUser)
    } catch (error) {
      // TODO
      console.log(error)
    }
  }
}
