<template>
  <li class="comment" v-if="commentOwner">
    <span class="comment-owner bold-reg">{{commentOwner.userName}}:</span>
    {{comment.comment}}
    {{ comment.timeStamp | moment }}
  </li>
</template>

<script>
import moment from "moment";
export default {
  name: "comment",
  props: ["comment"],
  data() {
    return {
      commentOwner: null
    };
  },
  created() {
    this.$store
      .dispatch({ type: "getUserById", userId: this.comment.writerId })
      .then(res => {
        this.commentOwner = res;
      });
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
}
</style>
>

