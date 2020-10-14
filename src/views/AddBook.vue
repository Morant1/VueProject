<template>
  <section class="add-container">
      <h2>Add your Book</h2>
    <form @submit.prevent="save" v-if="bookToAdd">
        <label for="title">Title</label>
      <input id="title" type="text" v-model="bookToAdd.title" />
      <label id="publishDate">Publish Date</label>
      <input  for="publishDate" type="number" min="1900" max="2021" v-model="bookToAdd.publishedDate" />
      <label id="language">Language</label>
      <input for="language" type="text" v-model="bookToAdd.language" />
      <label id="pageCount">Page Count</label>
      <input for="pageCount" type="number" v-model.number="bookToAdd.pageCount" />
      <label id="price">Price</label>
      <input for="price" type="number" v-model.number="bookToAdd.listPrice.amount" />
      <button>Save</button>
    </form>
  </section>
</template>

<script>
import {bookService} from '@/services/book.service.js';
import eventBus from '@/services/eventBus.service.js';

export default {
  data() {
    return {
      bookToAdd: null,
    };
  },
  methods: {
    async save() {
    await this.$store.dispatch({ type: 'saveBook', book: this.bookToAdd });
  

    eventBus.$emit('showMsg',{ msg: `${this.bookToAdd.title} was added`, type: 'success',id:`${this.bookToAdd.id}`})
    this.$router.push('/')
    },
  },
  async created() {
      this.bookToAdd = await this.$store.dispatch({ type: 'getEmptyBook'});
      

       
      
  }
};
</script>




