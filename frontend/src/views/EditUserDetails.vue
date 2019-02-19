<template >
  <form v-if="loggedInUser"
    class="edit-profile-container"
    ref="form"
    action
    method="POST"
    enctype="multipart/form-data"
    @submit.prevent="updateUserDetails"
  >
    
    <div class="update-profile-pic-container">
      <img x :src="loggedInUser.profilePic" alt="profile-picture" class="edit-image">
      <h3>{{loggedInUser.userName}}</h3>
      <label for="file-input" class="btn">
        Update your Profile Picture
        <input
          type="file"
          name="user-profile-pic"
          id="file-input"
          accept="image/*"
          @change="getCloudinaryUrl()"
          @input="user.profilePic = $event.target.value"
        >
      </label>
    </div>
    <label class="edit-profile-label" for>
      <h3>First Name</h3>
      <input
        type="text"
        class="edit-user-input fName"
        placeholder="First name...."
        :value="loggedInUser.firstName"
        @input="user.firstName = $event.target.value"
      >
    </label>
    <label for class="edit-profile-label">
      <h3>Last Name</h3>
      <input
        type="text"
        class="edit-user-input lName"
        :value="loggedInUser.lastName"
        @input="user.lastName = $event.target.value"
        placeholder="Last name...."
      >
    </label>
    <label for class="edit-profile-label">
      <h3>Username</h3>
      <input
        type="text"
        class="edit-user-input userName"
        :value="loggedInUser.userName"
        @input="user.userName = $event.target.value"
        placeholder="Username...."
      >
    </label>
    <label for class="edit-profile-label">
      <h3>Email</h3>
      <input
        type="text"
        class="edit-user-input email"
        :value="loggedInUser.email"
        @input="user.email = $event.target.value"
        placeholder="Email...."
      >
    </label>
    <input type="submit" value="Submit" class="sumbit-btn btn">
  </form>
</template>

<script>
export default {
  name: "edit-user-details",
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        userName: null,
        email: null,
      }
    };
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store.dispatch({ type: "getLoggedInUser", userId });
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    updateUserDetails() {
      this.user._id = this.loggedInUser._id;
      this.$store.dispatch({
        type: "updateUserDetails",
        userDetails: this.user
      });
    }
  }
};
</script>

<style lang="scss">
.edit-profile-container {
  font-size: 2rem;
  width: 1000px;
  height: 95vh;
  border: 1px solid darken(#fafafa, 15%);
  background-color: #fafafa;
  border-radius: 5px;
  margin: 20px auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  .edit-profile-label {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    h3 {
      margin-right: 2rem;
      width: 24%;
      display: flex;
      justify-content: flex-end;
    }

    .edit-user-input {
      height: 41px;
      border-radius: 10px;
      padding: 10px;
      width: 72%;
      justify-content: flex-end;
    }
  }
  .update-profile-pic-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .edit-image {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 50%;
      border: 1px solid black;
      margin-bottom: 15px;
    }
    h3 {
      font-weight: 200;
    }

    label {
      color: #3897f0;
      font-family: monst-bold;
      > input {
        display: none;
      }
    }
  }
  .sumbit-btn {
    align-self: flex-end;
    width: 10rem;
    height: 5rem;
  }
}
</style>

