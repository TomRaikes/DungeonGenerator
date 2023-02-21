import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const board = defineStore('board', () => {
  const currentBoard = Array<{id: number, cells:Array<{id: number, location: {x: number, y: number}}>}>();
  var previousBoards = Array<Array<{id: number, cells:Array<{id: number, location: {x: number, y: number}}>}>>();
  function setBoard(board :any)
  {
    try {
      this.currentBoard = board;
    } catch (error) {
      console.log(error);
    }
  }
  return { board }
})
