import { AuthorModel } from '../models/author.js'

export class AuthorController {
  static async getAll (req, res) {
    const authors = await AuthorModel.getAll()
    res.json(authors)
  }

  static async create (req, res) {
    const createdAuthor = await AuthorModel.create({ input: req.body })
    res.json(createdAuthor)
  }

  static async delete (req, res) {
    const { authorId } = req.params
    console.log(authorId)
    if (!authorId) {
      // TODO
    }

    const deletedAuthor = await AuthorModel.delete({ authorId })
    res.json(deletedAuthor)
  }
}
