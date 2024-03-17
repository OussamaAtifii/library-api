import mongoose, { Schema } from 'mongoose'

const genreSchema = new mongoose.Schema({
  name: String,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
})

export const Genre = mongoose.model('Genre', genreSchema)
