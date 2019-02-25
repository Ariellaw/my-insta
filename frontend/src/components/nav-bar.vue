<template>
  <nav class="main-nav-bar">
    <div class="nav-buttons-container page-container">
      <div class="instagram-logo btn">
        <i class="fab fa-instagram btn"></i> | AriellaGram
      </div>
      <input
        type="text"
        autocapitalize="none"
        size="35"
        placeholder="Search....."
        v-model="searchKeyword"
        @keyup="findSearchResults(searchKeyword)"
      >
      <div class="menu-icons">
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
        <i class="fas fa-user-friends btn"></i>
        <i class="fas fa-comment btn"></i>
        <i class="far fa-heart btn"></i>
        <i class="far fa-user btn" @click="goToLoggedInUserProfile"></i>
      </div>
      <uploadPost v-if="showModal" :image="image.file" @close="showModal = false"></uploadPost>
    </div>
  </nav>
</template>


<script>
import uploadPost from "./upload-post.vue";
/* @change="getCloudinaryUrl()"                    @input="user.coverPic = $event.target.value"
  @input="post.file = $event.target.value" */

export default {
  name: "nav-bar",
  data() {
    return {
      showModal: false,
      searchKeyword: null,

      image: {
        file: null
      }
    };
  },
  methods: {
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
    },
    goToLoggedInUserProfile() {
      var loggedInUserId = this.loggedInUser._id;
      this.$router.push(`/user/${loggedInUserId}`);
      this.$router.go();
    },
    findSearchResults(keyword){
      this.$router.push(`/`)
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  components: {
    uploadPost
  }
};
</script>

 <style lang="scss" scoped>
</style>

