<template>
  <div class="comment-container" v-if="commentOwner && words && comment">
    <div class="comment-container" v-if="commentTextArea">
      <textarea
        v-model="editedComment"
        type="text"
        placeholder="Edit your comment"
        @keyup.enter="editComment(editedComment)"
      ></textarea>
    </div>
    <span v-else class="comment">
      <span class="comment-owner bold-reg">{{ nickName + ": " }}</span>
      <span
        :class="{ hashtag: word[0] === '#' || word[0] === '@' }"
        @click="findHashtagImages(word)"
        v-for="(word, index) in words"
        :key="index"
      >{{ word + " " }}</span>
    </span>
    <span
      class="icons"
      v-if="viewedImage && loggedInUser"
      :class="{ canEdit: comment.writerId === loggedInUser._id }"
    >
      <i class="far fa-edit" @click="showTextArea()"></i>
      <i class="fas fa-times" @click="$emit('deleteComment', comment.id)"></i>
    </span>
    <span v-if="viewedImage" class="time" :class="CEtime">
      {{
      comment.timeStamp | moment
      }}
    </span>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "comment",
  props: ["comment"],
  data() {
    return {
      commentOwner: null,
      words: null,
      commentTextArea: false,
      editedComment: null,
      nickName:null
    };
  },
  created() {
    this.getNickName(this.comment.writerId);
    if (this.comment.comment) {
      this.words = this.comment.comment.split(" ");
    }
  },
  mounted() {

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
    CETime() {
      if (this.loggedInUser) {
        return this.commentOwner._id === this.loggedInUser._id;
      }
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    viewedImage() {
      if (this.$route.params.image) {
        return true;
      } else return false;
    }
  },
  methods: {
    getNickName(writerId) {
      if (writerId) {
        this.$store
          .dispatch({ type: "getUserById", userId: writerId })
          .then(res => {
            this.commentOwner = res;
            this.nickName =
              this.loggedInUser &&
              this.commentOwner._id === this.loggedInUser._id
                ? "You"
                : this.commentOwner.firstName;
          });
      }
    },
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
}
.dots {
  color: darkgray;
}
.comment-container {
  background-color: #f2f3f5;
  display: block;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  border-radius: 2rem;
  width: 100%;
  cursor: pointer;
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
