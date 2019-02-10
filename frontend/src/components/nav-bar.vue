<template>
  <nav class="main-nav-bar">
    <div class="nav-buttons-container">
      <div class="instagram-logo btn">
        <i class="fab fa-instagram btn"></i> | Instagram
      </div>
      <input type="text" autocapitalize="none" size="35" placeholder="Search....." value>
      <div class="menu-icons">
        <form
          class="update-user-cover-pic"
          ref="form"
          action
          method="POST"
          enctype="multipart/form-data"
          @submit="getCloudinaryUrl"
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
        <i class="far fa-user btn"></i>
      </div>
      <uploadPost v-if="showModal" :post="post.file" @close="showModal = false"></uploadPost>
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
      post: {
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
          this.post.file = url;
          // this.updateUserDetails();
        });
    }
  },
  components: {
    uploadPost
  }
};
</script>

 <style lang="scss" scoped>
.image-upload > input {
  display: none;
}

.main-nav-bar {
  height: 8rem;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid darkgray;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;

  .nav-buttons-container {
    width: 70%;
    max-width: 115rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .menu-icons {
      width: 18rem;
      display: flex;
      justify-content: space-between;
    }
    .instagram-logo {
      font-family: lily;
    }
  }
}
</style>

