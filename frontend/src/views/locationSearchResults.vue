<template>
  <div v-if="images">
    <gallary-of-images :displayedImages="images"></gallary-of-images>
  </div>
</template>

<script>
import gallaryOfImages from "../components/gallary-of-images.vue";
export default {
  data() {
    return {
      images: null
    };
  },
  components: {
    gallaryOfImages
  },
  created() {
    const location = this.$route.params.location;
    console.log(location)
    this.$store
      .dispatch({ type: "getImagesByLocation", location })
      .then(images => this.images = images);
  }
};
</script>

<style>
</style>
