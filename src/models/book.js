import mongoose, { Schema } from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  publicationYear: Number,
  genre: String,
  isbn: {
    type: String,
    unique: true
  },
  publisher: String,
  pages: Number,
  author: { type: Schema.Types.ObjectId, ref: 'Author' }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
    }
  },
  versionKey: false
})

export const Book = mongoose.model('Book', bookSchema)

export class BookModel {
  static async getAll () {
    const books = await Book.find({})
      .populate('author', '_id name')

    return books
  }

  static async getById ({ bookId }) {
    const book = await Book.findById(bookId).exec()
    return book
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
  }

  static async delete ({ bookId }) {
    const bookDeleted = Book.deleteOne({ _id: bookId })
    return bookDeleted
  }

  static async update ({ bookId, input }) {
    const updatedBook = Book.findByIdAndUpdate({ _id: bookId }, { $set: input }, { new: true }).exec()
    return updatedBook
  }
}
