<template>
  <div id="app">
    <user-msg/>
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/cmps/Navbar.vue";
import UserMsg from "@/cmps/UserMsg.vue";

export default {
components: {
  Navbar,
  UserMsg 
}
}
</script>

