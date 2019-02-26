<template>
  <div>
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from "./components/nav-bar.vue";
export default {
  components: {
    NavBar
  }
};
//change ID on URL to profile to userName

</script>


<style>
</style>
