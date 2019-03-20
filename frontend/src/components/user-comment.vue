<template>
  <div class="comment-container">
    <span class="comment" v-if="commentOwner && words">
      <span class="comment-owner bold-reg">{{commentOwner.userName+": "}}</span>
      <span
        :class="{'hashtag':word[0]==='#'|| word[0]==='@'}"
        @click="findHashtagImages(word)"
        v-for="(word, index) in words"
        :key="index"
      >{{word+' '}}</span>
    </span>
    <span class="icons">
          <i class="far fa-edit btn" @click="$emit('editComment', comment.id)"></i>
    <i class="fas fa-times btn"  @click="$emit('deleteComment', comment.id)"></i>
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
      words: null
    };
  },
  created() {
    this.$store
      .dispatch({ type: "getUserById", userId: this.comment.writerId })
      .then(res => {
        this.commentOwner = res;
      });
    this.words = this.comment.comment.split(" ");
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
  computed: {},
  methods: {
    findHashtagImages(word) {
      if (word[0] === "#") {
        this.$emit("searchHashtagImages", word);
        return;
      } else if (word[0] === "@") {
        this.$emit("goToUserProfile", word);
        return;
      } else return;
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
  align-items:center;
  .comment {
    background-color: #f2f3f5;
    border-radius: 2rem;
    padding: .7rem;
    // list-style: none;
    margin-bottom: 2px;
    display: block;
  }
  .icons{
    color:darkgray;
    width:6rem;
    i{
      margin-left: .5rem;
    }
  }
}
</style>


