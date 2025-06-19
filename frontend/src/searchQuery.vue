<template>
    <div id="app">
      <h1>Vue.js Search Suggestions Example</h1>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search..."
        @input="showSuggestions = true"
      />
  
      <!-- Show suggestions only if the search query is not empty -->
      <ul v-if="searchQuery && showSuggestions" class="suggestions">
        <li
          v-for="(item, index) in filteredItems"
          :key="index"
          @click="selectItem(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        showSuggestions: false, // Controls whether suggestions dropdown is visible
        items: [
          'Apple',
          'Banana',
          'Orange',
          'Mango',
          'Pineapple',
          'Grapes',
          'Watermelon',
          'Strawberry'
        ]
      };
    },
    computed: {
      filteredItems() {
        // Filter the items array based on the search query
        return this.items.filter(item =>
          item.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      selectItem(item) {
        // Set the selected item as the search query
        this.searchQuery = item;
        this.showSuggestions = false; // Hide suggestions after selecting
      }
    }
  };
  </script>
  
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 50px;
  }
  
  input {
    width: 300px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .suggestions {
    list-style-type: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    width: 300px;
    position: absolute;
    background-color: white;
    z-index: 1000;
  }
  
  .suggestions li {
    padding: 10px;
    cursor: pointer;
  }
  
  .suggestions li:hover {
    background-color: #f0f0f0;
  }
  </style>
  