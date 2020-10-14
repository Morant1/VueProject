<template>
  <section v-if="book" class="book-details">
    <button @click="goBack" class="back-btn">Back</button>
    <h1 class="title">{{ book.title }}</h1>
    <div class="book-img" :style="{ backgroundImage: 'url(' + getImg + ')' }">
      <img
        class="img-sale"
        v-if="book.listPrice.isOnSale"
        src="@/assets/img/sale.png"
      />
    </div>
    <div class="note-container">
      <div v-if="checkPageCount" class="note">{{ checkPageCount }}</div>
      <div v-if="checkPublishDate" class="note">
        {{ checkPublishDate }}
      </div>
    </div>

    <div class="icons-container">
      <ul>
        <img class="icon" src="@/assets/icons/date.svg" />
        <li>{{ book.publishedDate }}</li>
      </ul>

      <ul class="authors-list" v-for="author in book.authors" :key="author">
        <img class="icon" src="@/assets/icons/person.svg" />
        <li>{{ author }}</li>
      </ul>
      <ul class="price">
        <img class="icon" src="@/assets/icons/price.svg" />
        <li
          :class="{
            red: book.listPrice.amount > 150,
            green: book.listPrice.amount < 20,
          }"
        >
          {{ book.listPrice.amount }} {{ currencySign }}
        </li>
      </ul>
    </div>
    <div style="color: #7b6e6e">Language: {{ book.language }}</div>
    <ul class="category-list" v-if="book.categories">
      <li
        class="category-item"
        v-for="(category, idx) in book.categories"
        :key="idx"
      >
        #{{ category }}
      </li>
    </ul>
    <long-txt :txt="book.description" />
    <div v-if="book.review && book.review.length" class="review-list">
      <h2>Reviews</h2>

      <ul class="review" v-for="currReview in book.review" :key="currReview.id">
        <li><button @click="removeReview(currReview.id)">Remove</button></li>
        <li>Reviewd by: {{ currReview.name }}</li>
        <li>Date: {{ currReview.read_at }}</li>
        <li>Rate: {{ currReview.rate }}</li>
        <li>Text: {{ currReview.txt }}</li>
      </ul>
    </div>
    <button @click="toggleReview" class="btn-review">
      {{ isReview ? "Close" : "Add Review" }}
    </button>
    <add-review v-if="isReview" :bookId="book.id" @addReview="addReview" />
    <div class="prev-next-btn">
    <button class="btn" @click="next">Next</button>
    <button class="btn" @click="prev">Prev</button>
    </div>
  </section>
</template>

<script>
import { bookService } from "@/services/book.service";
import { Utils} from '@/services/utils.service.js';
import LongTxt from "@/cmps/LongTxt.vue";
import AddReview from "@/cmps/AddReview.vue";
import eventBus from "@/services/eventBus.service.js";

export default {
  data() {
    return {
      isReview: false,
      book: null
    };
  },
  methods: {
    async addReview(bookId, newReview) {
      await this.$store.dispatch({ type: 'addReview', bookId, newReview });
      this.loadBook();


      eventBus.$emit("showMsg", {
        msg: `review for ${this.book.title} was added`,
        type: "success",
      });
    },
    async removeReview(reviewId) {
      const bookId = this.book.id;
      await this.$store.dispatch({ type: 'removeReview',  bookId, reviewId });
      this.loadBook();

      eventBus.$emit("showMsg", {
        msg: `review for ${this.book.title} was removed`,
        type: "success"
      });
    },
    toggleReview() {
      this.isReview = !this.isReview;
    },
    goBack() {
      this.$router.push("/");
    },
    async loadBook() {
      const bookId = this.$route.params.bookId;
      const bookToUse = await this.$store.dispatch({
        type: "getBook",
        id: bookId,
      });
      this.book = { ...bookToUse };
    },
    async next() {
      const { nextBookId } = await bookService.getNextPrev(this.book.id);
      this.$router.push(`/book/${nextBookId}`);
    },
    async prev() {
      const { prevBookId } = await bookService.getNextPrev(this.book.id);
      this.$router.push(`/book/${prevBookId}`);
    },
  },
  created() {
    this.loadBook();
  },
  computed: {
    getImg() {
      return this.book.thumbnail;
    },
    checkPublishDate() {
      const currYear = new Date().getFullYear();
      if (currYear - this.book.publishedDate > 10) return "Veteran Book";
      if (currYear - this.book.publishedDate < 1) return "New!";
      else return null;
    },
    currencySign() {
      const currency = this.book.listPrice.currencyCode;
      return Utils.getCurrencySign(currency);
    },
    checkPageCount() {
      if (this.book.pageCount > 500) return "Long reading";
      if (this.book.pageCount > 200) return "Decent Reading";
      if (this.book.pageCount < 100) return "Light Reading";
    },
  },
  watch: {
    "$route.params.bookId"() {
      this.loadBook();
    },
  },
  components: {
    LongTxt,
    AddReview,
  },
};
</script>