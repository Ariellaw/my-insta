<template>
  <transition name="modal" v-if="viewedImage && imageOwner">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-container" :class="{'displayVertical':displayVertically}">
          <img :src="viewedImage.image" class="currImage" alt>

          <div class="user-info bold-reg">
            <img
              @click="goToImageOwnerProfile"
              :src="imageOwner.profilePic"
              alt
              class="profile-pic btn"
            >
            <span class="btn">
              <span @click="goToImageOwnerProfile">{{imageOwner.userName}} &nbsp;&nbsp;</span>
              <span
                v-if="isFollowing"
                :class="followingStatusClass"
                @click="removeFollowers(viewedImage.ownerId)"
              >Following</span>
              <span
                v-else
                :class="followingStatusClass"
                class="follow"
                @click="addFollowers(viewedImage.ownerId)"
              >Follow</span>
              <p class="image-location">{{viewedImage.location}}</p>
            </span>
          </div>
          <div class="comments">
            <user-comment
              v-for="comment in viewedImageComments"
              :comment="comment"
              :key="comment.id"
            ></user-comment>
          </div>
          <div class="likes-and-followers">
            <div v-if="loggedInUser" class="icons">
              <i @click="removeUserLike" v-if="isLiked" class="fas fa-heart btn red"></i>
              <i @click="addUserLike" v-else class="far fa-heart btn"></i>
              
              <i @click="displaySocialMedia=true" class="fas fa-share-alt btn"></i>
              <social-media @close="displaySocialMedia=false"  v-if="displaySocialMedia"></social-media>
              
              <i
                v-if="inUserFavorites"
                @click="removeFromUserFavorites"
                class="fas fa-bookmark btn"
              ></i>
              <i v-else @click="addToUserFavorites" class="far fa-bookmark btn"></i>
            </div>
            <span class="column">
              <span
                :class="{'visibilityNone':likes.length===0}"
                class="num-of-likes bold-reg"
              >{{likes.length}}&nbsp;Likes&nbsp;</span>
              <span class="time-posted">{{ viewedImage.timePosted | moment }}</span>
            </span>
          </div>
          <div class="add-a-comment">
            <textarea
              class="viewed-image-text-area"
              placeholder="Add a comment....."
              name
              v-on:keyup.enter="addUserComment(userComment, viewedImage._id, loggedInUserId)"
              v-model="userComment"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from "moment";
import userComment from "./user-comment.vue";
import socialMedia from "./social-media.vue"
export default {
  name: "view-image",
  props: ["viewedImage"],
  data() {
    return {
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96",
      userComment: null,
      viewedImageComments: this.viewedImage.comments,
      displayVertically: false,
      likes: this.viewedImage.likes,
      displaySocialMedia:false
    };
  },
  created() {
    this.getViewedImageOwner(this.viewedImage.ownerId);
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
          imageId: this.viewedImage._id,
          userId: this.loggedInUser._id
        })
        .then(likes => (this.likes = likes));
    },
    removeUserLike() {
      this.$store
        .dispatch({
          type: "removeUserLike",
          imageId: this.viewedImage._id,
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

    addUserComment(userComment, imageId, commentWriterId) {
      this.$store
        .dispatch({
          type: "addUserComment",
          userComment,
          imageId,
          commentWriterId
        })
        .then(comments => {
          this.viewedImageComments = comments;
          this.userComment = null;
        });
    },
    addToUserFavorites() {
      this.$store.dispatch({
        type: "addToUserFavorites",
        imageId: this.viewedImage._id
      });
    },
    removeFromUserFavorites() {
      this.$store.dispatch({
        type: "removeFromUserFavorites",
        imageId: this.viewedImage._id
      });
    },
    goToImageOwnerProfile() {
      var imageOwnerId = this.imageOwner._id;
      this.$router.push(`/user/${imageOwnerId}`);
      this.$router.go();
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
      return this.loggedInUser.favorites.includes(this.viewedImage._id);
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

