import { Router } from 'express'
import { BookController } from '../controllers/bookController.js'

export const booksRoute = Router()

booksRoute
  .get('/', BookController.getAll)
  .get('/:bookId', BookController.getById)
  .post('/', BookController.create)
  .delete('/:bookId', BookController.delete)
  .put('/:bookId', BookController.update)
