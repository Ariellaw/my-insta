<template>
  <div class="module">
    <social-sharing
      :url="image.image"
      :title="image.location"
      inline-template
    >
      <div class="social-media-container">
        <network class="social-media-option" network="email">
          <i class="fab fa-envelope"></i> Email
        </network>
        <network class="social-media-option" network="facebook">
          <i class="fab fa-facebook"></i> Facebook
        </network>

        <network class="social-media-option" network="linkedin">
          <i class="fab fa-linkedin"></i> LinkedIn
        </network>
 
        <network class="social-media-option" network="pinterest">
          <i class="fab fa-pinterest"></i> Pinterest
        </network>
        <network class="social-media-option" network="reddit">
          <i class="fab fa-reddit"></i> Reddit
        </network>

        <network class="social-media-option" network="twitter">
          <i class="fab fa-twitter"></i> Twitter
        </network>

        <network class="social-media-option" network="whatsapp">
          <i class="fab fa-whatsapp"></i> Whatsapp
        </network>
      </div>
    </social-sharing>
  </div>
</template>

<script>


export default {
  name: "social-media",
  props: ["image"],
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {}
};
      //  hashtags="vuejs,javascript,framework" 

</script>

<style lang="scss" scoped>
.module {
  background-color: #17b7cc;
  z-index: 10;
  position: absolute;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid #efefef;
  width: 50rem;
  height: 50rem;
  border-radius: 3rem;
  .social-media-container {
    display: flex;
    flex-direction: column;
    .social-media-option {
      display: block;
      i {
      }
    }
  }
}
</style>
