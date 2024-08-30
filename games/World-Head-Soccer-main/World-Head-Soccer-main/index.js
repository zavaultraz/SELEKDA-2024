const canvas = document.querySelector("canvas");
/** @type {HTMLCanvasElement} */
const board = canvas.getContext("2d");

canvas.width = 1500;
canvas.height = 750;

const playerProperty = {
  image: "assets/Characters/CharacterBrazil/Idle/Idle_000.png",
  width: 250,
  height: 250,
  color: "red",
  speed: 5,
  position: {
    x: canvas.width - 1250,
    y: canvas.height - 600,
  },
};
const enemyProperty = {
  image: "assets/Characters/CharacterEngland/Idle/Idle_002.png",
  width: 250,
  height: 250,
  speed: 5,
  position: {
    x: canvas.width - 500,
    y: canvas.height - 600,
  },
};

const ballProperty = {
  image: "assets/main/Ball02.png",
  position: { x: canvas.width / 2 - 50, y: canvas.height - 600 },
  width: 100,
  height: 100,
};

const goalProperty = {
  image: "assets/main/Goal.png",
  position: { x: canvas.width / 15 - 37, y: canvas.height / 2 + 15 },
  width: 140,
  height: 250,
};
const goalProperty2 = {
  image: "assets/main/Goal1.png",
  position: { x: canvas.width - 200, y: canvas.height / 2 + 15 },
  width: 140,
  height: 250,
};
const flagboardProperty = {
  images: ["assets/Flag/Brazil.png", "assets/Flag/England.png"],
  position: { x: canvas.width / 300, y: canvas.height / 2 + 100 },
  width: 100,
  height: 75,
};

const ground = new Ground(
  "assets/main/background1.jpg",
  canvas.width,
  canvas.height
);

const player = new Player(playerProperty);
const enemy = new Enemy(enemyProperty);
const score = new Score(200, 80, "darkblue");
// const timer = new Timer(0, 150, 50);
const ball = new Ball(
  ballProperty.image,
  ballProperty.position,
  ballProperty.width,
  ballProperty.height
);
const goal = new Goal(
  goalProperty.image,
  goalProperty.position,
  goalProperty.width,
  goalProperty.height
);
const goall = new Goall(
  goalProperty2.image,
  goalProperty2.position,
  goalProperty2.width,
  goalProperty2.height
);
const flagboard = new Flagboard(
  flagboardProperty.images,
  flagboardProperty.position,
  flagboardProperty.width,
  flagboardProperty.height
);

function animate() {
  // board.clearRect(0, 0, canvas.width, canvas.height);

  ground.create();
  flagboard.create();
  enemy.create();
  ball.create();
  player.create();
  goal.create();
  goall.create();
  score.create();
  // timer.create();
  player.update();
  enemy.update();
  ball.update();

  touchBallEnemy(enemy, ball);
  touchBallPlayer(player, ball);
  // touchEnemy(player, enemy);
  // touchPlayer(player, enemy);
  checkGoal();
  score.create();

  window.requestAnimationFrame(animate);
}

window.addEventListener("keydown", function (e) {
  player.movement(e.key);
  enemy.movement(e.key);
  // ball.movement()(e.key)
});

window.addEventListener("keyup", function (e) {
  player.stopMovement(e.key);
  enemy.stopMovement(e.key);
});

animate();
