<template>
  <div>
    <div class="location-page">
      <div v-if="type ==='locations'" id="myMap"></div>
    </div>

    <div v-if="images" class="page-container">
      <div class="location-info-container">
        <img :src="image" alt class="location-img">
        <h3 class="location-name">{{this.city}}, {{this.country}}</h3>
      </div>
      <gallary-of-images :displayedImages="images"></gallary-of-images>
    </div>
  </div>
</template>

<script>
import gallaryOfImages from "../components/gallary-of-images.vue";
import axios from "axios";
export default {
  name: "searh-results-page",
  data() {
    return {
      images: null,
      city: null,
      country: null,
      type: null,
      image: null,
      loggedInUserId: "5c5fecdbd16a8d56eaca3c96"
    };
  },
  components: {
    gallaryOfImages
  },
  created() {
    this.$store.dispatch({
      type: "getLoggedInUser",
      userId: this.loggedInUserId
    });
    const keyword = this.$route.params.keyword;
    this.type = this.$route.params.type;
    if (this.type === "locations") {
      this.image =
        "https://www.st-christophers.co.uk/__data/assets/image/0004/454954/berlin_hero_updated.jpg";
      this.getCountryInfo(keyword);
      this.city = keyword.charAt(0).toUpperCase() + keyword.slice(1);
      this.$store
        .dispatch({ type: "getImagesByLocation", location: keyword })
        .then(images => (this.images = images));
    }
    if (this.type === "hashtag") {
      this.image =
        "https://www.st-christophers.co.uk/__data/assets/image/0004/454954/berlin_hero_updated.jpg";
      var hashtag =  keyword;
      console.log(typeof hashtag, hashtag);
      this.$store
        .dispatch({ type: "getImagesByHashtag", hashtag })
        .then(images => (this.images = images));
    }
  },
  mounted() {},
  computed:{
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    loadMap(lat, lng) {
      var myLatLng = { lat, lng };
      console.log("myLatLng", myLatLng);
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
    },
    getImageOfCity(lat, lng) {
      console.log("photo reference", lat, lng);
    },

    getCountryInfo(location) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=60102dc9f3ca4456a6895c9883e11be7`
        )
        .then(res => {
          var searchResult = res.data.results[0];
          this.loadMap(searchResult.geometry.lat, searchResult.geometry.lng);
          this.getImageOfCity(
            searchResult.geometry.lat,
            searchResult.geometry.lng
          );
          this.country = searchResult.components.country;
          console.log(
            searchResult.geometry.lat,
            searchResult.components.country
          );

          // axios
          //   .get(
          //     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDpSWIvjhFLJtTnjOd58CwmW81GEIBtSbA&location=${
          //       searchResult.lat
          //     },${searchResult.lng}&radius=1000`
          //   )
          //   .then(res => {
          //     console.log("photo reference", res);
          //   });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// .location-page {

// }
</style>

