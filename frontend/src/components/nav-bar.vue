<template>
  <nav class="main-navbar" :class="[loginRegistrationPage ? 'center' : 'spaceBetween']">
    <div class="cellphone-navbar" v-if="cellphoneDisplay && navbarTitle">
      <i class="fas fa-arrow-left btn" @click="goBackToLastWindow()"></i>
      <h3 class="navbar-title" @click="goBackToLastWindow()">{{ navbarTitle }}</h3>
      <i class="fas fa-cog btn" @click="$emit('displayOptions')"></i>
    </div>

    <div v-else-if="!loginRegistrationPage" class="home-button">
      <span @click="goToFeed" class="logo-text">AriellaGram</span>
      <i @click="goToFeed" class="fab fa-instagram"></i>
    </div>
    <div v-else>
      <span @click="goToFeed" class="logo-text">AriellaGram</span>
    </div>

    <ul v-if="!loginRegistrationPage">
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
          />
        </a>
        <div class="dropdown-content" :class="{ 'display-content': keyword }">
          <search-result
            @resetKeyword="resetKeyword"
            v-for="user in searchedUsers"
            :key="user._id"
            :user="user"
          ></search-result>
        </div>
      </li>
    </ul>

    <div v-if="loggedInUser && !cellphoneDisplay" class="icons">
      <form
        class="update-user-cover-pic"
        ref="form"
        action
        method="POST"
        enctype="multipart/form-data"
      >
        <div class="image-upload" v-if="!loginRegistrationPage">
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
          />
        </div>
      </form>
      <img :src="loggedInUser.profilePic" alt class="userImg" @click="goToLoggedInUserProfile" />
    </div>

    <div
      class="login-container"
      v-if="!loginRegistrationPage && !loggedInUser && !cellphoneDisplay"
    >
      <router-link :to="{ name: 'login' }" class="link">
        <i class="fas fa-sign-in-alt"></i>
        <p>Login</p>
      </router-link>
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
      cellphoneDisplay: false
    };
  },
  methods: {
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
      const home = "home"
      if (this.$route.name !== home) this.$router.push({name:home});   
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
    },
    goToLoggedInUserProfile() {
      var userName = this.loggedInUser.userName;
      this.$router.push({ name: "user-profile", params: { userName } });
      this.$router.go();
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
    this.$store.dispatch({ type: "getLoggedInUser" });
  },
  computed: {
    loginRegistrationPage() {
      return this.$route.name === "register" || this.$route.name === "login";
    },
    isLoggedInUserProfile() {
      if (this.loggedInUser) {
        return (
          this.loggedInUser.userName === this.$route.params.userName &&
          this.$route.name === "user-profile" &&
          !this.$route.params.image
        );
      }
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    searchedUsers() {
      return this.$store.getters.searchedUsers;
    }
  },
  watch: {
    $route() {
      this.getNavBarTitle();
    },
    windowWidth() {
      this.cellphoneDisplay = this.windowWidth <= 700;
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
    searchResult
  }
};
</script>

<style lang="scss" scoped></style>
