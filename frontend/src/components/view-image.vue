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
            <div class="user-info">
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
              <p class="num-of-likes">{{chosenImage.likes.length+" "}}Likes</p>
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  color: black;
  font-size: 1.5rem;
  width: 1100px;
  max-width: 95vw;
  height: 700px;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-default-button {
  float: right;
  background-color: rgba(0, 0, 0, 0);
  height: 70px;
  width: 70px;
  border: 1px solid rgba(0, 0, 0, 0);
  color: white;
  font-size: 5rem;
  position: relative;
}

.currImage {
  width: 65%;
  height: auto;
  object-fit: cover;
}
.modal-body {
  height: 100%;
  width: 35%;
  padding: 1rem;
  div {
    display: flex;
    padding: 0.5rem;
  }
  .user-info {
    font-family: monst-bold;
    padding: 1rem;
    height: 10%;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid lightgray;

    .profile-pic {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      flex-direction: row;
      margin: 1rem;
    }
  }
  .comments {
    height: 63%;
    border-bottom: 1px solid lightgray;
    flex-direction: column;
    overflow-y: auto;

  }
  .likes-and-followers {
    height: 15%;
    border-bottom: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    .icons {
      width: 100%;
      margin-bottom: 0.5rem;

      i {
        font-size: 2.5rem;
        margin: 0.5rem;
      }
      .fa-bookmark {
        float: right;
        //ToDo - put on right side of box
      }
    }
    .num-of-likes {
      font-family: monst-bold;
      margin-bottom: 0.5rem;
    }
    .time-posted {
      color: darkgray;
    }
  }
  .add-a-comment {
    height: 12%;
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      resize: none;
    }
  }
  // }
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

