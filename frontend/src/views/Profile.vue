<template>
  <div :class="{'darkScreen':optionsModual}">
    <div class="profile page-container" v-if="visitedUser">
      <user-options v-if="optionsModual" @close="optionsModual=false"></user-options>


      <section class="profile-pic-container" v-if="cellphoneDisplay">
        <div class="upperpart-of-profile">
          <img :src="visitedUser.profilePic" class="profile-pic" />
          <div class="column">
            <div class="numbers">
              <p>
                <span v-if="album" class="bold-reg">{{album.length+" "}}</span>posts
              </p>
              <p>
                <span class="bold-reg">{{visitedUser.followers.length+" "}}</span>followers
              </p>
              <p>
                <span class="bold-reg">{{visitedUser.followees.length+" "}}</span>following
              </p>
            </div>

            <div v-if="loggedInUser" class="right">
              <section v-if="loggedInUser._id === visitedUser._id">
                <button @click="editProfile" class="edit-profile-or-following-btn btn">Edit Profile</button>
              </section>
              <div v-else-if="followingVisitedUser">
                <button class="mobile-following">
                  <i class="fas fa-user-check" @click="removeFollowers(visitedUser._id)"></i>
                </button>
              </div>
              <button
                @click="addFollowers(visitedUser._id)"
                v-else-if="!followingVisitedUser"
                class="follower-user-btn btn"
              >Follow</button>
            </div>
          </div>
        </div>
        <div class="fullname bold-reg">{{visitedUser.firstName+" "+visitedUser.lastName}}</div>

        <div class="bio">{{visitedUser.bio}}</div>
      </section>



      <section class="profile-pic-container" v-else>
        <img :src="visitedUser.profilePic" class="profile-pic" />
        <div class="user-details">
          <div class="username">
            {{visitedUser.userName}}
            <div v-if="loggedInUser" class="right">
              <section v-if="loggedInUser._id === visitedUser._id">
                <button @click="editProfile" class="edit-profile-or-following-btn btn">Edit Profile</button>
                <i class="fas fa-cog settings" @click="displayOptions()"></i>
              </section>
              <button
                v-else-if="followingVisitedUser"
                @click="removeFollowers(visitedUser._id)"
                class="edit-profile-or-following-btn btn"
              >Following</button>
              <button
                @click="addFollowers(visitedUser._id)"
                v-else
                class="follower-user-btn btn"
              >Follow</button>
            </div>
          </div>
          <div class="numbers">
            <p>
              <span v-if="album" class="bold-reg">{{album.length+" "}}</span>posts
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
            @click="getVisitedUserImages(visitedUser._id)"
            :class="{ 'chosen-filter': filter===imageOptions.album}"
          >
            <i class="far fa-images"></i>
            <h4 class="filter">&nbsp;My Images</h4>
          </span>
          <span
            class="btn"
            @click="getUserFavoriteImages(visitedUser._id)"
            :class="{ 'chosen-filter': filter===imageOptions.favorites}"
          >
            <i class="far fa-star"></i>
            <h4 class="filter">&nbsp; Favorites</h4>
          </span>
        </div>

        <galleryOfImages
          :displayedImages="filter==='album'?album:favorites"
          v-show="!optionsModual"
        ></galleryOfImages>
      </section>
    </div>
  </div>
</template>

<script>
import galleryOfImages from "../components/gallary-of-images.vue";
import userOptions from "../components/options";
export default {
  name: "user-profile",
  data() {
    return {
      filter: "album",
      cellphoneDisplay: false,
      windowWidth: null,
      optionsModual: false,
      imageOptions:{
        album:'album',
        favorites:'favorites'
      }
    };
  },
  methods: {
    displayOptions() {
      this.optionsModual = true;
    },
    getVisitedUserImages(userId) {
      this.filter = this.imageOptions.album;
      const isLoggedInUser =
        this.loggedInUser && this.loggedInUser._id === this.visitedUser._id;
      this.$store
        .dispatch({
          type: "getVisitedUserImages",
          userId,
          isLoggedInUser
        })
        .then(res => {});
    },
    getUserFavoriteImages(visitedUserId) {
      this.filter = this.imageOptions.filter;
      this.$store.dispatch({
        type: "getUserFavoriteImages",
        userId: visitedUserId
      });
    },
    addFollowers(followeeId) {
      this.$store.dispatch({ type: "addFollowers", followeeId }).catch(err => {
        console.log("addFollowers ERR", err);
        this.$router.push({ name: "login" });
      });
    },
    removeFollowers(followeeId) {
      this.$store
        .dispatch({ type: "removeFollowers", followeeId })
        .catch(err => {
          console.log("removeFollowers ERR", err);
          this.$router.push({ name: "login" });
        });
    },
    editProfile() {
      this.$router.push({
        name: "edit-user-details",
        params: { userName: this.visitedUser.userName }
      });
    }
  },
  computed: {
    album() {
      var images =  this.isLoggedInUser &&
        this.isLoggedInUser._id === this.visitedUser._id
        ? this.$store.getters.loggedInUserImages
        : this.$store.getters.viewedImageCollection;
        return images
    },
    favorites() {
      return this.$store.getters.userFavoriteImages;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    visitedUser() {
      return this.$store.getters.visitedUser;
    },
    followingVisitedUser() {
      const idx = this.visitedUser.followers.findIndex(
        followerId => followerId === this.loggedInUser._id
      );
      return idx >= 0;
    }
  },
  created() {
    const userName = this.$route.params.userName;
    this.$store.dispatch({ type: "getVisitedUser", userName }).then(user => {
      this.getVisitedUserImages(user._id);
    });

    this.$store.dispatch({ type: "getLoggedInUser" });

    if (window.innerWidth <= 600) {
      this.cellphoneDisplay = true;
    }
  },
  destroyed() {
    this.$store.dispatch({ type: "setVisitedUser", user: null });
    this.$store.dispatch({ type: "getLoggedInUser" });
  },
  components: {
    galleryOfImages,
    userOptions
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  },
  watch: {
    windowWidth() {
      if (this.windowWidth <= 600) {
        this.cellphoneDisplay = true;
      } else {
        this.cellphoneDisplay = false;
      }
    }
  }
};
</script>

<style lang="scss" >
.settings {
  cursor: pointer;
  font-size: 2rem;
}

.btn {
  cursor: pointer;
}
</style>
