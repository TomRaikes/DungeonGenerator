
<template>
  <div class="tile" :style="available ? 'background-color: white;' : 'background-color: black;'">
    <p>x: {{ tileLocation.x }}, y: {{ tileLocation.y }}, id: {{ id }}</p>
  </div>  
</template>

<script lang="ts">
export default {
  props: {
    cell: Object,
  },
  setup(props) {
    const location = props?.cell?.location;
    const id = props?.cell?.id;
    const available = props?.cell?.available;
    const isEdge = props?.cell?.isEdge;
    return { 
      location,
      id,
      available,
      isEdge,
    }
  },
  created() {
    this.tileLocation = this.location;
  },
  data() {
    return {
      tileLocation: {x: Number, y: Number},
      damage: 0,
    }
  }
}
</script>

<style scoped>
.tile {
  
  border: 1px solid red;
  width: 100%;
  height: 100%;
}
</style>
