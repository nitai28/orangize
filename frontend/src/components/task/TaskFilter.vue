<template>
  <section class='task-filter flex'>
    <form @submit.prevent="filterBySearch" class="search flex">
      <input class="input clean-input" type='search' v-model="filter.byTitle" placeholder='Filter by title' @input="filterBySearch" />
      <button class="btn clean-btn" type="submit" ><i><img src="../../assets/icon/search.svg"/></i></button>
    </form>
    <div class="btn filter-btn clean-btn" :class='filterBtnClass' @click='toggleOpts'>
      <span>filter By Label</span>
      <ul class="opts-container" :class="{'open-opts': isOpen}">
        <li class='opt all' @click="filter.byLabel = ''; emitFilter()">No Filter</li>
        <li class='opt red' @click="filter.byLabel = 'red'; emitFilter()">Immediate Attention</li>
        <li class='opt orange' @click="filter.byLabel = 'orange'; emitFilter()">Urgent</li>
        <li class='opt yellow' @click="filter.byLabel = 'yellow'; emitFilter()">Normal</li>
        <li class='opt green' @click="filter.byLabel = 'green'; emitFilter()">Done</li>
      </ul>
    </div>
  </section>
</template>

<script>
var debounce = require("debounce");
export default {
  name: "TaskFilter",
  data() {
    return {
      isOpen: false,
      filter: { byLabel: "", byTitle: "" },
      filterByLabelTimer: null
    };
  },
  computed: {
  filterBtnClass: function () {
    return {
      [this.filter.byLabel]: true,
      'open-opts': this.isOpen
      }
    }
  },
  methods: {
    toggleOpts() {
      this.isOpen = !this.isOpen;
      if(this.filterByLabelTimer) clearTimeout(this.filterByLabelTimer);
      if(this.isOpen) {
        this.filterByLabelTimer = setTimeout(()=> {
          this.isOpen = false
        }, 3000);
      }
      
    },
    emitFilter() {
      let copyFilter = Object.assign({}, this.filter);
      console.log(copyFilter);
      this.$store.commit({ type: "setFilter", filter: copyFilter });
    },
    filterBySearch: debounce(function() {
      this.emitFilter();
    }, 200)
  }
};
</script>

<style>
.task-filter {
  width: fit-content;
}
.all:hover {
  background: white;
}
.red:hover {
  background: rgb(197, 0, 0);
}
.yellow:hover {
  background: rgb(240, 224, 5);
}
.green:hover {
  background: rgb(35, 149, 7);
}
.orange:hover {
  background: rgb(255, 174, 0);
}
.opts-container.open-opts {
  max-height: 200px;
  opacity: 1;
}
.opts-container {
  position: absolute;
  left: 0;
  top: 100%;
  color: #f26531;
  background: #231f20;
  overflow: hidden;
  max-height: 0px;
  width: max-content;
  transition: all 0.25s ease-in-out;
  border-radius: 0px 5px 5px 5px;
  opacity: 0;
  /* box-shadow: 0px 3px 3px 0px #000000; */
}
.opt {
  padding: 5px;
  transition: background 0.2s ease-in;
}

.btn {
  position: relative;
  width: fit-content;
}

.filter-btn span {
  line-height: 37px;
}

.filter-btn {
  display: flex;
  align-items: center;
}

.search {
  margin-right: 20px; 
  max-height: 38px; 
}

.search input {
  border-radius: 5px 0px 0px 5px;
  height: 100%;
}

.search button {
  border-radius: 0px 5px 5px 0px;
  height: 100%;
}

.search img {
  height: 28px;
  padding-top: 8px;
}

.filter-btn.open-opts {
  border-radius: 5px 5px 0px 0px;
}
/*
Black: #231f20
LightOrange: #f26531
WHITE: #f5f5f5
*/
</style>
