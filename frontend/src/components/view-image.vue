<template>
  <transition name="modal" v-if="image && imageOwner && loggedInUser && viewedImage">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-container pop-up-image" :class="{'displayVertical':displayVertically}">
          <div class="currImage" :style="{ backgroundImage: 'url(' + viewedImage.image + ')' }">
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
              
              <i class="fas fa-share-alt btn"></i>
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
                {{followeesThatLiked[0].userName}} like this
              </span>
              <span class="namesOfLikes" v-else-if="followeesThatLiked.length===2">
                <i class="far fa-thumbs-up"></i>
                {{followeesThatLiked[0].userName+" and "+followeesThatLiked[1].userName}} like this
              </span>
              <span class="namesOfLikes" v-else-if="followeesThatLiked.length > 2">
                <i class="far fa-thumbs-up"></i>
                {{followeesThatLiked[0].userName+" and "+followeesThatLiked[1].userName}} and {{followeesThatLiked.length-2}} others like this
              </span>
              
              <span
                v-else
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
              @keydown="userIsTyping(loggedInUserName, viewedImage._id)"
              @keyup.enter="addUserComment(newComment, viewedImage._id, loggedInUserId)"
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

export default {
  name: "view-image",
  props: ["image"],
  data() {
    return {
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96",
      loggedInUserName: "Ariella_wills1",
      newComment: null,
      displayVertically: false,
      windowWidth: null,
      followeesThatLiked: null
    };
  },

  created() {
    window.scrollTo(0, 0);
    this.loadImage();

    this.$store
      .dispatch({
        type: "getLoggedInUser",
        userName: this.loggedInUserName
      })
      .then(() => this.namesOfLikes());
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
        newComment:data.editedComment
      });

      this.$store.dispatch({
        type: "editComment",
        commentId:data.commentId,
        imageId: this.image._id,
        newComment:data.editedComment
      }).then(()=> this.$router.go())
    },
    deleteComment(commentId) {
      this.$socket.emit("commentDeleted", {
        commentId,
        image: this.viewedImage
      });

      this.$store.dispatch({
        type: "deleteComment",
        commentId,
        imageId: this.image._id
      });
    },

    namesOfLikes() {
      var ids = [];
      var followees = this.loggedInUser.followees;
      followees.forEach(followeeId => {
        if (
          this.viewedImage.likes.findIndex(likeId => likeId === followeeId) !==
          -1
        ) {
          ids.push(followeeId);
        }
      });
      this.$store
        .dispatch({ type: "getUserNamesById", ids })
        .then(userNames => {
          this.followeesThatLiked = userNames;
        });
    },
    loadImage() {
      this.$store
        .dispatch({ type: "getImageById", imageId: this.$route.params.image })
        .then(image => {
          this.getViewedImageOwner(image.ownerId);
          this.$store.dispatch({ type: "setViewedImage", image });
        });
    },
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
    viewedImage() {
      return this.$store.getters.viewedImage;
    },
    typingUser() {
      return this.$store.getters.isTyping;
    },
    // imageComments() {
    //   return this.$store.getters.viewedImage.comments;
    // },
    // likes() {
    //   return this.$store.getters.viewedImage.likes;
    // },
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
      if (this.viewedImage.likes) {
        return this.viewedImage.likes.includes(this.loggedInUser._id);
      }
    }
  },
  mounted() {
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
  watch: {
    $route() {
      this.loadImage();
    },
    viewedImage() {
      if (this.viewedImage.likes) {
        this.namesOfLikes();
      }
    }
  },
  components: {
    userComment
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

