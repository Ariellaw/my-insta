<template>
  <div v-if="images">
    <div class="location-page">
      <div v-if="type==='locations'" id="myMap"></div>
    </div>

    <div class="page-container">
      <div class="location-info-container">
        <img :src="image" alt class="location-img">
        <h3 v-if="type==='locations'" class="location-name">{{this.city}}, {{this.country}}</h3>
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

   
    };
  },
  components: {
    gallaryOfImages
  },
  created() {
    const keyword = this.$route.params.keyword;
    this.type = this.$route.params.type;
    if (this.type === "locations") {
      this.getLocation(keyword);
    }
    if (this.type === "hashtag") {
      this.getHashtagImages(keyword);
    }
  },
  mounted() {},
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    getLocation(keyword) {
      this.image =
        "https://www.st-christophers.co.uk/__data/assets/image/0004/454954/berlin_hero_updated.jpg";
      this.getCountryInfo(keyword);
      this.city = keyword.charAt(0).toUpperCase() + keyword.slice(1);
      this.$store
        .dispatch({ type: "getImagesByLocation", location: keyword })
        .then(images => (this.images = images)).catch(err => {
          console.log("getVisitedUserImages ERR", err);
          this.$router.push({ name: "login" });
        });
    },
    getHashtagImages(keyword) {
      var hashtag = keyword;
      this.$store
        .dispatch({ type: "getImagesByHashtag", hashtag })
        .then(images => {
          this.images = images;
          this.image = images[0].image;
        }).catch(err => {
          console.log("getVisitedUserImages ERR", err);
          this.$router.push({ name: "login" });
        });
    },

    loadMap(lat, lng) {
      var myLatLng = { lat, lng };
      this.map = new google.maps.Map(document.getElementById("myMap"), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 4
      });
      this.marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: this.city
      });
    },
    getImageOfCity(lat, lng) {},

    getCountryInfo(location) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${
            this.opencagedataAPI
          } `
        )
        .then(res => {
          var searchResult = res.data.results[0];
          this.loadMap(searchResult.geometry.lat, searchResult.geometry.lng);
          this.getImageOfCity(
            searchResult.geometry.lat,
            searchResult.geometry.lng
          );
          this.country = searchResult.components.country;

          // axios
          //   .get(
          //     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${this.googleAPI}&location=${
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

