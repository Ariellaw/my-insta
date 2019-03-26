<template>
  <div class="social-media-container"></div>
</template>

<script>
export default {
  name: "social-media",
  props: [],
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.social-media-container {
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
}
</style>
