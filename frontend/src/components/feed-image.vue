<template>
  <div class="modal-container feed-image displayVertical" v-if="image && imageOwner" >
    <div class="currImage btn" :style="{ backgroundImage: 'url(' + image.image + ')' }" @click="$emit('displayFeedImage', image)"></div>


    <div class="user-info bold-reg">
      <img @click="goToImageOwnerProfile" :src="imageOwner.profilePic" alt class="profile-pic btn">
      <span class="btn">
        <span @click="goToImageOwnerProfile">{{imageOwner.userName}} &nbsp;&nbsp;</span>
        <span
          v-if="isFollowing"
          :class="followingStatusClass"
          @click="removeFollowers(image.ownerId)"
        >Following</span>
        <span
          v-else
          :class="followingStatusClass"
          class="follow"
          @click="addFollowers(image.ownerId)"
        >Follow</span>
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
    <div class="likes-and-followers">
      <div v-if="loggedInUser" class="icons">
        <i @click="removeUserLike" v-if="isLiked" class="fas fa-heart btn red"></i>
        <i @click="addUserLike" v-else class="far fa-heart btn"></i>
        
        <i @click="displaySocialMedia=true" class="fas fa-share-alt btn"></i>
        <social-media @close="displaySocialMedia=false" v-if="displaySocialMedia"></social-media>

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
        v-on:keyup.enter="addUserComment(comment, image._id, loggedInUserId)"
        v-model="comment"
      ></textarea>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import userComment from "./user-comment.vue";
export default {
  props: ["image"],
  data() {
    return {
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96",
      loggedInUserName: "Ariella_wills1",
      comment: null,
      imageComments: this.image.comments,
      displayVertically: false,
      likes: this.image.likes,
      displaySocialMedia: false
    };
  },
  created() {
    this.getViewedImageOwner(this.image.ownerId);
  },

  filters: {
    moment: function(date) {
      return moment(date).fromNow();
    }
  },
  methods: {
    addFollowers(followeeId) {
      this.$store.dispatch({ type: "addFollowers", followeeId });
    },
    removeFollowers(followeeId) {
      this.$store.dispatch({ type: "removeFollowers", followeeId });
    },
    addUserLike() {
      this.$store
        .dispatch({
          type: "addUserLike",
          imageId: this.image._id,
          userId: this.loggedInUser._id
        })
        .then(likes => (this.likes = likes));
    },
    removeUserLike() {
      this.$store
        .dispatch({
          type: "removeUserLike",
          imageId: this.image._id,
          userId: this.loggedInUser._id
        })
        .then(likes => (this.likes = likes));
    },
    getViewedImageOwner(userId) {
      this.$store.dispatch({
        type: "getViewedImageOwner",
        userId
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
        });
    },
    addToUserFavorites() {
      this.$store.dispatch({
        type: "addToUserFavorites",
        imageId: this.image._id
      });
    },
    removeFromUserFavorites() {
      this.$store.dispatch({
        type: "removeFromUserFavorites",
        imageId: this.image._id
      });
    },
    goToImageOwnerProfile() {
      var userName = this.imageOwner.userName;
      this.$router.push({ name: "user-profile", params: { userName } });
      // this.$router.go();
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
    imageOwner() {
      return this.$store.getters.viewedImageOwner;
    },
    isFollowing() {
      return this.loggedInUser.followees.includes(this.imageOwner._id);
    },
    followingStatusClass() {
      return {
        displayNone: this.loggedInUserId === this.imageOwner._id
      };
    },
    inUserFavorites() {
      return this.loggedInUser.favorites.includes(this.image._id);
    },
    isLiked() {
      if (this.likes) {
        return this.likes.includes(this.loggedInUser._id);
      }
    }
  },

  components: {
    userComment
  }
};
</script>

<style <style lang="scss" scoped>
.follow {
  color: blue;
}
</style>
