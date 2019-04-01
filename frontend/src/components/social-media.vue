<template>
  <div class="module">
    <div class="title">Share</div>
    <social-sharing :url="image.image" :title="image.location" inline-template>
      <div class="social-media-container">
        <div class="social-media-option">
          <network network="email">
            <i class="fa fa-envelope"></i> Email
          </network>
        </div>
        <div class="social-media-option">
          <network network="facebook">
            <i class="fab fa-facebook"></i> Facebook
          </network>
        </div>
        <div class="social-media-option btn">
          <network network="linkedin">
            <i class="fab fa-linkedin"></i> LinkedIn
          </network>
        </div>
        <div class="social-media-option btn">
          <network network="pinterest">
            <i class="fab fa-pinterest"></i> Pinterest
          </network>
        </div>
        <div class="social-media-option btn">
          <network network="reddit">
            <i class="fab fa-reddit"></i> Reddit
          </network>
        </div>
        <div class="social-media-option btn">
          <network network="twitter">
            <i class="fab fa-twitter"></i> Twitter
          </network>
        </div>

        <div class="social-media-option btn">
          <network network="whatsapp">
            <i class="fab fa-whatsapp"></i> Whatsapp
          </network>
        </div>
      </div>
    </social-sharing>
    <a href="javascript:void(0)" class="cancel" @click="$emit('close')">Cancel</a>
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
  z-index: 10;
  background-color: #fff;
  height: 30rem;
  width: 33rem;
  position: fixed;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 38%;
  transform: translateY(-50%);
  border-radius: 2rem;
  border: 1px solid #efefef;
  height: 40rem;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 700px){
      top: 35%
  }
  .title,
  .cancel {
    height: 4rem;
    display: flex;
    width: 100%;
    align-items: center;
  }
  .title {
    border-bottom: 1px solid darkgray;
    justify-content: center;
    font-weight: bold;
  }
  .cancel {
    text-decoration: none;
    padding-left: 3rem;
    padding-bottom: 2rem;
  }
  .social-media-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    height: 32rem;
    width: 100%;

    .social-media-option {
      height: 14%;
      width: 100%;
      color: black;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:last-child {
        border-bottom: unset;
      }
    }
  }
}
</style>
