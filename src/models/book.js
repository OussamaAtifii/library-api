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
      // TODO
    }
  }

  static async getById ({ bookId }) {
    try {
      const book = await Book.findById(bookId).exec()
      return book
    } catch (error) {
      // TODO
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
