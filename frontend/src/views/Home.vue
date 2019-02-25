<template>
  <div id="user-feed page-container" v-if="imagesForFeed">
    <div class="user-feed" v-for="image in imagesForFeed" :key="image._id">
      <feedImage class="image-in-feed" :image="image"></feedImage>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import moment from "moment";
import feedImage from "../components/feed-image.vue";
export default {
  name: "home",
  data() {
    return {
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96",
      feedImages: []
    };
  },
  methods: {
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
          document.documentElement.offsetHeight-10;
        if (bottomOfWindow) {
          this.getAdditionalImages();
        }
      };
    }
  },
  created() {
    this.$store.dispatch({
      type: "getLoggedInUser",
      userId: this.loggedInUserId
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

  components: {
    feedImage
  }
};
</script>
<style lang="scss" scoped>
.user-feed {
  padding: 1rem;
  .image-in-feed {
    margin-top: 2rem;
  }
}
</style>

