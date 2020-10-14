<template>
  <main>
    <app-header />

    <form @submit.prevent="saveBook" class="from-api">
      <input class="input" type="text" v-model="newBook" list="books" @input="getBooksAPI" placeholder="add Book from google..." />
      <datalist id="books">
        <option v-for="book in booksApi" :key="book.id">
          {{ book.volumeInfo.title }}
        </option>
      </datalist>
      <button class="input-btn">+</button>
    </form>

    <book-filter @filtered="setFilter"></book-filter>
    <book-list :books="booksForDisplay" @removeBook="removeBook" />
  </main>
</template>

<script>
import BookList from "@/cmps/BookList.vue";
import BookFilter from "@/cmps/BookFilter.vue";
import AppHeader from "@/cmps/AppHeader.vue";
import eventBus from "@/services/eventBus.service.js";
import { bookService } from "@/services/book.service";

export default {
  data() {
    return {
      newBook: "",
      booksApi: [],
      bookToAdd: null,
    };
  },
  created() {
    this.loadBooks();
  },
  methods: {
    async loadBooks() {
      this.$store.dispatch({ type: "loadBooks" });
    },
    setFilter(filterBy) {
      console.log(filterBy);
      this.$store.commit({ type: "setBooksFilterBy", filterBy });
    },
    async removeBook(book) {
      const id = book.id;
      await this.$store.dispatch({ type: "removeBook", id });

      eventBus.$emit("showMsg", {
        msg: `${book.title} was removed`,
        type: "success",
      });
    },
    async getBooksAPI() {
      if (!this.newBook) return;
      const booksApi = await this.$store.dispatch({ type: "getAPI" , book: this.newBook});
      try {
        this.booksApi = booksApi;
      } catch {
        console.log("failed in api request");
      }
    },
    async saveBook() {
      const book = this.booksApi.find(
        (book) => this.newBook == book.volumeInfo.title
      );

      const bookToAdd = await bookService.getGoogleBook(book);
      this.bookToAdd = bookToAdd;

      await this.$store.dispatch({ type: "saveBook", book: this.bookToAdd });

      try {
        this.newBook = "";

        eventBus.$emit("showMsg", {
          msg: `${this.bookToAdd.title} was added`,
          type: "success",
          id: `${this.bookToAdd.id}`,
        });
      } catch {
          eventBus.$emit("showMsg", {
          msg: `${this.bookToAdd.title} was added`,
          type: "fail"
        });
      }
    },
  },
  computed: {
    booksForDisplay() {
      return this.$store.getters.booksToShow;
    },
  },
  components: {
    BookList,
    BookFilter,
    AppHeader,
  },
};
</script>
