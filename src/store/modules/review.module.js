
import {bookService} from '@/services/book.service.js';


export default {
    actions: {
        async addReview({ commit }, { bookId, newReview }) {
            const book = await bookService.addReview(bookId, newReview)
            commit({ type: 'saveReview', book })
        },
        async removeReview({ commit }, { bookId, reviewId }) {
            const book = await bookService.removeReview(bookId, reviewId);
            commit({ type: 'saveReview', book })
        }
    },
    modules: {}
}