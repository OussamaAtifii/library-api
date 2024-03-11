import mongoose, { Schema } from 'mongoose'
import { Book } from './book.js'

const authorSchema = new mongoose.Schema({
  name: String,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
})

const Author = mongoose.model('Author', authorSchema)

export class AuthorModel {
  static async getAll () {
    const authors = await Author.find({}).populate('books')
    return authors
  }

  static async getById ({ authorId }) {
    // TODO
  }

  static async create ({ input }) {
    const { name } = input

    if (!name) {
      // TODO
    }

    const createdAuthor = await Author.create({ name })
    const book = await Book.findById('65ef5674fecbd7a446963325')

    createdAuthor.books = book
    await createdAuthor.save()

    return createdAuthor
  }

  static async delete ({ authorId }) {
    const deletedAuthor = await Author.deleteOne({ _id: authorId })
    return deletedAuthor
  }
}
