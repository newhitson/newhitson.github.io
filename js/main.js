const Game = require("./game");


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 940;
  canvasEl.height = 627;

  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx, canvasEl).startGame();
});
