<template>
  <div>
    <nav-bar></nav-bar>
    <!-- <upload-post v-if="newImage" :image="image.file" @close="close()"></upload-post> -->
    <upload-post></upload-post>
    <router-view/>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import NavBar from "./components/nav-bar.vue";
import FooterNav from "./components/footer.vue"
import uploadPost from "./components/upload-post"
export default {
  components: {
    NavBar,
    uploadPost,
    FooterNav
  }
};
//change ID on URL to profile to userName

</script>


<style>
</style>
