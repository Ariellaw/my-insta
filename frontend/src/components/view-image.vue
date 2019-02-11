<template>
  <transition name="modal" v-if="chosenImage && postOwner">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-container">
          <img :src="chosenImage.image" class="currImage" alt>

          <div class="modal-body">
            <div class="user-info bold-reg">
              <img :src="postOwner.profilePic" alt class="profile-pic btn">
              <h3 class="btn">
                {{postOwner.userName}}
                <span
                  @click="emit('updateFollowers', postOwner._id)"
                  :class="{ 'following': following==='notFollowing', 'displayNone':following === 'loggedInUserPage'}"
                >{{followingStatus}}</span>
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
import userComment from "./comment.vue";
export default {
  name: "view-image",
  props: ["chosenImage"],
  data() {
    return {
      postOwner: null,
      following: "following"
    };
  },
  created() {
    //Todo - write a function that gets image and owner details
    // this.getImageById(this.postId);
    this.getViewedPostOwner(this.chosenImage.ownerId);
  },

    filters: {
      moment: function(date) {
        return moment(date).fromNow();
        //TODO - write date if over certain date - to be decided
      }
    },
  methods:{
    getViewedPostOwner(userId) {
      this.$store
        .dispatch({
          type: "getUserById",
          userId
        })
        .then(owner => {
          this.postOwner = owner;
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
    followingStatus() {
      if (this.loggedInUser._id === this.postOwner._id) {
        this.following = "loggedInUserPage";
        return "Nothing";
      } else if (this.loggedInUser.followees.includes(this.postOwner._id)) {
        this.following = "following";

        return "Following";
      } else {
        this.following = "notFollowing";

        return "Follow";
      }
    }
  },

  components: {
    userComment
  }
};
</script>

<style <style lang="scss" scoped>
.following {
  color: blue;
}
</style>

