import { AuthorModel } from '../models/author.js'

export class AuthorController {
  static async getAll (req, res) {
    try {
      const authors = await AuthorModel.getAll()
      res.json(authors)
    } catch (error) {
      res.status(500).json({ message: 'Error getting the authors. Please try again later' })
    }
  }

  static async getById (req, res) {
    const { authorId } = req.params

    if (!authorId) {
      return res.status(400).json({ message: 'Please add an ID' })
    }

    try {
      const author = await AuthorModel.getById({ authorId })

      if (!author) {
        return res.status(404).json({ message: `No author found with id: ${authorId}` })
      }

      res.json(author)
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Error getting the author. Please make sure the ID is valid' })
      }

      return res.status(500).json({ message: 'Error getting the author. Please try again later' })
    }
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
