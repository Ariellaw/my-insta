<template>
  <transition name="modal" v-if="chosenImage && imageOwner">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-container">
          <img :src="chosenImage.image" class="currImage" alt>

          <div class="modal-body">
            <div class="user-info bold-reg">
              <img :src="imageOwner.profilePic" alt class="profile-pic btn">
              <h3 class="btn">
                {{imageOwner.userName}}
                <span
                  v-if="isFollowing"
                  :class="followingStatusClass"
                  @click="removeFollowers(chosenImage.ownerId)"
                >Following</span>
                <span
                  v-else
                  :class="followingStatusClass"
                  class="follow"
                  @click="addFollowers(chosenImage.ownerId)"
                >Follow</span>
              </h3>
            </div>
            <div class="comments">
              <user-comment v-for="comment in chosenImage.comments" :comment="comment"></user-comment>
            </div>
            <div class="likes-and-followers">
              <div class="icons">
                <i class="far fa-heart btn btn"></i>
                <i class="far fa-comment btn"></i>
                <i class="fas fa-share-alt btn"></i>
                <i class="far fa-bookmark btn"></i>
              </div>
              <p class="num-of-likes bold-reg">{{chosenImage.likes.length+" "}}Likes</p>
              <p class="time-posted">{{ chosenImage.timePosted | moment }}</p>
            </div>
            <div class="add-a-comment">
              <textarea placeholder="Add a comment....." name id></textarea>
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
  props: ["chosenImage"],
  data() {
    return {
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96"
    };
  },
  created() {
    this.getViewedImageOwner(this.chosenImage.ownerId);
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
    }
  },
  computed: {
    viewedPost() {
      return this.$store.getters.viewedPost;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    imageOwner() {
      return this.$store.getters.viewedImageOwner;
    },
    isFollowing() {
      if (this.loggedInUser.followees.includes(this.imageOwner._id)) {
        return true;
      } else return false;
    },
    followingStatusClass() {
      return {
        displayNone: this.loggedInUserId === this.imageOwner._id
      };
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

