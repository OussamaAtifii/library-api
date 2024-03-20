import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models/user.js'

export class LoginController {
  static async login (req, res) {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ message: 'invalid user or password' })
    }

    const userForToken = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.send({
      name: user.name,
      username: user.username,
      token
    })
  }

  static async validate (req, res) {
    const authorization = req.get('authorization')

    let token = null
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    let decodedToken = null

    try {
      decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
      return res.status(401).json({ message: 'invalid token' })
    }

    if (!token || !decodedToken.id) {
      return res.status(401).json({ message: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id).exec()

    return res.json({ message: `Hello ${user.name}` })
  }
}
