// ----------------- Particle Background -------------------
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();


// ---------------- Tic Tac Toe Game ------------------
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let status = document.getElementById("status");
let cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    let index = cell.getAttribute("data-index");

    if (board[index] === "") {
      board[index] = currentPlayer;
      cell.innerText = currentPlayer;

      if (checkWinner()) {
        status.innerText = currentPlayer + " Wins!";
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.innerText = "Player " + currentPlayer + " Turn";
    }
  });
});

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(pattern => {
    let [a,b,c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

document.getElementById("restart").onclick = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(c => c.innerText = "");
  currentPlayer = "X";
  status.innerText = "Player X Turn";
};
