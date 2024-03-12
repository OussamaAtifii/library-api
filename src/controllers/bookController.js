import { BookModel } from '../models/book.js'

export class BookController {
  static async getAll (req, res) {
    try {
      const books = await BookModel.getAll()
      res.json(books)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getById (req, res) {
    const { bookId } = req.params

    if (!bookId) {
      res.status(400).json({ message: 'Please add an ID' })
    }

    try {
      const book = await BookModel.getById({ bookId })
      console.log(book)
      res.json(book)
    } catch (error) {
      // TODO 404 where the id is valid but there is not a book with the id
      return res.status(400).json({ message: error.message })
    }
  }

  static async create (req, res) {
    const book = await BookModel.create({ input: req.body })

    res.json(book)
  }

  static async delete (req, res) {
    const { bookId } = req.params

    if (!bookId) {
      // TODO
      res.sendStatus(400)
    }

    const bookDeleted = await BookModel.delete({ bookId })
    res.json(bookDeleted)
  }

  static async update (req, res) {
    const { bookId } = req.params

    // console.log(req.body);

    const updated = await BookModel.update({ bookId, input: req.body })

    if (!updated) return res.status(400).json({ message: 'Not updated' })
    return res.json({ message: 'Updated succesfully' })
  }
}
