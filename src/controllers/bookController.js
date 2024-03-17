import { BookModel } from '../models/book.js'
import { validateBook, validatePartialBook } from '../schemas/book.js'

export class BookController {
  static async getAll (req, res) {
    try {
      const books = await BookModel.getAll()
      res.json(books)
    } catch (error) {
      res.status(500).json({ message: 'Error getting the books. Please try again later' })
    }
  }

  static async getById (req, res) {
    const { bookId } = req.params

    if (!bookId) {
      return res.status(400).json({ message: 'Please add an ID' })
    }

    try {
      const book = await BookModel.getById({ bookId })

      if (!book) {
        return res.status(404).json({ message: `No book found with id: ${bookId}` })
      }

      res.json(book)
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Error getting the book. Please make sure the ID is valid' })
      }

      return res.status(500).json({ message: 'Error getting the book. Please try again later' })
    }
  }

  static async create (req, res) {
    const isValid = validateBook(req.body)

    if (isValid.error) {
      return res.status(400).json({ message: JSON.parse(isValid.error.message) })
    }

    try {
      const book = await BookModel.create({ input: req.body })
      return res.status(201).json(book)
    } catch (error) {
      return res.status(500).json({ message: 'Error creating the book. Please try again later' })
    }
  }

  static async delete (req, res) {
    const { bookId } = req.params

    if (!bookId) {
      return res.status(400).json({ message: 'Please add an ID' })
    }

    try {
      const bookDeleted = await BookModel.delete({ bookId })

      if (bookDeleted.deletedCount === 0) {
        return res.status(404).json({ message: `No book found with id: ${bookId}` })
      }

      return res.json({ message: 'Book deleted successfully' })
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Error deleting the book. Please make sure the ID is valid' })
      }

      return res.status(500).json({ message: 'Error deleting the book. Please try again later' })
    }
  }

  static async update (req, res) {
    const { bookId } = req.params

    if (!bookId || bookId.trim() === '') {
      return res.status(400).json({ message: 'Please add an ID' })
    }

    const isValid = validatePartialBook(req.body)

    if (isValid.error) {
      return res.status(400).json({ message: JSON.parse(isValid.error.message) })
    }

    try {
      const updated = await BookModel.update({ bookId, input: req.body })

      if (!updated) {
        return res.status(404).json({ message: `No book found with id: ${bookId}` })
      }

      return res.json(updated)
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Error updating the book. Please make sure the ID is valid' })
      }

      return res.status(500).json({ message: 'Error updating the book, Please try again later' })
    }
  }
}
