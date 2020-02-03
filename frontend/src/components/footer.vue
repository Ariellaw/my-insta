<template  >
  <div class="footer">
    <form
      v-if="loggedInUser"
      class="update-user-cover-pic"
      ref="form"
      action
      method="POST"
      enctype="multipart/form-data"
    >
      <div class="image-upload">
        <label for="file-input-footer">
          <i class="fas fa-upload btn"></i>
        </label>

        <input
          type="file"
          name="pic"
          id="file-input-footer"
          accept="image/*"
          @change="getCloudinaryUrl()"
          required
        />
      </div>
    </form>

    <div v-if="!loginRegistrationPage && !loggedInUser" class="login-container btn">
      <router-link :to="{ name: 'login'}" class="login">
        <i class="fas fa-sign-in-alt"></i>

        <p class>Login</p>
      </router-link>
      <!-- <router-link :to="{ name: 'register'}">Register</router-link> -->
    </div>
    <!-- <i class="fas fa-comment btn"></i> -->
    <!-- <i class="far fa-heart btn"></i> -->
    <i class="far fa-user btn" @click="goToLoggedInUserProfile" v-if="loggedInUser"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToLoggedInUserProfile() {
      var userName = this.loggedInUser.userName;
      this.$router.push({ name: "user-profile", params: { userName } });
      this.$router.go();
    },

    getCloudinaryUrl() {
      var elForm = this.$refs.form;
      return this.$store
        .dispatch({
          type: "getCloudinaryPicUrl",
          elForm
        })
        .then(url => {
          if (url) {
            this.$emit("addnewimage", url);
          }
        });
    }
  },
  components: {},
  watch: {},
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    loginRegistrationPage() {
      return this.$route.name === "register" || this.$route.name === "login";
    }
  }
};
</script>

<style>
.btn {
  cursor: pointer;
}
</style>
