<template>
  <div class="profile" v-if="visitedUser">
    <section class="profile-pic-container">
      <img :src="visitedUser.profilePic" class="profile-pic">
      <div class="loggedin-user-details">
        <div class="username">
          {{visitedUser.userName}}
          <button class="edit-profile">Edit Profile</button>
          <i class="fas fa-cog btn"></i>
        </div>
        <div class="numbers">
          <p>
            <span class="bold">2</span>posts
          </p>
          <p>
            <span class="bold">{{visitedUser.followers.length+" "}}</span>followers
          </p>
          <p>
            <span class="bold">{{visitedUser.followees.length+" "}}</span>following
          </p>
        </div>
        <div class="fullname">{{visitedUser.firstName+" "+visitedUser.lastName}}</div>
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

      <viewImage v-if="showModal"  :chosenImage="chosenImage" @close="showModal = false"></viewImage>

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
      visitedUser: null,
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
    }
  },
  computed: {
    isLoadingImages() {
      return this.$store.getters.isLoadingImages;
    },
    usersCreatedImages() {
      return this.$store.getters.visitedUserImages;
    }
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store.dispatch({ type: "getVisitedUser", userId }).then(res => {
      this.visitedUser = res;
    });
    this.getVisitedUserImages(userId);
  },
  components: {
    viewImage
  }
};
</script>

<style lang="scss" scoped>
$darker-layout-clr: darken(#fafafa, 2%);
$lighter: #fafafa;
.profile {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 70%;
  margin: 0 auto;
  .profile-pic-container {
    height: 30%;
    padding: 4rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .profile-pic {
      border-radius: 50%;
      border: 1px solid black;
      height: 15rem;
      margin-right: 10rem;
    }
    .loggedin-user-details {
      display: flex;
      flex-direction: column;
      line-height: 3.5rem;
      width: 40%;
      div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .username {
        font-size: 2.5rem;
        .edit-profile {
          border-radius: 11%;
          padding: 1rem;
          height: 34px;
          background-color: $darker-layout-clr;
          border: 1px solid darkgray;
          width: 89px;
          height: 30px;
        }
      }
      .numbers {
        font-size: 1.5rem;
      }
      .fullname {
        font-size: 2rem;
        font-family: monst-bold;
      }
    }
  }
  .posts-container {
    color: darkgray;
    height: 70%;
    .filter-nav {
      border-top: 1px solid lightgray;
      display: flex;
      justify-content: center;
      span {
        margin: 1rem 9rem;
        font-size: 1.5rem;
      }
    }
    .user-posts {
      display: grid;
      grid-template-columns: 33% 33% 33%;
      grid-gap: 1rem;
      padding: 1rem;

      .visitedUserImg {
        height: 300px;
        object-fit: cover;
        width: 100%;
      }
    }
    .chosen-filter {
      color: black;
    }
  }
}
</style>
