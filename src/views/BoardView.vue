<template>
  <div id="board">
    <div class="container-fluid" id="angrybox">
      <div class="row-cols-md-10">
        <div v-for="columns in board" :key="columns.id" class="row">
          <div v-for="cell in columns.cells" :key="cell.id" class="col" style="padding:0; margin:0;">
            <a-tile :cell="cell"></a-tile>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import ATile from '../components/ATile.vue'

export default {
  created() {
    this.viewportWidth = ref(window.innerWidth).value + 'px';
  },
  mounted() {
    this.mapOutline();
    this.buildBoard();
  },
  components: { ATile },
  data() {
    return {
      board: Array<{id: number, cells:Array<{id: number, location: {x: number, y: number}, available: boolean, door: {direction: string, locked: boolean}}>}>(),
      locations: Array<{x: Number, y: Number}>(),
      viewportWidth: '0px',
    }
  },
  methods: {
    buildBoard() {
      let id = 0;
      for (let i = 0; i < 20; i+=1)
      {
        var col = new Array();
        for (let j = 0; j < 24; j+=1)
        {
          col[j] = {id: id, location:{x: j, y: i}, available: this.locations.find(loc => loc.x === j && loc.y === i) ? true : false};
          id+=1;
        }
        this.board[i] = {id: i, cells:col};
      }
    },

    mapOutline(){
      for (let x = 0; x < 8; x+=1)
      {
        var fromX = Math.floor(Math.random() * 21);
        var fromY = Math.floor(Math.random() * 24);
        var toX = Math.floor(Math.random() * 21);
        var toY = Math.floor(Math.random() * 24);
        while ((fromX > toX) || (fromY > toY))
        {
          fromX = Math.floor(Math.random() * 21);
          fromY = Math.floor(Math.random() * 24);
          toX = Math.floor(Math.random() * 21);
          toY = Math.floor(Math.random() * 24);
        }
        var from = {x: fromX, y: fromY};
        var to = {x: toX, y: toY};
        for (let i = from.x; i < to.x; i+=1) {
          for (let j = from.y; j < to.y; j+=1) {
            this.locations.push({x: j, y: i});
          }
        }
      }
      this.locations.forEach((loc) => {
        const possibleLocations = [
          {x: loc.x + 1, y: loc.y},
          {x: loc.x, y: loc.y + 1},
          {x: loc.x - 1, y: loc.y},
          {x: loc.x, y: loc.y - 1}
        ];
        //if (this.locations.contains(loc.x)
      });
      let edges = this.locations.filter(loc => loc.x == 0 || loc.x == 24);
      edges = edges.concat(this.locations.filter(loc => loc.y == 0 || loc.y == 21));
      if (edges.length > 0) {
        var edge = edges[Math.floor(Math.random()*edges.length)];
        var cells = new Array();
        console.log(this.board.entries().next());
        for (var i = 0; i < this.board.length; i+=1) {
          console.log("here");
          console.log(this.board[i].cells.find(z => z.location.x == edge.x && z.location.y == edge.y));
          cells[i] = this.board[i].cells.find(z => z.location.x == edge.x && z.location.y == edge.y);

        }
        //console.log(this.board.values(s => s.cells.find(z => z.location.x == edge.x && z.location.y == edge.y)));
        
        if (edge.x == 0) { //top
          
        }
        else if (edge.x == 23) { //bottom

        }
        
        if (edge.y == 0) { //left

        }
        else if (edge.y == 14) { //right

        }
      }
    },
  }
}
</script>

<style>
  #board {
    padding:10px;
    background-color: black;
  }

  #angrybox {
    min-width: v-bind(viewportWidth) !important;
  }
</style>

