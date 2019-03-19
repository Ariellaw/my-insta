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
      <upload-post v-if="showModal" :image="image.file" @close="close()"></upload-post>

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
    close() {
      this.image.file = null;
      this.showModal = false;
      this.$router.push({ params: { newImage: null } });
    },
    uploadNewImage() {
      console.log("uploadNewImage");
      this.image.file = null;
      this.showModal = true;
      this.$router.push({ params: { newImage: "newImage", imageId: null } });
    },
    goToLoggedInUserProfile() {
      var userName = this.loggedInUserName;
      this.$router.push({ name: "user-profile", params: { userName } });
      this.$router.go();
    },

    getCloudinaryUrl() {
      console.log("getCloudinaryUrl");
      this.uploadNewImage();

      var elForm = this.$refs.form;
      return this.$store
        .dispatch({
          type: "getCloudinaryPicUrl",
          elForm
        })
        .then(url => {
          console.log(url);
          this.image.file = url;
        });
    }
  },
  components: {
    uploadPost
  },
  watch: {
    $route() {
      if (this.$route.params.newImage === null) {
        this.showModal = false;
      }
    }
  }
};
</script>

<style>
</style>
