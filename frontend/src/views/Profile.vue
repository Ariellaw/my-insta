<template>
  <div class="profile" v-if="visitedUser">
    <section class="profile-pic-container">
      <img :src="visitedUser.profilePic" class="profile-pic">
      <div class="loggedin-user-details">
        <div class="username">
          {{visitedUser.userName}}
          <div v-if="loggedInUser" class="right">
            <button
              @click="editProfile"
              v-if="loggedInUser._id === visitedUser._id"
              class="edit-profile-or-following-btn btn"
            >Edit Profile</button>
            <button
              @click="removeFollowers(visitedUser._id)"
              v-else-if="followingVisitedUser"
              class="edit-profile-or-following-btn"
            >Following</button>
            <button
              @click="addFollowers(visitedUser._id)"
              v-else
              class="edit-profile-or-following-btn"
            >Follow</button>
            
            <i class="fas fa-cog btn"></i>
          </div>
        </div>
        <div class="numbers">
          <p>
            <span class="bold-reg" v-if="usersImages">{{usersImages.length+" "}}</span>posts
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
        <!-- <span
          class="btn"
          @click="changeFilter('favorites')"
          :class="{ 'chosen-filter': filter==='favorites'}"
        >
          <i class="far fa-star"></i> Favorites
        </span> -->
        
        <span
          class="btn"
          @click="changeFilter('tagged')"
          :class="{ 'chosen-filter': filter==='tagged'}"
        >
          <i class="fas fa-camera-retro"></i> Tagged
        </span>
      </div>
      <!-- <galleryOfImages></galleryOfImages>
      <galleryOfImages></galleryOfImages> -->
      <galleryOfImages  v-if="filter==='album'" :displayedImages="usersImages"></galleryOfImages>
        <galleryOfImages :displayedImages="userFavorites"></galleryOfImages>

    </section>
  </div>
</template>

<script>
import galleryOfImages from "../components/gallary-of-images.vue";

export default {
  name: "user-profile",
  data() {
    return {
      filter: "album",
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96",
    };
  },
  methods: {
    changeFilter(filter) {
      this.filter = filter;
      if (this.filter === "album") {
        this.displayedImages = this.usersImages;
      } else if (this.filter === "favorites") {
        this.displayedImages = this.userFavorites;
      }
    },
    getVisitedUserImages(userId) {
      this.$store.dispatch({ type: "getVisitedUserImages", userId });
    },

    addFollowers(followeeId) {
      this.$store.dispatch({ type: "addFollowers", followeeId });
    },
    removeFollowers(followeeId) {
      this.$store.dispatch({ type: "removeFollowers", followeeId });
    },
    editProfile(){
     this.$router.push(`/edit/${this.loggedInUserId}`);

    }
  },
  computed: {
    usersImages() {
      return this.$store.getters.visitedUserImages;
    },
    followingVisitedUser() {
      return this.loggedInUser.followees.includes(this.visitedUser._id);
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    visitedUser() {
      return this.$store.getters.visitedUser;
    },
    userFavorites() {
      return this.$store.getters.userFavoriteImages;
    }
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store.dispatch({ type: "getVisitedUser", userId });
    // this.$store.dispatch({
    //   type: "getUserFavoriteImages",
    //   userId: this.loggedInUserId
    // });
    this.getVisitedUserImages(userId);
    this.$store.dispatch({
      type: "getLoggedInUser",
      userId: this.loggedInUserId
    });
  },
  components: {
    galleryOfImages
  }
};
</script>

<style lang="scss" >
</style>
