<template>
  <section class="book-list">
    <div class="book-card" v-for="currBook in books" :key="currBook.id">
      <book-preview :book="currBook" @remove="remove"/>
   </div>
  </section>
</template>

<script>
import BookPreview from "@/cmps/BookPreview.vue";
export default {
  props: ["books"],
  components: {
    BookPreview
  },
  methods: {
    remove(book) {
      this.$emit('removeBook', book);
    }
  }
};
</script>