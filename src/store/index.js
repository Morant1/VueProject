import Vue from 'vue'
import Vuex from 'vuex'

import {bookService} from '@/services/book.service.js';
import reviewModule from '@/store/modules/review.module.js'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    books: null,
    booksFilterBy: null
  },
  getters: {
    booksToShow(state) {
      const books = state.books
      if (!state.booksFilterBy) return books;

      const { fromPrice, toPrice, title } = state.booksFilterBy;
      const booksByTitle = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));

      if (!fromPrice && !toPrice) return booksByTitle
      return booksByTitle.filter(book => book.listPrice.amount >= fromPrice && book.listPrice.amount <= toPrice)
    }
  },
  mutations: {
    setBooks(state, { books }) {
      state.books = books
    },
    removeBook(state, { id }) {
      const idx = state.books.findIndex(book => book.id === id)
      state.books.splice(idx, 1)
    },
    saveBook(state, { book }) {
      state.books.push(book)
      
    },
    setBooksFilterBy(state, { filterBy }) {
      state.booksFilterBy = filterBy
    },
    saveReview(state, { book }) {
      const idx = state.books.findIndex(currBook => book.id === currBook.id)
      state.books.splice(idx, 1, book)
  },
  },
  actions: {
    async loadBooks(context) {
      const books = await bookService.query()
      context.commit({ type: 'setBooks', books })
    },
    async removeBook({ commit }, { id }) {
      await bookService.remove(id)
      commit({ type: 'removeBook', id })
    },
    async saveBook({ commit }, { book }) {
      const bookToSave = await bookService.save(book)
      commit({ type: 'saveBook', book: bookToSave})
      
    },
    async getEmptyBook(context) {
        return bookService.getEmptyBook()
    },
    async getBook(context,{id}) {
      const book = await bookService.getById(id)
      return book
    },
    async getAPI(context,{book}) {
      const books = await bookService.getBooksAPI(book)
      return books
    }
  },
  modules: {
    reviewModule
  }
})
