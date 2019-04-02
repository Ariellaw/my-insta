<template  >
  <div class="footer" v-if="loggedInUser">
    <form
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
        >
      </div>
    </form>

    <i class="fas fa-comment btn"></i>
    <i class="far fa-heart btn"></i>
    <i class="far fa-user btn" @click="goToLoggedInUserProfile"></i>
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
    }
  }
};
</script>

<style>
</style>
