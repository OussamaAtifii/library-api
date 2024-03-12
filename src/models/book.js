import mongoose, { Schema } from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: String,
  publicationYear: Number,
  genre: String,
  isbn: String,
  publisher: String,
  pages: Number,
  author: { type: Schema.Types.ObjectId, ref: 'Author' }
})

export const Book = mongoose.model('Book', bookSchema)

export class BookModel {
  static async getAll () {
    try {
      const books = await Book.find({}).populate('author', '_id name')
      return books
    } catch (error) {
      throw new Error('There was an issue retrieving the books. Please try again later')
    }
  }

  static async getById ({ bookId }) {
    try {
      const book = await Book.findById(bookId).exec()

      if (!book) {
        throw new Error(`No book found with id: ${bookId}`)
      }

      return book
    } catch (error) {
      if (error.name === 'CastError') {
        throw new Error('Error getting the book. Please make sure the ID is valid')
      }

      throw error
    }
  }

  static async create ({ input }) {
    const {
      title,
      author,
      publicationYear,
      genre,
      isbn,
      publisher,
      pages
    } = input

    try {
      const createdBook = await Book.create({
        title,
        author,
        publicationYear,
        genre,
        isbn,
        publisher,
        pages
      })

      return createdBook
    } catch (error) {
      // TODO
      console.log(error)
    }
  }

  static async delete ({ bookId }) {
    const bookDeleted = Book.deleteOne({ _id: bookId })
    return bookDeleted
  }

  static async update ({ bookId, input }) {
    console.log(input)
    console.log(bookId)

    const {
      title,
      author,
      publicationYear,
      genre,
      isbn,
      publisher,
      pages
    } = input

    if (!title || !author || !publicationYear || !genre || !isbn || !publisher || !pages) {
      return false
    }

    try {
      const updatedBook = Book.findByIdAndUpdate({ _id: bookId }, { $set: input }, { new: true }).exec()
      return updatedBook
    } catch (error) {

    }
  }
}
