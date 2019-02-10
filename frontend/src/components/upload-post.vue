<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <button class="modal-default-button" @click="$emit('close')"><i class="fas fa-times"></i></button>

        <div class="modal-container">

                  <img class="viewed-image" :src="post" alt="">
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
  props: ["post"],
  created() {
  },
  computed: {
    
  },
  methods: {
   
  }
};
</script>

<style <style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 900px;
  max-width: 95vw;
  height: 600px;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
   .viewed-image{
     width:75%;
     height: 100%;
     object-fit: cover
   }
   .new-post-comments{
     width:20%;
      textarea{
        width:80%;
        border: none; 
      }
   }
}

.modal-default-button {
  float: right;
  background-color: rgba(0, 0, 0, 0);
  height: 70px;
  width: 70px;
  border: 1px solid rgba(0, 0, 0, 0);
  color: white;
  font-size:5rem;
  position: relative;
}

.currImage {
  width: 70%;
  height: auto;
  object-fit: cover;
}
.modal-body {
  height: 100%;
  // margin: 20px 0;
  width: 30%;
  // .image-info {
  div {
    outline: 1px solid hotpink;
  }
  .user-info {
    height: 10%;
  }
  .comments {
    height: 70%;
  }
  .likes-and-followers {
    height: 10%;
  }
  .add-a-comment {
    height: 10%;
  }
  // }
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
