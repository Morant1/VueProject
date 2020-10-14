import Vue from 'vue'
import VueRouter from 'vue-router'
import BookApp from '../views/BookApp.vue'
import BookDetails from '../views/BookDetails.vue'
import About from '../views/About.vue'
import AddBook from '../views/AddBook.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BookApp',
    component: BookApp
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/book/add',
    component: AddBook
  },
  {
    path: '/book/:bookId',
    component: BookDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
