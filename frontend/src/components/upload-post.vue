<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-container displayVertical newImage">
          <img class="new-image" :src="image" alt>
          <div class="new-post-comments">
            <input
              type="text"
              name="location"
              placeholder="Location.........."
              v-model="imgDetails.location"
            >
            <textarea
              placeholder="Say something about this photo............."
              v-model="imgDetails.text"
            ></textarea>
            <button @click="submitImage" class="sumbit-image-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "upload-post",
  props: ["image"],
  data() {
    return {
      imgDetails: {
        text: null,
        location: null
      }
    };
  },
  created() {},
  destroyed() {},
  computed: {},
  methods: {
    submitImage() {
      console.log("submit")
      this.$store
        .dispatch({
          type: "addImage",
          imgDetails: this.imgDetails,
          image: this.image
        })
        .then(() => this.$emit("close"));
    }
  }
};
</script>

<style <style lang="scss" scoped>
</style>
