<template>
  <div class="book-preview" v-if="book">
    <router-link :to="`/book/${book.id}`">
      <div class="img" :style="imgStyle">
        <img
          class="img-sale"
          v-if="book.listPrice.isOnSale"
          src="@/assets/img/sale.png"
        />
        <div @click.prevent="removeBook" class="close-preview">X</div>
      </div>
      <h1 class="title">{{ formatTitle }}</h1>
      <h2
        class="price"
        :class="{
          red: book.listPrice.amount > 150,
          green: book.listPrice.amount < 20,
        }"
      >
        {{ book.listPrice.amount }} {{ currencySign }}
      </h2>
    </router-link>
  </div>
</template>

<script>
import { bookService } from "@/services/book.service";
import { Utils} from '@/services/utils.service.js';
export default {
  props: ["book"],
  methods: {
    removeBook() {
      this.$emit("remove", this.book);
    },
  },
  computed: {
    currencySign() {
      const currency = this.book.listPrice.currencyCode;
      return Utils.getCurrencySign(currency);
    },
    imgStyle() {
      return { backgroundImage: 'url(' + this.book.thumbnail + ')' };
    },
    formatTitle() {
      if (this.book.title.length > 25) return this.book.title.slice(0,26)+ ' ...'
      else return this.book.title
    }
  },
};
</script>