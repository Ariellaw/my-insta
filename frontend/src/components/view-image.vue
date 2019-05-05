<template>
  <transition name="modal" v-if="imageOwner && loggedInUser && viewedImage">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-container pop-up-image" :class="{'displayVertical':displayVertically}">
          <div class="currImage" :style="{ backgroundImage: 'url(' + viewedImage.image + ')' }">
            <i
              class="fas fa-angle-left arrow btn"
              @click="$emit('goBack1Image')"
              v-if="albumLength>1"
            ></i>
            <i
              class="fas fa-angle-right arrow btn"
              @click="$emit('goForward1Img')"
              v-if="albumLength>1"
            ></i>
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
                @click="removeFollowers(viewedImage.ownerId)"
              >Following</span>
              <span
                v-else
                :class="followingStatusClass"
                class="follow"
                @click="addFollowers(viewedImage.ownerId)"
              >Follow</span>
              <p @click="goToLocationImages" class="image-location">{{viewedImage.location}}</p>
            </span>
          </div>
          <social-media
            v-if="socialMediaModule"
            :image="viewedImage"
            @close="socialMediaModule=false"
          ></social-media>
          <div class="comments" v-if="viewedImage.comments">
            <user-comment
              @goToUserProfile="goToUserProfile"
              @searchHashtagImages="searchHashtagImages"
              v-for="comment in viewedImage.comments"
              :comment="comment"
              :key="comment.id"
              @updateComment="updateComment"
              @deleteComment="deleteComment"
            ></user-comment>
            <div class="userTyping" v-if="typingUser">{{typingUser}} is typing....</div>
          </div>
          <div class="likes-and-followers">
            <div v-if="loggedInUser" class="icons">
              <i @click="removeUserLike" v-if="isLiked" class="fas fa-heart btn red"></i>
              <i @click="addUserLike" v-else class="far fa-heart btn"></i>

              <i class="fas fa-share-alt btn" @click="socialMediaModule=true"></i>
              <i
                v-if="inUserFavorites"
                @click="removeFromUserFavorites"
                class="fas fa-bookmark btn"
              ></i>
              <i v-else @click="addToUserFavorites" class="far fa-bookmark btn"></i>
            </div>
            <span class="column" v-if="followeesThatLiked && viewedImage.likes">
              <span class="namesOfLikes" v-if="followeesThatLiked.length===1">
                <i class="far fa-thumbs-up"></i>
                {{followeesThatLiked[0]}}
                <span
                  v-if="viewedImage.likes.length>1"
                >and {{viewedImage.likes.length-1}} others</span>like this
              </span>
              <span class="namesOfLikes" v-else-if="followeesThatLiked.length===2">
                <i class="far fa-thumbs-up"></i>
                {{followeesThatLiked[0]+" and "+followeesThatLiked[1]}}
                <span
                  v-if="viewedImage.likes.length>2"
                >and {{viewedImage.likes.length-2}} others</span>
                like this
              </span>
              <span class="namesOfLikes" v-else-if="followeesThatLiked.length > 2">
                <i class="far fa-thumbs-up"></i>
                {{followeesThatLiked[0]+" and "+followeesThatLiked[1]}}
                <span
                  v-if="viewedImage.likes.length>2"
                >and {{viewedImage.likes.length-2}} others</span> like this
              </span>

              <span
                v-else-if="followeesThatLiked.length===0"
                :class="{'visibilityNone':viewedImage.likes.length===0}"
                class="num-of-likes bold-reg"
              >{{viewedImage.likes.length}}&nbsp;Likes&nbsp;</span>
              <span class="time-posted">{{ viewedImage.timePosted | moment }}</span>
            </span>
          </div>
          <div class="add-a-comment">
            <textarea
              class="viewed-image-text-area"
              placeholder="Add a comment....."
              name
              @keydown="userIsTyping(loggedInUser.userName, viewedImage._id)"
              @keyup.enter="addUserComment(newComment, viewedImage._id, loggedInUser._id)"
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
  props: ["image", "albumLength"],
  data() {
    return {
      newComment: null,
      displayVertically: false,
      windowWidth: null,
      socialMediaModule: false
    };
  },

  created() {
    window.scrollTo(0, 0);
    if (window.innerWidth <= 1100) {
      this.displayVertically = true;
    }
  },

  filters: {
    moment: function(date) {
      return moment(date).fromNow();
    }
  },
  //TODO: make this page used the viewedImage and not other computed items - get rid of them
  //social media popup =
  //popup of all people that liked
  // write you if the person liking is you
  methods: {
    updateComment(data) {
      this.$socket.emit("commentEdited", {
        commentId: data.commentId,
        image: this.viewedImage,
        newComment: data.editedComment
      });

      this.$store.dispatch({
        type: "editComment",
        commentId: data.commentId,
        imageId: this.viewedImage._id,
        newComment: data.editedComment
      });
    },
    deleteComment(commentId) {
      this.$socket.emit("commentDeleted", {
        commentId,
        image: this.viewedImage
      });

      this.$store.dispatch({
        type: "deleteComment",
        commentId,
        imageId: this.viewedImage._id
      });
    },
    loadImage() {
      this.$store
        .dispatch({ type: "getImageById", imageId: this.$route.params.image })
        .then(image => {
          this.getViewedImageOwner(image.ownerId);
          this.$store.dispatch({ type: "setViewedImage", image });
          this.$store.dispatch({
            type: "getViewedImageFollowers",
            image,
            loggedInUser: this.loggedInUser
          });
        })
        .catch(err => {
          console.log("err", err);
          this.$router.push({ name: "login" });
        });
    },
    userIsTyping(userName, imageId) {
      this.$socket.emit("typing", { userName, imageId });
    },
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
        image: this.viewedImage,
        user: this.loggedInUser
      });

      this.$store
        .dispatch({
          type: "addUserLike",
          imageId: this.viewedImage._id,
          userId: this.loggedInUser._id
        })
        .catch(err => {
          console.log("addUserLike err", err);
          this.$router.push({ name: "login" });
        });
    },
    removeUserLike() {
      this.$socket.emit("likeRemoved", {
        image: this.viewedImage,
        user: this.loggedInUser
      });

      this.$store
        .dispatch({
          type: "removeUserLike",
          imageId: this.viewedImage._id,
          userId: this.loggedInUser._id,
          userName: this.loggedInUser.userName
        })
        .catch(err => {
          console.log("removeUserLike err", err);
          this.$router.push({ name: "login" });
        });
    },
    getViewedImageOwner(userId) {
      this.$store
        .dispatch({
          type: "getViewedImageOwner",
          userId
        })
        .catch(err => {
          console.log("getViewedImageOwner err", err);
          this.$router.push({ name: "login" });
        });
    },

    addUserComment(comment, imageId, writerId) {
      this.$socket.emit("commentAdded", {
        comment,
        image: this.viewedImage,
        writerId
      });

      this.$store
        .dispatch({
          type: "addUserComment",
          comment,
          imageId,
          writerId
        })
        .catch(err => {
          console.log("addUserComment err", err);
          this.$router.push({ name: "login" });
        });
      // .then(comments => {
      // });
      this.newComment = null;
    },

    addToUserFavorites() {
      this.$store
        .dispatch({
          type: "addToUserFavorites",
          imageId: this.image._id
        })
        .catch(err => {
          console.log("addToUserFavorites err", err);
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
          console.log("removeFromUserFavorites err", err);
          this.$router.push({ name: "login" });
        });
    },
    goToImageOwnerProfile() {
      var userName = this.imageOwner.userName;
      this.$router.push({
        name: "user-profile",
        params: { userName, image: null }
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
    followeesThatLiked() {
      var followees = this.$store.getters.followeesThatLiked;
      var idx = followees.findIndex(
        followee => followee === this.loggedInUser.userName
      );
      if (idx > -1) {
        followees[idx] = "You";
      }
      //TODO - "You should always appear first"
      return followees;
    },
    viewedImage() {
      return this.$store.getters.viewedImage;
    },
    typingUser() {
      return this.$store.getters.isTyping;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    imageOwner() {
      return this.$store.getters.viewedImageOwner;
    },
    isFollowing() {
      if (this.loggedInUser.followees) {
        return this.loggedInUser.followees.includes(this.imageOwner._id);
      }
    },
    followingStatusClass() {
      return {
        displayNone: this.loggedInUser._id === this.imageOwner._id
      };
    },
    inUserFavorites() {
      if (this.loggedInUser.favorites) {
        return this.loggedInUser.favorites.includes(this.viewedImage._id);
      }
    },
    isLiked() {
      if (this.viewedImage.likes) {
        return this.viewedImage.likes.includes(this.loggedInUser._id);
      }
    }
  },
  mounted() {
    this.loadImage();
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth <= 1100) {
          this.displayVertically = true;
        } else {
          this.displayVertically = false;
        }
      });
    });
  },
  destroyed() {
    this.$store.dispatch({ type: "setViewedImage", image: null });
  },
  watch: {
    $route() {
      if (this.$route.params.image) {
        this.loadImage();
      }
    }
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

