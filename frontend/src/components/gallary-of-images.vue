<template>
  <div>
    <viewImage v-if="showModal" :image="viewedImage" @close="showModal = false"></viewImage>

    <h1 v-if="isLoadingUsersImages">Loading...</h1>

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
      this.$router.push({ params: { imageId: image._id } });
    }
  },
  computed: {
    isLoadingUsersImages() {
      return this.$store.getters.isLoadingUsersImages;
    }
  },
  created() {
    const imageId = this.$route.params.imageId;
    if (imageId) {
      console.log("cmp", imageId);
      this.$store.dispatch({ type: "getImageById", imageId }).then(image => {
        console.log("cmp",image)
        this.viewedImage = image;
        this.showModal = true;
      });
    }
  },
  watch: {
    showModal() {
      if (this.showModal === false) {
        this.$router.push({ params: { imageId: null } });
      }
    }
  },
  components: {
    viewImage
  }
};
</script>

<style>
</style>
