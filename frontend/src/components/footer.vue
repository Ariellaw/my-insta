<template>
  <div class="footer">
    <form
      class="update-user-cover-pic"
      ref="form"
      action
      method="POST"
      enctype="multipart/form-data"
    >
      <div class="image-upload">
        <label for="file-input">
          <i class="fas fa-upload btn" @click="showModal = true"></i>
        </label>

        <input
              type="file"
              name="pic"
              id="file-input"
              accept="image/*"
              @change="getCloudinaryUrl()"
              required
        >
      </div>
    </form>
    <upload-post v-if="showModal" :image="image.file" @close="showModal = false"></upload-post>

    <i class="fas fa-comment btn"></i>
    <i class="far fa-heart btn"></i>
    <i class="far fa-user btn" @click="goToLoggedInUserProfile"></i>
  </div>
</template>

<script>
import uploadPost from "./upload-post.vue";

export default {
  data() {
    return {
      showModal: false,
      loggedInUserName: "Ariella_wills1",
      image: {
        file: null
      }
    };
  },
  methods: {
    goToLoggedInUserProfile() {
      var userName = this.loggedInUserName;
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
          this.image.file = url;
        });
    }
  },
  components: {
    uploadPost
  }
};
</script>

<style>
</style>
