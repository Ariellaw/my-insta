<template>
  <div>
    <div id="locations-page">
      <div id="myMap"></div>
    </div>

    <div v-if="images" class="page-container">
      <gallary-of-images :displayedImages="images"></gallary-of-images>
    </div>
  </div>
</template>

<script>
import gallaryOfImages from "../components/gallary-of-images.vue";
import GoogleMap from "../components/GoogleMap";
import axios from "axios";
export default {
  name: "locations-page",
  data() {
    return {
      images: null,
    };
  },
  components: {
    gallaryOfImages,
    GoogleMap
  },
  created() {
    const location = this.$route.params.location;
    this.$store
      .dispatch({ type: "getImagesByLocation", location })
      .then(images => (this.images = images));
    
    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=60102dc9f3ca4456a6895c9883e11be7`
      )
      .then(res => {
        var searchResult = res.data.results[0].geometry;

        // this.geometry.lat = searchResult.lat;
        // this.geometry.lng = searchResult.lng;
        // console.log("fdsf",  this.geometry.lat,  this.geometry.lng);
        this.loadMap(searchResult.lat,searchResult.lng);
      });
  },
  mounted() {
  },
  methods: {
    loadMap(lat, lng) {
      var myLatLng = { lat, lng};

      // console.log("map: ", google.maps);
      this.map = new google.maps.Map(document.getElementById("myMap"), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 4
      });
      this.marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: "Hello World!"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#myMap {
  height: 300px;
  width: 100%;
}
</style>

