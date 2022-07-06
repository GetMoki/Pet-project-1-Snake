//Сценарій сайту
"use strict";

/*create general variables*/
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
/*this were snake will run*/
const ground = new Image();
ground.src = "img/game/ground.png";
/*this what snake will eat*/
const foodImg = new Image();
foodImg.src = "img/game/apple.png";
/*create cell and size of cell*/
const cell = 32;
/*create variables for score*/
let score = 0;
/*create variables for coordinates */
let food = {
  x: Math.floor((Math.random() * 17 + 1)) * cell,
  y: Math.floor((Math.random() * 17 + 1)) * cell,
};
/*create variables for snake head coordinates */
let snake = [];
snake[0] = {
  x: 9 * cell,
  y: 9 * cell,
};

function drawScore() {
  const scoreDoc = document.getElementById("score");
  scoreDoc.querySelector("span").innerText = score;
}
function drawGameOver() {
  const gameover = document.getElementById("gameover");
  gameover.classList.remove("_off");
}

window.addEventListener("keydown", function (e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != "right")
    dir = "left";
  else if (event.keyCode == 38 && dir != "down")
    dir = "up";
  else if (event.keyCode == 39 && dir != "left")
    dir = "right";
  else if (event.keyCode == 40 && dir != "up")
    dir = "down";
}
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      drawGameOver();
    }
  }
}
let snakeX = snake[0].x;
let snakeY = snake[0].y;
function outrun() {
  if (snakeX < cell || snakeX > cell * 17 || snakeY < cell || snakeY > cell * 17) {
    clearInterval(game);
    drawGameOver();
  }
}

document.addEventListener("keydown", direction);

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "#A6F16C" : "#409300";
    ctx.fillRect(snake[i].x, snake[i].y, cell, cell);
  }

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * cell,
      y: Math.floor((Math.random() * 15 + 3)) * cell,
    };
  } else {
    snake.pop();
  }
  /*функцыя виходу за поле гри*/
  outrun();


  if (dir == "left") snakeX -= cell;
  if (dir == "right") snakeX += cell;
  if (dir == "up") snakeY -= cell;
  if (dir == "down") snakeY += cell;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
  drawScore();
}
let game = setInterval(drawGame, 200);
