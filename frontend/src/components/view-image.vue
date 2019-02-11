<template>
  <transition name="modal" v-if="chosenImage">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-container">
          <img :src="chosenImage.image" class="currImage" alt>

          <div class="modal-body">
            <div class="user-info bold">
              <img :src="postOwner.profilePic" alt class="profile-pic">
              {{postOwner.userName}}
            </div>
           <div class="comments">
             <user-comment v-for="comment in chosenImage.comments"  :comment="comment" ></user-comment>
           </div>
            <div class="likes-and-followers">
              <div class="icons">
                <i class="far fa-heart btn btn"></i>
                <i class="far fa-comment btn"></i>
                <i class="fas fa-share-alt btn"></i>
                <i class="far fa-bookmark btn"></i>
              </div>
              <p class="num-of-likes bold">{{chosenImage.likes.length+" "}}Likes</p>
              <p
                class="time-posted"
              >{{ chosenImage.timePosted | moment }}</p>
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
import userComment from "./comment.vue"
export default {
  name: "view-image",
  props: ["chosenImage"],
  data() {
    return {
      postOwner: {
        firstName: null,
        lastName: null,
        profilePic: null,
        userName: null
      }
    };
  },
  created() {
    console.log(this.chosenImage);
    //Todo - write a function that gets image and owner details
    // this.getImageById(this.postId);
    this.getViewedPostOwner();
  },
  computed: {
    viewedPost() {
      return this.$store.getters.viewedPost;
    }
  },
  filters: {
    moment: function(date) {
      return moment(date)
        .fromNow();
  //TODO - write date if over certain date - to be decided

    }
  },
  methods: {
    // getImageById(postId) {
    //   this.$store.dispatch({ type: "getPostById", id: postId });
    // },
    getViewedPostOwner() {
      this.$store
        .dispatch({
          type: "getUserById",
          userId: this.chosenImage.ownerId
        })
        .then(owner => {
          console.log("cmp owner", owner);
          this.postOwner.firstName = owner.firstName;
          this.postOwner.lastName = owner.lastName;
          this.postOwner.profilePic = owner.profilePic;
          this.postOwner.userName = owner.userName;
        });
    }
  },
  components:{
    userComment
  }
};
</script>

<style <style lang="scss" scoped>

</style>

