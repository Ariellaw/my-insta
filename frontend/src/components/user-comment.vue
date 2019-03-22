<template>
  <div class="comment-container" v-if="commentOwner && words && nickName">
    <div class="comment-container" v-if="commentTextArea">
      <textarea
        v-model="editedComment"
        type="text"
        placeholder="Edit your comment"
        @keyup.enter="editComment(editedComment)"
      ></textarea>
    </div>
    <span v-else class="comment">
      <span class="comment-owner bold-reg">{{nickName+": "}}</span>
      <span
        :class="{'hashtag':word[0]==='#'|| word[0]==='@'}"
        @click="findHashtagImages(word)"
        v-for="(word, index) in words"
        :key="index"
      >{{word+' '}}</span>
    </span>
    <span class="icons" v-if="viewedImage" :class="{'canEdit':commentOwner._id===loggedInUserId}">
      <i class="far fa-edit btn" @click="showTextArea()"></i>
      <i class="fas fa-times btn" @click="$emit('deleteComment', comment.id)"></i>
    </span>
    <span
      v-if="viewedImage"
      class="time"
      :class="{'CEtime':commentOwner._id===loggedInUserId}"
    >{{ comment.timeStamp | moment }}</span>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "comment",
  props: ["comment"],
  data() {
    return {
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96",
      loggedInUserName: "Ariella_wills1",
      commentOwner: null,
      nickName: null,
      words: null,
      commentTextArea: false,
      editedComment: null
    };
  },
  created() {
    this.$store
      .dispatch({ type: "getUserById", userId: this.comment.writerId })
      .then(res => {
        this.commentOwner = res;
        if (res._id === this.loggedInUserId) {
          this.nickName = "You";
        } else {
          this.nickName = res.userName;
        }
      });
    this.words = this.comment.comment.split(" ");
    this.$store.dispatch({
      type: "getLoggedInUser",
      userName: this.loggedInUserName
    });
  },
  filters: {
    moment: function(date) {
      return moment(date).fromNow();
    },
    isALink(word) {
      if (word[0] === "#") {
        return word.toUpperCase();
      } else return word;
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    viewedImage() {
      if (this.$route.params.imageId) {
        return true;
      } else return false;
    }
  },
  methods: {
    showTextArea() {
      this.commentTextArea = !this.commentTextArea;
    },
    findHashtagImages(word) {
      if (word[0] === "#") {
        this.$emit("searchHashtagImages", word);
        return;
      } else if (word[0] === "@") {
        this.$emit("goToUserProfile", word);
        return;
      } else return;
    },
    editComment(editedComment) {
      this.$emit("updateComment", {
        editedComment,
        commentId: this.comment.id
      });
      this.editedComment = null;
      this.commentTextArea = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.hashtag {
  text-decoration: none;
  font-weight: 600;
  color: blue;
  cursor: pointer;
}
.dots {
  color: darkgray;
}
.comment-container {
  background-color: #f2f3f5;
  display: block;
  margin-top: 1rem;
  border-radius: 2rem;
  width: 100%;
  // padding: 0.7rem;
  &:hover {
    .canEdit {
      display: inline;
    }
    .CEtime {
      display: none;
    }
  }

  .comment {
    width: fit-content;
  }
  .icons {
    color: darkgray;
    width: 6rem;
    display: none;
    float: right;
    i {
      margin-left: 0.5rem;
    }
  }
  .time {
    float: right;
  }
  .canEdit {
    display: none;
  }
  .CEtime {
    display: inline;
  }
}
textarea {
  width: 90%;
  border: none;
  font-size: 18px;
  margin: 5px;
  padding: 5px;
  font-family: monospace;
}
</style>


