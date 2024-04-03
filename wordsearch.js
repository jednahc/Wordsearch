const elements = {};
const words = ["dog", "buffalo", "cat", "pig", "cow", "mouse", "horse", "chicken", "cattle", "goose", "llama", "sheep", "Mule", "turkey"];
const gameObj = { row: 5, col: 5, wid: 25, x: "", y: "", arr: [], placedWords:[] };

const game = () => {
  elements.gameSpace = document.querySelector(".gameSpace");
  elements.grid = document.createElement("div");
  elements.grid.classList.add("grid");
  elements.list = document.createElement("div");
  elements.gridSize = document.createElement("input");
  elements.start = document.createElement("button");

  // element.gameSpace.textContent = "Game Ready";
  elements.gameSpace.append(elements.grid);
  elements.gameSpace.append(elements.list);
  elements.gameSpace.append(elements.gridSize);
  elements.gameSpace.append(elements.start);

  elements.gridSize.setAttribute("type", "number");
  elements.grid.textContent =
    "Click Here to Start Game. Select the number of cells for the grid";
  elements.start.textContent = "Click to Start";
  elements.gridSize.value = 5;
  elements.start.addEventListener("click", startGame);
//   console.log(elements);
};

const startGame = () => {
  console.log("start game");
  gameObj.row = Number(elements.gridSize.value); //rows
  gameObj.col = Number(elements.gridSize.value); //columns
  gameObj.x = "";
  gameObj.y = "";
  gameObj.arr.length = 0;
  gameObj.arr.length = gameObj.row * gameObj.col;
  gameObj.placedWords.length = 0;

  for (let i = 0; i < gameObj.arr.length; i++) {
    gameObj.arr[i] = "-";
  }

  for (let a = 0; a < gameObj.row; a++) {
    gameObj.x += " auto";
  }

  for (let b = 0; b < gameObj.row; b++) {
    gameObj.y += " auto";
  }

//   console.log(gameObj);
  elements.grid.style.gridTemplateColumns = gameObj.x;
  elements.grid.style.gridTemplateRows = gameObj.y;

  words.forEach((val, index) => {
    let temp = placeWord(val);
    if(temp){
        gameObj.placedWords.push({
            word: val, position: temp
        });
    }
  })
  console.log(gameObj);
  addLetters()
  buildBoard();

elements.list.innerHTML = '';
game.placedWords.forEach((wor) => {
    wor.element = document.createElement('div')
    wor.element.textContent = wor.word
    wor.element.arr = wor.position;
    elements.list.append(wor.element);
})
}

const addLetters = () => {
    for(let i = 0; i < gameObj.arr.length; i++){
        if(gameObj.arr[i] == '-'){
            gameObj.arr[i]=random();
        }
    }
}

const random = () => {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase().split('')[
    Math.floor(Math.random() * 26)
  ];
}

const placeWord = (word) => {
  console.log(word);
  let placed = false;
  let count = 300;
  word = (Math.random() > 0.5) ? word: word.split('').reverse().join('');
//   console.log(word);
  while (!placed && count > 0) {
    count--;
    let position = { cols: 0, rows: 0 };
    let dir = (Math.random() > 0.5) ? true : false;
    if (dir && word.length <= gameObj.col) {
      position.cols = startPosition(word.length, gameObj.col);
      position.rows = Math.floor(Math.random() * gameObj.row);
      placed = xSpot(position, word);
  }
  else if(!dir && word.length <= gameObj.row){
    position.rows = startPosition(word.length, gameObj.row);
      position.cols = Math.floor(Math.random() * gameObj.col);
      placed = ySpot(position, word);
   }
 }
 return placed;
};


const ySpot = (coor, word) => {
  let start = (coor.rows * gameObj.col) + coor.cols;
  let okayCounter = 0;
  let inPlaced = [];
  for (let i = 0; i < word.length; i++) {
    if (gameObj.arr[start + (i * gameObj.col)] == "-") {
      okayCounter++;
    }
  }
  if (okayCounter == word.length) {
    for (let i = 0; i < word.length; i++) {
      if (gameObj.arr[start + (i * gameObj.col)] == "-") {
        gameObj.arr[start + (i * gameObj.col)] = word[i];
        inPlaced.push(start + (i * gameObj.col));
      }
    }
    return inPlaced;
  }
  return false;
};

const xSpot = (coor, word) => {
  let start = (coor.rows * gameObj.row) + coor.cols;
  let okayCounter = 0;
  let inPlaced = [];
  for (let i = 0; i < word.length; i++) {
    if (gameObj.arr[start + i] == "-") {
      okayCounter++;
    }
  }
  if (okayCounter == word.length) {
    for (let i = 0; i < word.length; i++) {
      if (gameObj.arr[start + i] == "-") {
        gameObj.arr[start + i] = word[i];
        inPlaced.push(start + i);
      }
    }
    return inPlaced;
  }
  return false;
};

startPosition = (wordValue, total) => {
  return Math.floor(Math.random() * (total - wordValue + 1));
};

const buildBoard = () => {
  elements.grid.innerHTML = "";
  gameObj.arr.forEach((element, index) => {
    let div = document.createElement("div");
    div.textContent = element;
    div.classList.add("grid-item");
    elements.grid.append(div);
  });
};
document.addEventListener("DOMContentLoaded", game);
