<template>
  <div v-if="loggedInUser">
    <form
      class="edit-profile-container page-container"
      ref="form"
      action
      method="POST"
      enctype="multipart/form-data"
      @submit.prevent="updateUserDetails"
    >
      <div class="update-profile-pic-container">
        <img v-if="loadingProfilePic" src="../assets/img/loading.gif" class="loading" />
        <img v-else  :src="loggedInUser.profilePic" alt="profile-picture" class="edit-image">
        <h3>{{loggedInUser.userName}}</h3>
        <div class="image-upload">
          <label  v-if="!loadingProfilePic" for="file-input-edit" class="btn">Update your Profile Picture</label>

          <input
            type="file"
            name="user-profile-pic"
            id="file-input-edit"
            accept="image/*"
            @change="uploadImage"
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
          @keyup="tempUpdate('firstName',$event.target.value)"
        >
      </label>
      <label for="idLName" class="edit-profile-label">
        <h3>Last Name:</h3>
        <input
          type="text"
          id="idLName"
          class="edit-user-input lName"
          :value="loggedInUser.lastName"
          @keyup="tempUpdate('lastName',$event.target.value)"
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
          @keyup="tempUpdate('userName',$event.target.value)"
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
          @keyup="tempUpdate('email',$event.target.value)"
          placeholder="Email...."
        >
      </label>
      <label class="edit-profile-label">
        <h3>Bio:</h3>
        <textarea
          class="edit-user-input editBio"
          @keyup="tempUpdate('bio',$event.target.value)"
          :value="loggedInUser.bio"
          placeholder="Bio...."
        ></textarea>
      </label>
      <input
        type="submit"
        value="Update"
        class="sumbit-btn btn"
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
      loadingProfilePic:false
    };
  },
  created() {
    this.getLoggedInUser();
  },
  mounted() {},
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },

  },
  methods: {
    getLoggedInUser() {
      this.$store.dispatch({ type: "getLoggedInUser" });
    },
    tempUpdate(detailToUpdate, detail) {
      this.$store.dispatch({ type: "updateLoggedInUserTemp",  detailToUpdate, detail });
      this.userMadeChanges = true;
    },
    updateUserDetails() {
      this.$store
        .dispatch({
          type: "updateUserDetails",
          userDetails: this.loggedInUser
        })
        .then(() => {
          this.userMadeChanges = false;
          // this.getLoggedInUser();
          this.$router.go();
        })
        .catch(err => {
          console.log("getVisitedUserImages ERR", err);
          this.$router.push({ name: "login" });
        });
    },
    uploadImage() {
      this.getLoggedInUser();
      this.loadingProfilePic = true;
      var elForm = this.$refs.form;
      return this.$store
        .dispatch({
          type: "getCloudinaryPicUrl",
          elForm
        })
        .then(url => {
          this.loggedInUser.profilePic = url;
          this.updateUserDetails();
          this.loadingProfilePic = false;
        });
    }
  },
  watched: {
    // input() {}
  }
};
</script>

<style lang="scss">

.loading{
  height: 15rem;
  width:15rem;
}
</style>

