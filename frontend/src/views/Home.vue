<template>
  <div id="user-feed" v-if="imagesForFeed">
    <div class="user-feed" v-for="image in imagesForFeed" :key="image._id">
      <feedImage class="image-in-feed" :image="image"></feedImage>
    </div>
    <!-- <h1>Random User</h1>
    <div class="person" v-for="person in persons" :key="person.uuid">
      <div class="left">
        <img :src="person.picture.large">
      </div>
      <div class="right">
        <p>{{ person.name.first }} {{ person.name.last }}</p>
        <ul>
          <li>
            <strong>Birthday:</strong> 
            {{ formatDate(person.dob) }} 
          </li>
          <li class="text-capitalize">
            <strong>Location:</strong> {{ person.location.city }},
            {{ person.location.state }}
          </li>
        </ul>
      </div>
    </div>-->
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
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
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
.image-in-feed {
  margin-bottom: 6rem;
}
</style>

