<template>
  <!-- <div>FUCK</div> -->
  <div v-if="loggedInUser">
    <form
      @keyup="userMadeChanges=true"
      class="edit-profile-container page-container"
      ref="form"
      action
      method="POST"
      enctype="multipart/form-data"
    >
      <div v-if="currProfilePic && loggedInUser" class="update-profile-pic-container">
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
      <label class="edit-profile-label" for="idFName">
        <h3>First Name:</h3>
        <input
          type="text"
          id="idFName"
          class="edit-user-input fName"
          placeholder="First name...."
          :value="loggedInUser.firstName"
          @input="user.firstName = $event.target.value"
        >
      </label>
      <label for="idLName" class="edit-profile-label">
        <h3>Last Name:</h3>
        <input
          type="text"
          id="idLName"
          class="edit-user-input lName"
          :value="loggedInUser.lastName"
          @input="user.lastName = $event.target.value"
          placeholder="Last name...."
        >
      </label>
      <label for="idUName" class="edit-profile-label">
        <h3>Username:</h3>
        <input
          type="text"
          id="idUName"
          class="edit-user-input userName"
          :value="loggedInUser.userName"
          @input="user.userName = $event.target.value"
          placeholder="Username...."
        >
      </label>
      <label for="idEmail" class="edit-profile-label">
        <h3>Email:</h3>
        <input
          type="text"
          id="idEmail"
          class="edit-user-input email"
          :value="loggedInUser.email"
          @input="user.email = $event.target.value"
          placeholder="Email...."
        >
      </label>
      <label class="edit-profile-label">
        <h3>Bio:</h3>
        <textarea
          class="edit-user-input editBio"
          :value="loggedInUser.bio"
          placeholder="Bio...."
          @input="user.bio = $event.target.value"
        ></textarea>
      </label>
      <input
        type="submit"
        value="Submit"
        class="sumbit-btn btn"
        @click.prevent="updateUserDetails()"
        :class="{'sumbit-btn-after-changes':userMadeChanges }"
      >
    </form>
  </div>
</template>

<script>
//

export default {
  name: "edit-user-details",
  data() {
    return {
      profilePicChanged: false,
      userMadeChanges: false,
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        profilePic: null,
        bio: ""
      }
    };
  },
  //  @input="user.profilePic = $event.target.value"
  created() {
    console.log("The edit page is created", this.loggedInUser);
    // const userName = this.$route.params.userName;
    this.$store
      .dispatch({ type: "getLoggedInUser" })
      .then(user => console.log("this.loggedInUser", this.loggedInUser, user))
      .catch(err => {
        console.log("get loggedin User Edit ERR", err);
        this.$router.push({ name: "login" });
      });
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
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
        })
        // .catch(err => {
        //   console.log("update User details ERR", err);
        //   this.$router.push({ name: "login" });
        // });
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
    // input() {}
  }
};
</script>

<style lang="scss">
</style>

