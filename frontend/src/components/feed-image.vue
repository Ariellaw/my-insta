<template>
  <div
    class="modal-container feed-image displayVertical"
    v-if="image && imageOwner && loggedInUser"
  >
    <div
      class="currImage btn"
      :style="{ backgroundImage: 'url(' + image.image + ')' }"
      @click="$emit('displayFeedImage', image)"
    ></div>

    <div class="user-info bold-reg" v-if="loggedInUser">
      <img @click="goToImageOwnerProfile" :src="imageOwner.profilePic" alt class="profile-pic btn">
      <span class="btn">
        <span @click="goToImageOwnerProfile">{{imageOwner.userName}} &nbsp;&nbsp;</span>
        <!-- <span
          v-if="isFollowing"
          :class="followingStatusClass"
          @click="removeFollowers(image.ownerId)"
        >Following</span>-->
        <!-- <span
          v-else
          :class="followingStatusClass"
          class="follow"
          @click="addFollowers(image.ownerId)"
        >Follow</span>-->
        <p @click="goToLocationImages" class="image-location">{{image.location}}</p>
      </span>
    </div>
    <div class="comments">
      <user-comment
        @goToUserProfile="goToUserProfile"
        @searchHashtagImages="searchHashtagImages"
        v-for="comment in imageComments"
        :comment="comment"
        :key="comment.id"
      ></user-comment>
    </div>
    <social-media v-if="socialMediaModule" :image="image" @close="socialMediaModule=false"></social-media>
    <div class="likes-and-followers" v-if="likes">
      <div class="icons">
        <i @click="removeUserLike" v-if="isLiked" class="fas fa-heart btn red"></i>
        <i @click="addUserLike" v-else class="far fa-heart btn"></i>

        <i class="fas fa-share-alt btn" @click="socialMediaModule=true"></i>

        <i v-if="inUserFavorites" @click="removeFromUserFavorites" class="fas fa-bookmark btn"></i>
        <i v-else @click="addToUserFavorites" class="far fa-bookmark btn"></i>
      </div>
      <span class="column">
        <span
          :class="{'visibilityNone':likes.length===0}"
          class="num-of-likes bold-reg"
        >{{likes.length}}&nbsp;Likes&nbsp;</span>
        <span class="time-posted">{{ image.timePosted | moment }}</span>
      </span>
    </div>
    <div class="add-a-comment">
      <textarea
        class="viewed-image-text-area"
        placeholder="Add a comment....."
        name
        v-on:keyup.enter="addUserComment(comment, image._id, loggedInUser._id)"
        v-model="comment"
      ></textarea>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import userComment from "./user-comment.vue";
import socialMedia from "./social-media.vue";
export default {
  props: ["image"],
  data() {
    return {
      comment: null,
      imageComments: this.image.comments,
      displayVertically: false,
      likes: this.image.likes,
      socialMediaModule: false,
      imageOwner: null
    };
  },
  created() {
    this.getImageOwner(this.image.ownerId);
  },

  filters: {
    moment: function(date) {
      return moment(date).fromNow();
    }
  },
  methods: {
    addFollowers(followeeId) {
      this.$store.dispatch({ type: "addFollowers", followeeId }).catch(err => {
        console.log("addFollowers err", err);
        this.$router.push({ name: "login" });
      });
    },
    removeFollowers(followeeId) {
      this.$store
        .dispatch({ type: "removeFollowers", followeeId })
        .catch(err => {
          console.log("removeFollowers err", err);
          this.$router.push({ name: "login" });
        });
    },
    addUserLike() {
         this.$socket.emit("likeAdded", {
        image: this.image,
        user: this.loggedInUser
      });

      this.$store
        .dispatch({
          type: "addUserLike",
          imageId: this.image._id,
          userId: this.loggedInUser._id
        })
        .then(likes => {
          this.likes = likes;
        })
        .catch(err => {
          console.log("addLike err", err);
          this.$router.push({ name: "login" });
        });
    },
    removeUserLike() {
      this.$socket.emit("likeRemoved", {
        image: this.image,
        user: this.loggedInUser
      });
      this.$store
        .dispatch({
          type: "removeUserLike",
          imageId: this.image._id,
          userId: this.loggedInUser._id
        })
        .then(likes => (this.likes = likes))
        .catch(err => {
          console.log("removelike err", err);
          this.$router.push({ name: "login" });
        });
    },
    getImageOwner(userId) {
      this.$store
        .dispatch({
          type: "getUserById",
          userId
        })
        .then(user => {
          this.imageOwner = user;
        });
    },
    goToLocationImages() {
      this.$router.push(
        `/search/locations/${this.image.location.toLowerCase()}`
      );
    },
    searchHashtagImages(word) {
      word = word.slice(1);
      this.$router.push(`/search/hashtag/${word.toLowerCase()}`);
      this.$router.go();
    },

    addUserComment(comment, imageId, writerId) {
      this.$socket.emit("commentAdded", {
        comment,
        image: this.image,
        writerId
      });
      this.$store
        .dispatch({
          type: "addUserComment",
          comment,
          imageId,
          writerId
        })
        .then(comments => {
          this.imageComments = comments;
          this.comment = null;
        })
        .catch(err => {
          console.log("addUserComment err", err);
          this.$router.push({ name: "login" });
        });
    },
    goToUserProfile(word) {
      this.$store
        .dispatch({ type: "getUserByUsername", userName: word })
        .then(res => {
          if (res !== null) {
            this.$router.push({
              name: "user-profile",
              params: { userName: res.userName }
            });
            this.$router.go();
          } else {
            return;
          }
        })
        .catch(err => {
          console.log("hashtag go to profile err", err);
          this.$router.push({ name: "login" });
        });
    },
    addToUserFavorites() {
      this.$store
        .dispatch({
          type: "addToUserFavorites",
          imageId: this.image._id
        })
        .catch(err => {
          console.log("favs err", err);
          this.$router.push({ name: "login" });
        });
    },
    removeFromUserFavorites() {
      this.$store
        .dispatch({
          type: "removeFromUserFavorites",
          imageId: this.image._id
        })
        .catch(err => {
          console.log("favs err", err);
          this.$router.push({ name: "login" });
        });
    },
    goToImageOwnerProfile() {
      var userName = this.imageOwner.userName;
      this.$router.push({ name: "user-profile", params: { userName } });
    },
    goToLocationImages() {
      this.$router.push(
        `/search/locations/${this.image.location.toLowerCase()}`
      );
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    // imageOwner() {
    //   return this.$store.getters.viewedImageOwner;
    // },
    // isFollowing() {
    //   if (this.loggedInUser.followees) {
    //     return this.loggedInUser.followees.includes(this.imageOwner._id);
    //   }
    // },
    // followingStatusClass() {
    //   return {
    //     displayNone: this.loggedInUser._id === this.imageOwner._id
    //   };
    // },
    inUserFavorites() {
      if (this.loggedInUser.favorites) {
        return this.loggedInUser.favorites.includes(this.image._id);
      }
    },
    isLiked() {
      if (this.likes) {
        return this.likes.includes(this.loggedInUser._id);
      }
    }
  },

  components: {
    userComment,
    socialMedia
  }
};
</script>

<style <style lang="scss" scoped>
.follow {
  color: blue;
}
</style>
