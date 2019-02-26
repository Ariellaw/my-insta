<template>
  <nav class="main-nav-bar">
    <div class="nav-buttons-container page-container">
      <div @click="goToFeed" class="instagram-logo btn">
        <i class="fab fa-instagram btn"></i> | AriellaGram
      </div>
      <ul>
        <li class="dropdown">
          <a href="javascript:void(0)" class="dropbtn">
            <input
              type="text"
              autocapitalize="none"
              size="45"
              placeholder="Search....."
              v-model="keyword"
              @keyup="findRelevantUsers"
            >
          </a>
          <div class="dropdown-content" :class="{'display-content':keyword}">
            <search-result
              @resetKeyword="resetKeyword"
              v-for="user in searchedUsers"
              :key="user._id"
              :user="user"
            ></search-result>
          </div>
        </li>
      </ul>
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
import searchResult from "./search-result.vue";

export default {
  name: "nav-bar",
  data() {
    return {
      showModal: false,
      keyword: null,

      image: {
        file: null
      }
    };
  },
  methods: {
    goToFeed() {
      console.log("feed");
      this.$router.push(`/`);
      // this.$router.go();
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
    },
    goToLoggedInUserProfile() {
      var loggedInUserId = this.loggedInUser._id;
      this.$router.push(`/user/${loggedInUserId}`);
      this.$router.go();
    },
    findRelevantUsers(keyword) {
      this.$store.dispatch({
        type: "findRelevantUsers",
        keyword: this.keyword
      });
    },
    resetKeyword(){
      this.keyword = null;
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    searchedUsers() {
      return this.$store.getters.searchedUsers;
    }
  },
  components: {
    uploadPost,
    searchResult
  }
};
</script>

 <style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #fafafa;
  min-width: 250px;
  max-height: 60vh;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 8;
  margin: 0px 50px;
  overflow-y: auto;

  // a {
  //   color: black;
  //   padding: 12px 16px;
  //   text-decoration: none;
  //   display: block;
  //   text-align: left;
  // }
}

.display-content {
  display: block;
}
</style>

