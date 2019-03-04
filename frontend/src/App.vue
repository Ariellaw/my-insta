<template>
  <div>
    <nav-bar></nav-bar>
    <router-view/>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import NavBar from "./components/nav-bar.vue";
import FooterNav from "./components/footer.vue"
export default {
  components: {
    NavBar,
    FooterNav
  }
};
//change ID on URL to profile to userName

</script>


<style>
</style>
