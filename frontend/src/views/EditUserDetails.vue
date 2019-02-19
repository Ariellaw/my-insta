<template>
  <div class="edit-profile-container">
    <!-- <div> -->
    <div class="update-profile-pic-container">
      <img :src="loggedInUser.profilePic" alt class="edit-image">
      <h3>{{loggedInUser.userName}}</h3>
      <label for="file-input" class="btn">Update your Profile Picture</label>
      <input
        type="file"
        name="pic"
        id="file-input"
        accept="image/*"
        @change="getCloudinaryUrl()"
        required
      >
      <!-- </div> -->
    </div>
    <label class="edit-profile-label" for>
      <h3>First Name</h3>
      <input
        type="text"
        class="edit-user-input fName"
        v-model="loggedInUser.firstName"
        placeholder="First name...."
      >
    </label>
    <label for class="edit-profile-label">
      <h3>Last Name</h3>
      <input
        type="text"
        class="edit-user-input lName"
        v-model="loggedInUser.lastName"
        placeholder="Last name...."
      >
    </label>
    <label for class="edit-profile-label">
      <h3>Username</h3>
      <input
        type="text"
        class="edit-user-input userName"
        v-model="loggedInUser.userName"
        placeholder="Username...."
      >
    </label>
    <label for class="edit-profile-label">
      <h3>Email</h3>
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
  height: 100vh;
  .edit-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
    margin-bottom: 15px;
  }
  .update-profile-pic-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .edit-profile-label {
    display: -webkit-box;
    display: -ms-flexbox;
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
  .update-profile-pic {
    h3 {
      font-weight: 200;
    }
    label {
      color: #3897f0;
      font-family: monst-bold;
    }
    > input {
      display: none;
    }
  }
}
</style>

