<template>
  <transition name="modal" v-if="viewedImage && imageOwner">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-container">
          <img :src="viewedImage.image" class="currImage" alt>

          <div class="modal-body">
            <div class="user-info bold-reg">
              <img
                @click="goToImageOwnerProfile"
                :src="imageOwner.profilePic"
                alt
                class="profile-pic btn"
              >
              <h3 class="btn">
                <span @click="goToImageOwnerProfile">{{imageOwner.userName}}</span>
                <h3
                  v-if="isFollowing"
                  :class="followingStatusClass"
                  @click="removeFollowers(viewedImage.ownerId)"
                >Following</h3>
                <h3
                  v-else
                  :class="followingStatusClass"
                  class="follow"
                  @click="addFollowers(viewedImage.ownerId)"
                >Follow</h3>
              </h3>
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
                <i class="far fa-heart btn btn"></i>
                <i class="far fa-comment btn"></i>
                <i class="fas fa-share-alt btn"></i>
                <i
                  v-if="inUserFavorites"
                  @click="removeFromUserFavorites"
                  class="fas fa-bookmark btn"
                ></i>
                <i v-else @click="addToUserFavorites" class="far fa-bookmark btn"></i>
              </div>
              <p class="num-of-likes bold-reg">{{viewedImage.likes.length+" "}}Likes</p>
              <p class="time-posted">{{ viewedImage.timePosted | moment }}</p>
            </div>
            <div class="add-a-comment">
              <textarea
                placeholder="Add a comment....."
                name
                v-on:keyup.enter="addUserComment(userComment, viewedImage._id, loggedInUserId)"
                v-model="userComment"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <!-- </script> -->
</template>

<script>
import moment from "moment";
import userComment from "./user-comment.vue";
export default {
  name: "view-image",
  props: ["viewedImage"],
  data() {
    return {
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96",
      userComment: null,
      viewedImageComments: this.viewedImage.comments
    };
  },
  created() {
    this.getViewedImageOwner(this.viewedImage.ownerId);
  },

  filters: {
    moment: function(date) {
      return moment(date).fromNow();
      //TODO - write date if over certain date - to be decided
    }
  },
  methods: {
    addFollowers(followeeId) {
      this.$store.dispatch({ type: "addFollowers", followeeId });
    },
    removeFollowers(followeeId) {
      this.$store.dispatch({ type: "removeFollowers", followeeId });
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
      console.log("cmp add", this.viewedImage._id);
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
    }
    // viewedImageComments() {
    //   return this.$store.getters.viewedImageComments;
    // }
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

