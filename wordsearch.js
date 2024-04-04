const elements = {};

const words = [
  "dog",
  "buffalo",
  "cat",
  "pig",
  "cow",
  "mouse",
  "horse",
  "chicken",
  "cattle",
  "goose",
  "llama",
  "sheep",
  "mule",
  "turkey",
];
const gameObj = {
  row: 5,
  col: 5,
  wid: 80,
  x: "",
  y: "",
  arr: [],
  placedWords: [],
  bArray: [],
};

const game = () => {
  elements.gameSpace = document.querySelector(".gameSpace");
  elements.grid = document.createElement("div");
  elements.grid.style.margin = 'auto';
  elements.message = document.createElement("div");
  elements.grid.classList.add("grid");
  elements.list = document.createElement("div");
  elements.start = document.createElement("button");
  elements.gridSize = document.createElement("input");
  elements.list.classList.add("list");

  // element.gameSpace.textContent = "Game Ready";
  elements.gameSpace.append(elements.message);
  elements.gameSpace.append(elements.start);
  elements.gameSpace.append(elements.gridSize);
  elements.gameSpace.append(elements.start);
  elements.gameSpace.append(elements.grid);
  elements.gameSpace.append(elements.list);

  elements.gridSize.setAttribute("type", "number");
  elements.gridSize.setAttribute("max", "20");
  elements.gridSize.setAttribute("min", "5");
  log("Click Here to Start Game. Select grid size");
  elements.start.textContent = "Click to Start";
  elements.gridSize.value = 5;
  elements.start.addEventListener("click", startGame);
  //   console.log(elements);
};

const startGame = () => {
  log('Find the words')
  elements.gridSize.style.display = "none";
  elements.start.style.display = "none";
  gameObj.row = Number(elements.gridSize.value); //rows
  gameObj.col = Number(elements.gridSize.value); //columns
  gameObj.x = "";
  gameObj.y = "";
  gameObj.bArray.length = 0;
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
    if (temp) {
      gameObj.placedWords.push({
        word: val,
        position: temp,
      });
    }
  });
  console.log(gameObj);
  addLetters();
  buildBoard();

  elements.list.innerHTML = "";
  gameObj.placedWords.forEach((w) => {
    w.element = document.createElement("div");
    w.element.textContent = w.word;
    w.element.arr = w.position;
    elements.list.append(w.element);
  });
  console.log(gameObj);
};

const addLetters = () => {
  for (let i = 0; i < gameObj.arr.length; i++) {
    if (gameObj.arr[i] == "-") {
      gameObj.arr[i] = random();
    }
  }
};

const random = () => {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split("")[
    Math.floor(Math.random() * 26)
  ];
};

const placeWord = (word) => {
  console.log(word);
  let placed = false;
  let count = 300;
  word = Math.random() > 0.5 ? word : word.split("").reverse().join("");

  while (!placed && count > 0) {
    count--;
    let position = { cols: 0, rows: 0 };
    let dir = Math.random() > 0.5 ? true : false;
    if (dir && word.length <= gameObj.col) {
      position.cols = startPosition(word.length, gameObj.col);
      position.rows = Math.floor(Math.random() * gameObj.row);
      placed = xSpot(position, word);
    } else if (!dir && word.length <= gameObj.row) {
      position.rows = startPosition(word.length, gameObj.row);
      position.cols = Math.floor(Math.random() * gameObj.col);
      placed = ySpot(position, word);
    }
  }
  return placed;
};

const ySpot = (coor, word) => {
  let start = coor.rows * gameObj.col + coor.cols;
  let okayCounter = 0;
  let inPlaced = [];
  for (let i = 0; i < word.length; i++) {
    if (gameObj.arr[start + i * gameObj.col] == "-") {
      okayCounter++;
    }
  }
  if (okayCounter == word.length) {
    for (let i = 0; i < word.length; i++) {
      if (gameObj.arr[start + i * gameObj.col] == "-") {
        gameObj.arr[start + i * gameObj.col] = word[i];
        inPlaced.push(start + i * gameObj.col);
      }
    }
    return inPlaced;
  }
  return false;
};

const xSpot = (coor, word) => {
  let start = coor.rows * gameObj.row + coor.cols;
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
    div.addEventListener("click", (e) => {
      console.log(index);
      console.log(gameObj.arr[index]);
      gameObj.bArray[index] = true;
      let check = { found: 0, word: "" };
      gameObj.placedWords.forEach((w) => {
        if (w.position.includes(index)) {
          check.found++;
          check.word = w.word;
        }
        console.log(check);
      });
      if (check.found > 0) {
        div.style.backgroundColor = "green";
      } else {
        div.style.backgroundColor = "red";
      }
      checked();
    });
  });
};

const checked = () => {
  gameObj.placedWords.forEach((w, ind) => {
    let check = 0;
    gameObj.bArray.forEach((val, index) => {
      if (w.position.includes(index)) {
        check++;
      }
    });
    if (check == w.word.length) {
      w.element.style.color = "red";
      w.element.style.textDecoration = "line-through";
    }
  });

  winner();
}
const log = (msg) => {
  elements.message.innerHTML = msg;
}
const winner = () => {
  let counter = 0;
  gameObj.placedWords.forEach((w, ind) => {
    if (w.element.style.textDecoration == "line-through") {
      counter++;
    }
  });
  log(gameObj.placedWords.length - counter + " Words left");
  if (gameObj.placedWords.length - counter == 0 || gameObj.placedWords.length == 0) {
    log("Completed");
    elements.gridSize.style.display = "inline-block";
    elements.start.style.display = "inline-block";
    elements.start.innerHTML = "Play again";
  }
};

document.addEventListener("DOMContentLoaded", game);