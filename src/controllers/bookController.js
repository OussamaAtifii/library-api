import { BookModel } from "../models/book.js"

export class BookController {
  static async getAll (req, res) {
    const books = await BookModel.getAll()
    res.json(books)
  }

  static async getById (req, res) {
    const { bookId } = req.params

    const book = await BookModel.getById({ bookId })
    res.json(book)
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
}