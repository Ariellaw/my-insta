<template>
  <div class="profile" v-if="visitedUser">
    <section class="profile-pic-container">
      <img :src="visitedUser.profilePic" class="profile-pic">
      <div class="loggedin-user-details">
        <div class="username">
          {{visitedUser.userName}}
          <div class="right">
            <button
              v-if="loggedInUser && loggedInUser._id === visitedUser._id"
              class="edit-profile-or-following"
            >Edit Profile</button>
            <button
              @click="removeFollowers(visitedUser._id)"
              v-else-if="followingVisitedUser"
              class="edit-profile-or-following"
            >Following</button>
            <button
              @click="addFollowers(visitedUser._id)"
              v-else
              class="edit-profile-or-following"
            >Follow</button>
            
            <i class="fas fa-cog btn"></i>
          </div>
        </div>
        <div class="numbers">
          <p>
            <span class="bold-reg" v-if="usersCreatedImages">{{usersCreatedImages.length+" "}}</span>posts
          </p>
          <p>
            <span class="bold-reg">{{visitedUser.followers.length+" "}}</span>followers
          </p>
          <p>
            <span class="bold-reg">{{visitedUser.followees.length+" "}}</span>following
          </p>
        </div>
        <div class="fullname bold-reg">{{visitedUser.firstName+" "+visitedUser.lastName}}</div>
        <div class="bio">{{visitedUser.bio}}</div>
      </div>
    </section>
    <section class="posts-container">
      <div class="filter-nav">
        <span
          class="btn"
          @click="changeFilter('album')"
          :class="{ 'chosen-filter': filter==='album'}"
        >
          <i class="far fa-images"></i> Posts
        </span>
        <span
          class="btn"
          @click="changeFilter('favorites')"
          :class="{ 'chosen-filter': filter==='favorites'}"
        >
          <i class="far fa-star"></i> Favorites
        </span>
        
        <span
          class="btn"
          @click="changeFilter('tagged')"
          :class="{ 'chosen-filter': filter==='tagged'}"
        >
          <i class="fas fa-camera-retro"></i> Tagged
        </span>
      </div>

      <viewImage
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
      filter: "album",
      showModal: false,
      chosenImage: null,
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96"
    };
  },
  methods: {
    changeFilter(filter) {
      this.filter = filter;
    },
    getVisitedUserImages(userId) {
      this.$store.dispatch({ type: "getVisitedUserImages", userId });
    },
    displayChosenImage(image) {
      this.showModal = true;
      this.chosenImage = image;
    },

    addFollowers(followeeId) {
      this.$store.dispatch({ type: "addFollowers", followeeId });
    },
    removeFollowers(followeeId) {
      this.$store.dispatch({ type: "removeFollowers", followeeId });
    }
  },
  computed: {
    isLoadingImages() {
      return this.$store.getters.isLoadingImages;
    },
    usersCreatedImages() {
      return this.$store.getters.visitedUserImages;
    },
    followingVisitedUser() {
      if (this.loggedInUser && this.loggedInUser.followees.includes(this.visitedUser._id)) {
        return true;
      } else return false;
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
    this.$store.dispatch({type:"getLoggedInUser", userId:this.loggedInUserId});
  },
  components: {
    viewImage
  }
};
</script>

<style lang="scss" >
</style>
