import { createClient } from "@libsql/client"
import dotenv from 'dotenv'

dotenv.config()

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
})

export class BookModel {
  static async getAll () {
    try {
      const { rows } = await db.execute('SELECT * FROM books')
      return rows
    } catch (error) {
      console.log(error);
    }
  }

  static async getById ({ bookId }) {
    try {
      const { rows } = await db.execute({
        sql: `SELECT * FROM books WHERE id = ?`,
        args: [bookId]
      })

      return rows[0]
    } catch (error) {
      // TODO
      console.log(error);
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
      const { lastInsertRowid } = await db.execute({
        sql: `INSERT INTO books(title, author, publicationYear, genre, isbn, publisher, pages)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [title, author, publicationYear, genre, isbn, publisher, pages]
      })

      const { rows } = await db.execute({
        sql: `SELECT * FROM books WHERE id = ?`,
        args: [lastInsertRowid]
      })

      return rows[0]
    } catch (error) {
      // TODO
      console.log(error);
    }
  }

  static async delete ({ bookId }) {
    const { rows } = await db.execute({
      sql: `SELECT * FROM books WHERE id = ?`,
      args: [bookId]
    })

    if (!rows) {
      // TODO
      return false
    }

    await db.execute({
      sql: `DELETE FROM books WHERE id = ?`,
      args: [bookId]
    })

    return rows[0]
  }
}