<template>
  <nav class="main-nav-bar">
    <div class="dd" v-if="cellphoneDisplay && navbarTitle" @click="goBackToLastWindow()">
      <i class="fas fa-arrow-left btn"></i>
      {{navbarTitle}}
    </div>
    <div v-else class="nav-buttons-container page-container">
      <div @click="goToFeed" class="instagram-logo btn">
        <i class="fab fa-instagram btn"></i>
        <span class="ariella-logo">&nbsp;|&nbsp; AriellaGram</span>
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
              class="search-users-field"
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
              <i class="fas fa-upload btn"></i>
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
        <i class="fas fa-comment btn"></i>
        <i class="far fa-heart btn"></i>
        <div v-if="loggedInUser" class="userName-container btn" @click="goToLoggedInUserProfile">
          <img :src="loggedInUser.profilePic" alt class="userImg">
          <span class="userName">{{loggedInUser.userName}}</span>
        </div>
        <!-- <i class="far fa-user btn" @click="goToLoggedInUserProfile"></i> -->
      </div>
    </div>
  </nav>
</template>


<script>
import searchResult from "./search-result.vue";

export default {
  name: "nav-bar",
  data() {
    return {
      keyword: null,
      navbarTitle: "Locations",
      lastWindow: null,
      windowWidth: null,
      cellphoneDisplay: false,
      loggedInUserName: "Ariella_wills1"
    };
  },
  methods: {
    // close() {
    //   this.image.file = null;
    //   this.newImage = false;
    //   this.$router.push({ params: { image: null } });
    // },
    // uploadNewImage() {
    //   this.$router.push({ params: { image: "new-image" } });
    //   this.newImage = true;
    // },
    getNavBarTitle() {
      if (this.$route.params.image === "new-image") {
        this.navbarTitle = "New Image";
      } else if (this.$route.params.image) {
        this.navbarTitle = "Photo";
      } else if (this.$route.name === "searh-results-page") {
        if (this.$route.params.type === "locations") {
          this.navbarTitle = "Locations";
        } else {
          this.navbarTitle = "Hashtags";
        }
      } else if (this.$route.name === "user-profile") {
        this.navbarTitle = this.$route.params.userName;
      } else if (this.$route.name === "edit-user-details") {
        this.navbarTitle = "Edit";
      } else {
        this.navbarTitle = null;
      }
    },
    goBackToLastWindow() {
      if (this.$route.params.image) {
        if (this.$route.params.image === "new-image") {
          this.$emit("close");
        } else {
          this.$router.push({ params: { image: null } });
        }
      } else if (this.$route.name === "edit-user-details") {
        this.$router.push({
          name: "user-profile",
          params: { userName: this.$route.params.userName, image: null }
        });
      } else {
        this.$router.push({
          name: "home",
          params: { image: null }
        });
      }
    },
    goToFeed() {
      this.$router.push({ name: "home" });
    },
    getCloudinaryUrl() {
      var elForm = this.$refs.form;

      return this.$store
        .dispatch({
          type: "getCloudinaryPicUrl",
          elForm
        })
        .then(url => {
          // this.image.file = url;
          if (url) {
            this.$emit("addnewimage", url);
          }
        });
    },
    goToLoggedInUserProfile() {
      // var userName = this.loggedInUserName;
      // this.$router.push({ name: "user-profile", params: { userName } });
      // this.$router.go();
      var userName = this.loggedInUserName;
      this.$router.push({ name: "user-profile", params: { userName } });
    },
    findRelevantUsers() {
      if (this.keyword) {
        this.$store.dispatch({
          type: "findRelevantUsers",
          keyword: this.keyword
        });
      }
    },
    resetKeyword() {
      this.keyword = null;
    }
  },
  created() {
    this.getNavBarTitle();
    if (window.innerWidth <= 700) {
      this.windowWidth = window.innerWidth;
      this.cellphoneDisplay = true;
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
  watch: {
    $route() {
      console.log(this.$route);

      this.getNavBarTitle();
    },
    windowWidth() {
      if (this.windowWidth <= 700) {
        // this.newImage = false;

        this.cellphoneDisplay = true;
      } else {
        this.cellphoneDisplay = false;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  },
  components: {
    // uploadPost,
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
  width: 250px;
  max-height: 60vh;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 10000003;
  margin: 0px 50px;
  overflow-y: auto;


}

.display-content {
  display: block;
  margin: 0 auto;
  z-index: 999999;
}

.search-users-field {
  width: 250px;
  height: 30px;
  font-size: 2rem;
  font-family: cursive;
}
</style>

