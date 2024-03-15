import zod from 'zod'

const bookSchema = zod.object({
  title: zod.string({
    invalid_type_error: 'Book title must be a string',
    required_error: 'Book title is required'
  }),
  author: zod.string(),
  publicationYear: zod.number().int().max(new Date().getFullYear()),
  genre: zod.string(),
  isbn: zod.string(),
  publisher: zod.string(),
  pages: zod.number().int()
})

export function validateBook (book) {
  return bookSchema.safeParse(book)
}

export function validatePartialBook (book) {
  return bookSchema.partial().safeParse(book)
}
