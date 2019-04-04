<template v-if="user">
  <div @click="goToUserProfile" class="search-result btn">
    <img :src="user.profilePic" alt class="search-result-img">
    <div class="search-result-name">
      <span class="username bold-reg">{{user.userName}}</span>
      <span class="name">{{user.firstName}} {{user.lastName}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    goToUserProfile() {
      this.$router.push({name:'user-profile', params:{userName:this.user.userName}});
      this.$router.go();
      this.$emit("resetKeyword");
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-result {
  border-bottom: solid 1px darken(#fafafa, 15%);
  display: flex;
  flex-direction: row;
  height: 68px;
  padding: 8px 14px;
  align-items: center;
  background-color: #fafafa;
  text-decoration: none;
  color: black;

  &.search-result:hover {
    background-color: darken(#fafafa, 5%);
  }
  .search-result-img {
    border-radius: 50%;
    border: 1px solid black;
    object-fit: cover;
    height: 40px;
    width: 40px;
    margin-right: 1rem;
  }
  .search-result-name {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    text-align: left;
    .name {
      color: darkgray;
    }
  }
}
</style>
