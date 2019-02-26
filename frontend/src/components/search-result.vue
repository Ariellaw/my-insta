<template>
  <a href="https://www.facebook.com/" class="search-result btn">
    <img src="https://randomuser.me/api/portraits/women/51.jpg" alt class="search-result-img">
    <div class="search-result-name">
      <span class="username bold-reg">Ariella-Wills</span>
      <span class="name">Ariella Wills</span>
    </div>
  </a>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.search-result {
  border-bottom: solid 1px darken(#fafafa, 15%);
  display: flex;
  flex-direction: row;
  height: 65px;
  padding: 8px 14px;
  align-items: center;
  background-color: #fafafa;
  text-decoration: none;
  color:black;

  &.search-result:hover {
    background-color: darken(#fafafa, 5%);
  }
  .search-result-img {
    border-radius: 50%;
    border: 1px solid black;
    object-fit: cover;
    height: 40px;
    width: 40px;
    margin-right: 1rem;
  }
  .search-result-name {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    text-align: left;
  }
}
</style>
