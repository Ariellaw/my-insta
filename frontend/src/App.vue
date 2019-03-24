<template>
  <div>
    <nav-bar @close="close()" @addnewimage="addnewimage"></nav-bar>
    <router-view/>

    <upload-post @close="close()" v-if="newImageModual && image.file" :image="image.file"></upload-post>
    <footer-nav @addnewimage="addnewimage"></footer-nav>
  </div>
</template>

<script>
import NavBar from "./components/nav-bar.vue";
import FooterNav from "./components/footer.vue";
import uploadPost from "./components/upload-post";
export default {
  data() {
    return {
      newImageModual: false,
      image: {
        file: null
      }
    };
  },
  methods: {
    close() {
      this.image.file = null;
      this.newImageModual = false;
      this.$router.push({ params: { image: null } });
    },
    addnewimage(url) {
      this.image.file = url;
      this.$router.push({ params: { image: "new-image" } });
      this.newImageModual = true;
    }
  },
  watch: {
    $route() {
      if (this.$route.params.image === null) {
        this.newImageModual = false;
      } else if (this.$route.params.image === "new-image") {
        this.newImageModual = true;
      }
    }
  },
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