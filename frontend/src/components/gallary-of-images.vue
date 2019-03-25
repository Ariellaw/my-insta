<template>
  <div>
    <view-image
      @goBack1Image="goBack1Image"
      @goForward1Img="goForward1Img"
      v-if="showModal"
      :image="viewedImage"
      @close="showModal = false"
    ></view-image>

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
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 1;

        if (bottomOfWindow) {
          this.$emit('getAdditionalImages')
        }
      };
    },

    goBack1Image() {
      var idx = this.getIndexOfCurrImage();

      if (idx === 0) {
        idx = this.displayedImages.length - 1;
      } else {
        idx--;
      }
      this.displayNewImg(idx);
    },
    goForward1Img() {
      var idx = this.getIndexOfCurrImage();

      if (idx === this.displayedImages.length - 1) {
        idx = 0;
      } else {
        idx++;
      }
      this.displayNewImg(idx);
    },
    displayNewImg(idx) {
      this.viewedImage = this.displayedImages[idx];
      this.$router.push({ params: { image: this.displayedImages[idx]._id } });
    },
    getIndexOfCurrImage() {
      var idx = this.displayedImages.findIndex(image => {
        return image._id === this.viewedImage._id;
      });
      return idx;
    },
    displayViewedImage(image) {
      this.showModal = true;
      this.viewedImage = image;
      this.$router.push({ params: { image: image._id } });
    }
  },
  computed: {
    isLoadingUsersImages() {
      return this.$store.getters.isLoadingUsersImages;
    }
  },
  created() {
    const imageId = this.$route.params.image;
    if (imageId  && imageId !== "new-image") {
      this.$store.dispatch({ type: "getImageById", imageId }).then(image => {
        this.viewedImage = image;
        this.showModal = true;
      });
    }
  },
  mounted() {
    // this.scroll();
  },
  watch: {
    showModal() {
      if (this.showModal === false) {
        this.$router.push({ params: { image: null } });
      }
    },
    $route() {
      if (this.$route.params.image === null) {
        this.showModal = false;
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
