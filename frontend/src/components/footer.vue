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
    <upload-post v-if="newImage" :image="image.file" @close="close()"></upload-post>

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
      loggedInUserName: "Ariella_wills1",
      newImage: true,
      image: {
        file:
          "https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-13.jpg"
      }
    };
  },
  methods: {
    close() {
      this.image.file = null;
      this.newImage = false;
      this.$router.push({ params: { image: null } });
    },
    uploadNewImage() {
      console.log("uploadNewImage");
      this.newImage = true;
      // this.image.file = null;
      this.$router.push({ params: { image: "new-image" } });
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
      if (this.$route.params.image === null) {
        this.newImage = false;
      } else if (this.$route.params.image === "new-image") {
        this.newImage = true;
       this.image.file=
          "https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-13.jpg"
      
      }
    }
  }
};
</script>

<style>
</style>
