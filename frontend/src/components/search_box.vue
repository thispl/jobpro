<template>
  <div class="searchBox" @mouseover="expand" @mouseleave="shrink">
    <input class="searchInput" type="text" v-model="query" placeholder="Search" ref="searchInput" />
    <button class="searchButton" @click="search">
      <i class="material-icons">search</i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      expanded: false,
    };
  },
  methods: {
    expand() {
      this.expanded = true;
      this.$refs.searchInput.style.width = window.innerWidth <= 620 ? "150px" : "240px";
      this.$refs.searchInput.style.padding = "0 6px";
    },
    shrink() {
      this.expanded = false;
      this.$refs.searchInput.style.width = "0px";
      this.$refs.searchInput.style.padding = "0";
    },
    search() {
      console.log("Searching for:", this.query);
    },
  },
};
</script>

<style scoped>
.searchBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  background: white;
  height: 40px;
  border-radius: 40px;
  padding: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow effect */
}

.searchButton {
  color: #2f3640;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  border: none;
  cursor: pointer;
}

.searchInput {
  border: none;
  background: none;
  outline: none;
  color: #2f3640;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
}

.searchInput:focus {
  outline: none !important;
  box-shadow: none !important;
  border: none;
}

@media screen and (max-width: 620px) {
  .searchBox:hover .searchInput {
    width: 150px;
    padding: 0 6px;
  }
}
</style>
