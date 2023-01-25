const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const buttonUp = document.querySelector("#up");
const buttonLeft = document.querySelector("#left");
const buttonRight = document.querySelector("#right");
const buttonDown = document.querySelector("#down");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
  key: undefined,
};

const key = {
  x: undefined,
  y: undefined,
};

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
  const mapRows = map.trim().split("\n");
  const mapCols = mapRows.map((row) => row.trim().split(""));

  game.clearRect(0, 0, canvasSize, canvasSize);
  mapCols.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colIdx + 1);
      const posY = elementsSize * (rowIdx + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col == "I") {
        key.x = posX;
        key.y = posY;
      }

      game.fillText(emoji, posX, posY);
    });
  });
  console.log(key);
  movePlayer();
}

function movePlayer() {
  const a = playerPosition.x == key.x;
  const b = playerPosition.y.toFixed(1) == key.y;
  const ab = a && b;

  console.log(ab);
  console.log(key);

  if (ab) {
    playerPosition.key = true;
  }
  console.log(playerPosition);
  game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
}

window.addEventListener("keydown", moveKey);
buttonUp.addEventListener("click", moveUp);
buttonLeft.addEventListener("click", moveLeft);
buttonRight.addEventListener("click", moveRight);
buttonDown.addEventListener("click", moveDown);

function moveUp() {
  if (playerPosition.y - elementsSize < elementsSize) {
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}

function moveLeft() {
  if (playerPosition.x - elementsSize < elementsSize) {
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}

function moveRight() {
  if (playerPosition.x + elementsSize > canvasSize) {
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}

function moveDown() {
  if (playerPosition.y + elementsSize > canvasSize) {
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}

function moveKey(event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;

    case "ArrowLeft":
      moveLeft();
      break;

    case "ArrowRight":
      moveRight();
      break;

    case "ArrowDown":
      moveDown();
      break;
  }
}
