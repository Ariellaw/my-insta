<template >
  <form
    @keyup="userMadeChanges=true"
    v-if="loggedInUser"
    class="edit-profile-container page-container"
    ref="form"
    action
    enctype="multipart/form-data"
    @submit.prevent="updateUserDetails"
  >
    <div v-if="currProfilePic" class="update-profile-pic-container">
      <img :src="currProfilePic" alt="profile-picture" class="edit-image">
      <h3>{{loggedInUser.userName}}</h3>
      <div class="image-upload">
        <label for="file-input-edit" class="btn">Update your Profile Picture</label>
        
        <input
          type="file"
          name="user-profile-pic"
          id="file-input-edit"
          accept="image/*"
          @change="uploadImage()"
        >
      </div>
    </div>
    <label class="edit-profile-label" for>
      <h3>First Name:</h3>
      <input
        type="text"
        class="edit-user-input fName"
        placeholder="First name...."
        :value="loggedInUser.firstName"
        @input="user.firstName = $event.target.value"
      >
    </label>
    <label for class="edit-profile-label">
      <h3>Last Name:</h3>
      <input
        type="text"
        class="edit-user-input lName"
        :value="loggedInUser.lastName"
        @input="user.lastName = $event.target.value"
        placeholder="Last name...."
      >
    </label>
    <label for class="edit-profile-label">
      <h3>Username:</h3>
      <input
        type="text"
        class="edit-user-input userName"
        :value="loggedInUser.userName"
        @input="user.userName = $event.target.value"
        placeholder="Username...."
      >
    </label>
    <label for class="edit-profile-label">
      <h3>Email:</h3>
      <input
        type="text"
        class="edit-user-input email"
        :value="loggedInUser.email"
        @input="user.email = $event.target.value"
        placeholder="Email...."
      >
    </label>
    <input
      type="submit"
      value="Submit"
      class='sumbit-btn btn'
      :class="{'sumbit-btn-after-changes':userMadeChanges }"
    >
  </form>
</template>

<script>
// method="POST"

export default {
  name: "edit-user-details",
  data() {
    return {
      profilePicChanged: false,
      userMadeChanges: false,
      user: {
        firstName: null,
        lastName: null,
        userName: null,
        email: null,
        profilePic: null
      }
    };
  },
  //  @input="user.profilePic = $event.target.value"

  created() {
    const userName = this.$route.params.userName;
    this.$store.dispatch({ type: "getVisitedUser", userName })
    // this.$store.dispatch({ type: "getLoggedInUser", userId });
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.visitedUser;
    },
    currProfilePic() {
      if (!this.profilePicChanged) {
        return this.loggedInUser.profilePic;
      } else return this.user.profilePic;
    }
  },
  methods: {
    updateUserDetails() {
      this.user._id = this.loggedInUser._id;
      this.$store
        .dispatch({
          type: "updateUserDetails",
          userDetails: this.user
        })
        .then(() => {
          this.userMadeChanges = false;
        });
    },
    uploadImage() {
      var elForm = this.$refs.form;
      return this.$store
        .dispatch({
          type: "getCloudinaryPicUrl",
          elForm
        })
        .then(url => {
          this.user.profilePic = url;
          this.profilePicChanged = true;
          this.updateUserDetails();
        });
    }
  },
  watched: {
    input() {}
  }
};
</script>

<style lang="scss">
</style>

