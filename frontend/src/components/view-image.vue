<template>
  <transition name="modal" v-if="image && imageOwner && loggedInUser">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-container pop-up-image" :class="{'displayVertical':displayVertically}">
          <div class="currImage" :style="{ backgroundImage: 'url(' + image.image + ')' }">
            <i class="fas fa-angle-left arrow btn" @click="$emit('goBack1Image')"></i>
            <i class="fas fa-angle-right arrow btn" @click="$emit('goForward1Img')"></i>
          </div>
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
          <div class="comments" v-if="imageComments">
            <user-comment
              @goToUserProfile="goToUserProfile"
              @searchHashtagImages="searchHashtagImages"
              v-for="(comment,idx) in imageComments"
              :comment="comment"
              :key="idx"
            ></user-comment>
            <div class="userTyping" v-if="typingUser">{{typingUser}} is typing....</div>
          </div>
          <div class="likes-and-followers">
            <div v-if="loggedInUser" class="icons">
              <i @click="removeUserLike" v-if="isLiked" class="fas fa-heart btn red"></i>
              <i @click="addUserLike" v-else class="far fa-heart btn"></i>
              
              <i @click="displaySocialMedia=true" class="fas fa-share-alt btn"></i>
              <social-media @close="displaySocialMedia=false" v-if="displaySocialMedia"></social-media>

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
              <span class="time-posted">{{ image.timePosted | moment }}</span>
            </span>
          </div>
          <div class="add-a-comment">
            <textarea
              class="viewed-image-text-area"
              placeholder="Add a comment....."
              name
              @keydown="userIsTyping(loggedInUserName, image._id)"
              @keyup.enter="addUserComment(newComment, image._id, loggedInUserId)"
              v-model="newComment"
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
import socialMedia from "./social-media.vue";

export default {
  name: "view-image",
  props: ["image"],
  data() {
    return {
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96",
      loggedInUserName: "Ariella_wills1",
      newComment: null,
      displayVertically: false,
      displaySocialMedia: false,
      windowWidth: null,
      socketMessage: "",
      isConnected: false
    };
  },

  created() {
    this.getViewedImageOwner(this.image.ownerId);
    this.$store.dispatch({ type: "setViewedImage", image: this.image });

    this.$store.dispatch({
      type: "getLoggedInUser",
      userName: this.loggedInUserName
    });
    if (window.innerWidth <= 1100) {
      this.displayVertically = true;
    }
  },

  filters: {
    moment: function(date) {
      return moment(date).fromNow();
    }
  },
  methods: {
    userIsTyping(userName, imageId) {
      this.$socket.emit("typing", { userName, imageId });
    },
    addFollowers(followeeId) {
      this.$store.dispatch({ type: "addFollowers", followeeId });
    },
    removeFollowers(followeeId) {
      this.$store.dispatch({ type: "removeFollowers", followeeId });
    },
    addUserLike() {
      this.$socket.emit("likeAdded", {
        imageId: this.image._id,
        userId: this.loggedInUser._id
      });

      this.$store.dispatch({
        type: "addUserLike",
        imageId: this.image._id,
        userId: this.loggedInUser._id
      });
    },
    removeUserLike() {
      this.$socket.emit("likeRemoved", {
        imageId: this.image._id,
        userId: this.loggedInUser._id
      });

      this.$store.dispatch({
        type: "removeUserLike",
        imageId: this.image._id,
        userId: this.loggedInUser._id
      });
    },
    getViewedImageOwner(userId) {
      this.$store.dispatch({
        type: "getViewedImageOwner",
        userId
      });
    },

    addUserComment(comment, imageId, writerId) {
      this.$socket.emit("commentAdded", { comment, imageId, writerId });

      this.$store
        .dispatch({
          type: "addCommentToViewedImg",
          comment,
          imageId,
          writerId
        })
        .then(comments => {
          this.newComment = null;
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
    }
  },
  computed: {
    typingUser() {
      return this.$store.getters.isTyping;
    },
    imageComments() {
      return this.$store.getters.viewedImage.comments;
    },
    likes() {
      return this.$store.getters.viewedImage.likes;
    },
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
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth <= 1100) {
          this.displayVertically = true;
        }
      });
    });
  },
  components: {
    userComment,
    socialMedia
  }
};
</script>

 <style lang="scss" scoped>
.follow {
  color: blue;
}
.userTyping {
  width: 100%;
  color: darkgray;
  font-weight: bold;
}
</style>

