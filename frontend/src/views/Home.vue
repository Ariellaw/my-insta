<template>
  <img v-if="!imagesForFeed" src="../assets/img/Loading-homepage.gif" alt class="loading-img" />
  <div v-else id="user-feed page-container">
    <div
      class="user-feed"
      v-for="image in imagesForFeed"
      :key="image._id"
      :class="{ visibilityNone: showModal }"
    >
      <feedImage class="image-in-feed" :image="image" @displayFeedImage="displayFeedImage(image)"></feedImage>
    </div>
    <view-image
      @goBack1Image="goBack1Image"
      @goForward1Img="goForward1Img"
      v-if="showModal"
      :image="chosenImage"
      @close="closeModal()"
      :albumLength="userImages.length"
    ></view-image>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import moment from "moment";
import feedImage from "../components/feed-image.vue";
import viewImage from "../components/view-image.vue";
export default {
  name: "home",
  data() {
    return {
      showModal: false,
      chosenImage: null,
      userImages: null
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.userImages = null;
      this.$router.push({ params: { image: null } });
      this.$router.go();
      this.$store.dispatch({ type: "setViewedImage", image: null });
    },
    goBack1Image() {
      var idx = this.getIndexOfCurrImage();

      if (idx === 0) {
        idx = this.userImages.length - 1;
      } else {
        idx--;
      }
      this.displayNewImg(idx);
    },
    goForward1Img() {
      var idx = this.getIndexOfCurrImage();

      if (idx === this.userImages.length - 1) {
        idx = 0;
      } else {
        idx++;
      }
      this.displayNewImg(idx);
    },
    getUserImages(userId) {
      this.$store
        .dispatch({ type: "getVisitedUserImages", userId })
        .then(images => {
          this.userImages = images;
        })
        .catch(err => {
          console.log("getUserImages ERR", err);
          this.$router.push({ name: "login" });
        });
    },

    displayNewImg(idx) {
      this.chosenImage = this.userImages[idx];
      this.$router.push({ params: { image: this.userImages[idx]._id } });
    },
    getIndexOfCurrImage() {
      var idx = this.userImages.findIndex(image => {
        return image._id === this.chosenImage._id;
      });
      return idx;
    },
    displayFeedImage(image) {
      this.showModal = true;
      this.chosenImage = image;
      this.$router.push({ params: { image: image._id } });
      this.getUserImages(image.ownerId);
    },
    getInitalImages() {
      this.$store.dispatch({ type: "getInitalImages" }).catch(err => {
        console.log("getInitalImages ERR", err);
        this.$router.push({ name: "login" });
      });
    },
    getAdditionalImages() {
      this.$store.dispatch({ type: "getAdditionalImages" });
    },

    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 1;
        if (bottomOfWindow && this.imagesForFeed.length > 2) {
          this.getAdditionalImages();
        }
      };
    }
  },
  created() {

    this.getInitalImages();
    const imageId = this.$route.params.image;
    if (imageId && this.$route.name === "home" && imageId !== "new-image") {
      this.$store
        .dispatch({ type: "getImageById", imageId })
        .then(image => {
          this.chosenImage = image;
          this.showModal = true;
          this.getUserImages(image.ownerId);
        })
        .catch(err => {
          console.log("getImageById ERR", err);
        });
    }
  },
  mounted() {
    this.scroll();
  },
  destroyed() {
    this.$store.dispatch({ type: "getLoggedInUser" });
  },
  computed: {
    imagesForFeed() {
      return this.$store.getters.imagesForFeed;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
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
    feedImage,
    viewImage
  }
};
</script>
<style lang="scss" scoped>
.loading-img {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.user-feed {
  @media screen and (max-width: 700px) {
    overflow: hidden;
  }
  .image-in-feed {
    margin-top: 1rem;
  }
}
</style>
