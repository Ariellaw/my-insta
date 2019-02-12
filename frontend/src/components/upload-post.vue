<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')"><i class="fas fa-times"></i></button>

        <div class="modal-container">

                  <img class="viewed-image" :src="image" alt="">
                  <div class="new-post-comments">
                    <textarea placeholder="Say something about this photo................." name="" ></textarea>
                  </div>
          <!-- <div class="modal-body"> -->

          </div>

        </div>
      </div>
    <!-- </div> -->
  </transition>
</template>

<script>
export default {
  name: "upload-post-",
  props: ["image"],
  created() {
  },
  computed: {
    
  },
  methods: {
   
  }
};
</script>

<style <style lang="scss" scoped>

</style>
