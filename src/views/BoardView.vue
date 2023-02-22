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
    this.viewportWidth = ref(window.innerWidth).value*0.99 + 'px';
  },
  mounted() {
    this.generateAvailableTiles();
    this.buildBoard();
    this.board.forEach(col => this.cells = this.cells.concat(col.cells));
    this.mapOutline();
  },
  components: { ATile },
  data() {
    return {
      board: Array<{id: number, cells:Array<{id: number, location: {x: number, y: number}, available: boolean, door: {direction: string, locked: boolean}}>}>(),
      cells: Array(),
      locations: Array<{x: Number, y: Number}>(),
      viewportWidth: '0px',
      xVals: Array(),
      yVals: Array(),
      edges: Array(),
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

    generateAvailableTiles(){
      for (let x = 0; x < 1; x+=1)
      {
        var fromX = Math.floor(Math.random() * 20);
        var fromY = Math.floor(Math.random() * 24);
        var toX = Math.floor(Math.random() * 20);
        var toY = Math.floor(Math.random() * 24);
        while ((fromX > toX) || (fromY > toY))
        {
          fromX = Math.floor(Math.random() * 20);
          fromY = Math.floor(Math.random() * 24);
          toX = Math.floor(Math.random() * 20);
          toY = Math.floor(Math.random() * 24);
        }
        var from = {x: fromX, y: fromY};
        var to = {x: toX+2, y: toY+2};
        for (let i = from.x; i < to.x; i+=1) {
          for (let j = from.y; j < to.y; j+=1) {
            this.locations.push({x: j, y: i});
          }
        }
      }
    },
    mapOutline() {
      let activeCells = this.cells.filter(cell => cell.available == true);
      activeCells = activeCells.map(cell => cell.location);
      let sortedLocations = this.locations.sort((curr,next) => (curr.x < next.x) ? 1 : ((curr.y < next.y) ? -1 : 0));
      let start = sortedLocations[0];
      //console.log(start)
      let visited = new Array().concat({x: start.x, y: start.y});
      let location = start;

      let iteration = 0;
      while (visited.length < activeCells.length*50) {

        const currentCell = this.cells.find(cell => cell.location.x == location.x && cell.location.y == location.y && cell.available);
        let possibleLocations = this.possibleLocations(location);
        let nextCellOptions = new Array();
        let futureCellOptions = new Array();

        for (let i = 0; i < possibleLocations.length; i+=1) {

          var loc = possibleLocations[i];
          const cell = activeCells.find(cell => cell.x == loc.x && cell.y == loc.y && !visited.find(v => loc.x == v.x && loc.y == v.y));

          if (cell) {
            futureCellOptions = new Array();
            let futureLocations = this.possibleLocations(loc);
            futureLocations.forEach(l => {
              const futureCells = activeCells.find(cell => cell.x == l.x && cell.y == l.y);
              if (futureCells) futureCellOptions = futureCellOptions.concat(futureCells);
            });
            let score = 0;
            if (futureCellOptions.length == 4) score = 0;
            if (futureCellOptions.length == 3) score = 1;
            if (futureCellOptions.length == 2) score = 2;
            if (futureCellOptions.length == 1) score = 3;
            if (futureCellOptions.length == 0) score = 4;

            nextCellOptions = nextCellOptions.concat({cell, score: score});
          }
        }
        console.log("nextCellOptions");
        console.log(nextCellOptions);
        let startFound = nextCellOptions.find(c => c.cell == visited[0]);
        console.log(startFound);
        if (startFound) {
          this.edges = this.edges.concat({from: {x: location.x, y: location.y}, to: {x: startFound.cell.x, y: startFound.cell.y}});
          console.log("startFound");
          break;
        }

        let nextCell = nextCellOptions.sort((curr,next) => (curr.score < next.score) ? 1 : ((curr.score < next.score) ? -1 : 0))[0];
        if (nextCell) {
          this.edges = this.edges.concat({from: {x: location.x, y: location.y}, to: {x: nextCell.cell.x, y: nextCell.cell.y}});
          location = {x: nextCell.cell.x, y: nextCell.cell.y};
        } else break;

        // if (iteration > 5) break;
        visited = visited.concat(location);
        iteration +=1;
      }
      console.log(this.edges);
    },
    possibleLocations(location) {
      return  [
          {x: location.x + 1, y: location.y}, //right
          {x: location.x, y: location.y + 1}, //down
          {x: location.x - 1, y: location.y}, //left
          {x: location.x, y: location.y - 1}, //up
        ];
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

