<template>
  <li class="comment" v-if="commentOwner">
    <span class="comment-owner bold-reg">{{commentOwner.userName}}:</span>
    {{comment.comment}}
  </li>
</template>

<script>
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
      .dispatch({ type: "getUserById", userId: this.comment.commentOwnerId })
      .then(res => {
        this.commentOwner = res;
      });
  },
  mounted() {
      console.log("doc", document.querySelector(".comment-owner"));
    
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

