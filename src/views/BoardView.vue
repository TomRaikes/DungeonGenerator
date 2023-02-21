<template>
  <div class="board">
    <div class="container-fluid">
      <div class="row-cols-md-10">
        <div v-for="columns in table" :key="columns.id" class="row">
          <div v-for="cell in columns.cells" :key="cell.id" class="col" style="padding:0; margin:0;">
            <a-tile :cell="cell"></a-tile>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ATile from '../components/ATile.vue'

export default {
  mounted() {
    this.mapOutline();
    this.buildBoard();
  },
  components: { ATile },
  data() {
    return {
      table: Array<{id: number, cells:Array<{id: number, location: {x: number, y: number}, available: boolean, door: {direction: string, locked: boolean}}>}>(),
      locations: Array<{x: Number, y: Number}>(),
    }
  },
  methods: {
    buildBoard() {
      let id = 0;
      for (let i = 0; i < 15; i+=1)
      {
        var col = new Array();
        for (let j = 0; j < 24; j+=1)
        {
          col[j] = {id: id, location:{x: j, y: i}, available: this.locations.find(loc => loc.x === j && loc.y === i) ? true : false};
          id+=1;
        }
        this.table[i] = {id: i, cells:col};
      }
    },

    mapOutline(){
      for (let x = 0; x < 8; x+=1)
      {
        var fromX = Math.floor(Math.random() * 15);
        var fromY = Math.floor(Math.random() * 24);
        var toX = Math.floor(Math.random() * 15);
        var toY = Math.floor(Math.random() * 24);
        while ((fromX > toX) || (fromY > toY))
        {
          fromX = Math.floor(Math.random() * 15);
          fromY = Math.floor(Math.random() * 24);
          toX = Math.floor(Math.random() * 15);
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
      let edges = this.locations.filter(loc => loc.x == 0 || loc.x == 24);
      edges = edges.concat(this.locations.filter(loc => loc.y == 0 || loc.y == 15));
      if (edges.length > 0) {
        var edge = edges[Math.floor(Math.random()*edges.length)];
        var cells = new Array();
        console.log(this.table.entries().next());
        for (var i = 0; i < this.table.length; i+=1) {
          console.log("here");
          console.log(this.table[i].cells.find(z => z.location.x == edge.x && z.location.y == edge.y));
          cells[i] = this.table[i].cells.find(z => z.location.x == edge.x && z.location.y == edge.y);

        }
        console.log(cells);
        //console.log(this.table.values(s => s.cells.find(z => z.location.x == edge.x && z.location.y == edge.y)));
        
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

<style scoped>
  .board {
    padding:10px;
  }
</style>

