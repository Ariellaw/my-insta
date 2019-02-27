<template>
  <li class="comment" v-if="commentOwner && words">
    <span class="comment-owner bold-reg">{{commentOwner.userName+": "}}</span>
    <!-- {{comment.comment}} -->
    <p v-for="word in words" v-if="word[0]!=='#'" class="word">{{word+" "}}</p>

    <a v-else href="javascript:void(0)" class="hashtag word">{{word+" "}}</a>

    <!-- <p class="ff">fsdfsaf </p>
    <a   href="javascript:void(0)" class=" ff">@fh </a>
    <p  class="ff">fsfds </p>-->
    <a href="javascript:void(0)" class="dropbtn"></a>
    <!-- {{ comment.timeStamp | moment }} -->
  </li>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  padding: 3px;
  list-style: none;
  margin-bottom: 2px;
  display: block;
}
.word {
  display: inline;
}
.hashtag {
  text-decoration: none;
  font-weight: 600;
}
</style>
>

