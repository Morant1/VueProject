<template>
      <nav class="nav-container">
        <router-link to="/" class="logo">BOOKVUE</router-link>
        <div class="links">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/book/add">Add book</router-link>
      </div>
    </nav>

</template>

<script>
export default {
  mounted() {
    var navbar = document.querySelector('nav')

    window.onscroll = function() {
  if (window.pageYOffset > 0) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
}
  }
}
</script>

<style>

</style>