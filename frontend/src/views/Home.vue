<template>
  <div id="user-feed page-container" v-if="imagesForFeed">
    <div
      class="user-feed"
      v-for="image in imagesForFeed"
      :key="image._id"
      @click="displayViewedImage(image)"
    >
      <feedImage class="image-in-feed" :image="image"></feedImage>
    </div>
    <view-image
      @goBack1Image="goBack1Image"
      @goForward1Img="goForward1Img"
      v-if="showModal"
      :image="chosenImage"
      @close="closeModal()"
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
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96",
      loggedInUserName: "Ariella_wills1",
      feedImages: [],
      showModal: false,
      chosenImage: null,
      userImages: null
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.userImages = null;
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
        });
    },

    displayNewImg(idx) {
      this.chosenImage = this.userImages[idx];
      this.$router.push({ params: { imageId: this.userImages[idx]._id } });
    },
    getIndexOfCurrImage() {
      var idx = this.userImages.findIndex(image => {
        return image._id === this.chosenImage._id;
      });
      return idx;
    },
    displayViewedImage(image) {
      this.showModal = true;
      this.chosenImage = image;
      this.$store.dispatch({ type: "setViewedImage", image });
      this.$router.push({ params: { imageId: image._id } });
      this.getUserImages(image.ownerId);
    },
    getInitalImages() {
      this.$store.dispatch({ type: "getInitalImages" });
    },
    getAdditionalImages() {
      this.$store.dispatch({ type: "getAdditionalImages" });
    },

    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 30;
        if (bottomOfWindow) {
          this.getAdditionalImages();
        }
      };
    }
  },
  created() {
    const imageId = this.$route.params.imageId;
    if (imageId) {
      this.$store.dispatch({ type: "getImageById", imageId }).then(image => {
        this.chosenImage = image;
        this.showModal = true;
        this.getUserImages(image.ownerId);
      });
    }
    this.$store.dispatch({
      type: "getLoggedInUser",
      userName: this.loggedInUserName
    });
  },
  beforeMount() {
    this.getInitalImages();
  },
  mounted() {
    this.scroll();
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
        this.$router.push({ params: { imageId: null } });
      }
    },
    $route() {
      if (this.$route.params.imageId === null) {
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
.user-feed {
  // padding: 1rem;
  .image-in-feed {
    margin-top: 1rem;
  }
}
</style>

