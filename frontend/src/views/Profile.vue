<template>
  <div class="profile" v-if="visitedUser">
    <section class="profile-pic-container">
      <img :src="visitedUser.profilePic" class="profile-pic">
      <div class="loggedin-user-details">
        <div class="username">
          {{visitedUser.userName}}
          <div class="right">
            
            <button v-if="this.loggedInUser._id === this.visitedUser._id" class="edit-profile-or-following">Edit Profile</button>
            <button @click="updateFollowers(visitedUser._id)" v-else class="edit-profile-or-following">{{followingButton}}</button>
            
            <i class="fas fa-cog btn"></i>
          </div>
        </div>
        <!-- <div class="numbers">
          <p>
            <span class="bold-reg" v-if="usersCreatedImages">{{usersCreatedImages.length+" "}}</span>posts
          </p>
          <p>
            <span class="bold-reg">{{visitedUser.followers.length+" "}}</span>followers
          </p>
          <p>
            <span class="bold-reg">{{visitedUser.followees.length+" "}}</span>following
          </p>
        </div> -->
        <div class="fullname bold-reg">{{visitedUser.firstName+" "+visitedUser.lastName}}</div>
        <div class="bio">{{visitedUser.bio}}</div>
      </div>
    </section>
    <section class="posts-container">
      <div class="filter-nav">
        <span
          class="btn"
          @click="changeFilter('album')"
          :class="{ 'chosen-filter': displayedSection==='album'}"
        >
          <i class="far fa-images"></i> Posts
        </span>
        <span
          class="btn"
          @click="changeFilter('favorites')"
          :class="{ 'chosen-filter': displayedSection==='favorites'}"
        >
          <i class="far fa-star"></i> Favorites
        </span>
        
        <span
          class="btn"
          @click="changeFilter('tagged')"
          :class="{ 'chosen-filter': displayedSection==='tagged'}"
        >
          <i class="fas fa-camera-retro"></i> Tagged
        </span>
      </div>

      <viewImage
        @updateFollowers="updateFollowers"
        v-if="showModal"
        :chosenImage="chosenImage"
        @close="showModal = false"
      ></viewImage>

      <h1 v-if="isLoadingImages">Loading...</h1>
      <div v-else class="user-posts">
        <img
          v-for="image in usersCreatedImages"
          :key="image._id"
          :src="image.image"
          alt="oh noo!"
          class="visitedUserImg"
          @click="displayChosenImage(image)"
        >
      </div>
    </section>
  </div>
</template>

<script>
import viewImage from "../components/view-image.vue";
export default {
  name: "user-profile",
  data() {
    return {
      displayedSection: "album",
      showModal: false,
      chosenImage: null
    };
  },
  methods: {
    changeFilter(filter) {
      this.displayedSection = filter;
    },
    getVisitedUserImages(userId) {
      this.$store.dispatch({ type: "getVisitedUserImages", userId });
    },
    displayChosenImage(image) {
      this.showModal = true;
      this.chosenImage = image;
    },
    updateFollowers(followeeId) {
      this.$store.dispatch({ type: "updateFollowers", followeeId });
    }
  },
  computed: {
    isLoadingImages() {
      return this.$store.getters.isLoadingImages;
    },
    usersCreatedImages() {
      return this.$store.getters.visitedUserImages;
    },
    followingButton() {
      if (this.loggedInUser.followees.includes(this.visitedUser._id)) {
        return "Following";
      } else return "Follow";
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    visitedUser() {
      return this.$store.getters.visitedUser;
    }
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store.dispatch({ type: "getVisitedUser", userId });
    this.getVisitedUserImages(userId);
  },
  components: {
    viewImage
  }
};
</script>

<style lang="scss" >
</style>
