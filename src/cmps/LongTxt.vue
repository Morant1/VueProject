<template>
  <section v-if="txtToShow" class="book-description">
    {{ txtToShow }}
    <a class="toggle-btn" v-if="txt.length > 100" @click="onToggleTxt">{{
      toggleTxt ? "Less" : "More"
    }}</a>
  </section>
</template>

<script>
export default {
  props: ["txt"],
  data() {
    return {
      toggleTxt: false,
      txtToShow: null
    };
  },
  created() {
      this.displayTxt();
  },
  methods: {
    onToggleTxt() {
      this.toggleTxt = !this.toggleTxt;
      this.displayTxt();
      
    
    },
    displayTxt() {
      const length = 100;
      if(!this.txt) return '';

      if (this.toggleTxt) this.txtToShow = this.txt;
      else this.txtToShow = this.txt.slice(0, length + 1) + '...'
    },
  }
};
</script>