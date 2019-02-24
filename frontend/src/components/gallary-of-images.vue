<template>
  <div>
    <viewImage v-if="showModal" :image="viewedImage" @close="showModal = false"></viewImage>

    <h1 v-if="setIsLoadingFavorites">Loading...</h1>

    <div class="user-posts">
      <img
        v-for="image in displayedImages"
        :src="image.image"
        :key="image._id"
        alt="oh noo!"
        class="visitedUserImg btn"
        @click="displayViewedImage(image)"
      >
    </div>
  </div>
</template>

<script>
import viewImage from "./view-image.vue";
export default {
  name: "image-gallery",
  props: ["displayedImages"],
  data() {
    return {
      showModal: false,
      viewedImage: null
    };
  },
  methods: {
    displayViewedImage(image) {
      this.showModal = true;
      this.viewedImage = image;
      this.$store.dispatch({ type: "setViewedImage", image });
    }
  },
  computed: {
    setIsLoadingFavorites() {
      return this.$store.getters.isLoadingImages;
    }
  },
  created(){
  },

  components: {
    viewImage
  }
};
</script>

<style>
</style>
