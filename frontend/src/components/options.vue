<template>
  <div class="options-container">
    <div class="option">Change Password</div>
    <div class="option">Change Settings</div>
    <!-- <router-link  to="//logout">Log out</router-link> -->
    <div class="option" @click="logOut()">Log Out</div>
    <div class="option" @click="$emit('close')">Cancel</div>
  </div>
</template>

<script>
export default {
  name: "options",
  methods: {
    logOut() {
      console.log("logout cmp");
      this.$store.dispatch({ type: "logout" });
      //TODO: relative location, maybe use $router
      window.location = "/logout";
    }
  }
};
</script>

<style lang="scss" scoped>
.options-container {
  z-index: 10;
  background-color: #fff;
  height: 30rem;
  width: 33rem;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 2rem;
  border: 1px solid #efefef;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  .option {
    height: 20%;
    border-bottom: 1px solid darkgray;
    width: 100%;
    color: black;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:last-child {
      border-bottom: unset;
    }
  }
}
</style>

