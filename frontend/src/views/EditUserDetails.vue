<template>
  <div class="edit-profile-container">
    <div>
      <div class="update-profile-pic">
              <img :src="loggedInUser.profilePic" alt class="edit-image">

        <label for="file-input" class="btn">Update your Profile Picture</label>
        <input
          type="file"
          name="pic"
          id="file-input"
          accept="image/*"
          @change="getCloudinaryUrl()"
          required
        >
      </div>
    </div>
    <label class="edit-profile-label" for><h3>First Name</h3>
      <input
        type="text"
        class="edit-user-input fName"
        v-model="loggedInUser.firstName"
        placeholder="First name...."
      >
    </label>
    <label for class="edit-profile-label"><h3>Last Name</h3>
      <input
        type="text"
        class="edit-user-input lName"
        v-model="loggedInUser.lastName"
        placeholder="Last name...."
      >
    </label>
    <label for class="edit-profile-label"><h3>Username</h3>
      <input
        type="text"
        class="edit-user-input userName"
        v-model="loggedInUser.userName"
        placeholder="Username...."
      >
    </label>
    <label for class="edit-profile-label"><h3>Email</h3>
      <input
        type="text"
        class="edit-user-input email"
        v-model="loggedInUser.email"
        placeholder="Email...."
      >
    </label>
  </div>
</template>

<script>
export default {
  name: "edit-user-details",
  data() {
    return {
      loggedInUser: {
        firstName: null,
        lastName: null,
        userName: null,
        email: null
      }
    };
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store
      .dispatch({ type: "getLoggedInUser", userId })
      .then(user => (this.loggedInUser = user));
  },
  computed: {}
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
  .edit-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
    margin-bottom: 15px;
  }
  .edit-profile-label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-right: 10px;
    h3{
      margin-right:2rem;
    }
    .edit-user-input {
      height: 41px;
      border-radius: 10px;
      padding: 10px;
      width: 75%;
    }
  }
  .update-profile-pic {
    color: #3897f0;
    font-family: monst-bold;
    > input {
      display: none;
    }
  }
}
</style>

