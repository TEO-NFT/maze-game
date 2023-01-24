const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
  console.log("Hi");
}

function startGame() {
  game.font = elementsSize - 8 + "px Verdana";
  game.textAlign = "end";

  const map = maps[0];
  const mapRows = maps[1].trim().split("\n");
  const mapCols = mapRows.map((row) => row.trim().split(""));

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(emojis[mapCols[row-1][col-1]], elementsSize * col, elementsSize * row);
    }
  }
}
