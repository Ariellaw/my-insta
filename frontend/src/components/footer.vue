<template>
    <div class="footer">
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
        <!-- <i class="fas fa-user-friends btn"></i> -->
        <i class="fas fa-comment btn"></i>
        <i class="far fa-heart btn"></i>
        <i class="far fa-user btn" @click="goToLoggedInUserProfile"></i>
      </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
