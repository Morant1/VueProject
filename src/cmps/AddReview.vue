<template>
  <form @submit.prevent="addReview" class="review-container">
    <input type="text" ref="input" v-model="newReview.name" />
    <label for="rate">Rate</label>
    <select id="rate" v-model.number="newReview.rate">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <label for="date">Read at</label>
    <input id="date" type="date" v-model="newReview.read_at" />
    <textarea rows="5" cols="30" v-model="newReview.txt"></textarea>

    <button>Save</button>
  </form>
</template>

<script>
import { bookService } from "@/services/book.service";
export default {
  props: ["bookId"],
  data() {
    return {
      newReview: {}
    };
  },
  created() {
      this.clearReview()
  },
  mounted() {
      this.$refs.input.focus();
  },
  methods: {
    async addReview() {
      this.$emit('addReview',this.bookId, this.newReview)
      this.clearReview()
    },
    clearReview() {
        this.newReview = {
        name: "Books' reader",
        rate: 1,
        read_at: new Date().toISOString().slice(0, 10),
        txt: "",
      }
    }
  },
};
</script>

