class Enemy {
  constructor(props) {
    this.image = new Image();
    this.image.src = props.image;
    this.width = props.width;
    this.height = props.height;
    this.speed = props.speed;
    this.position = {
      x: props.position.x,
      y: props.position.y,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.highJump = 100;
    this.gravity = 0.5;

    this.flip = props.flip || false; // Menambahkan properti flip
  }

  movement(direction) {
    console.log(direction);
    switch (direction) {
      case "ArrowUp":
        this.velocity.y = -Math.sqrt(2 * this.gravity * this.highJump);
        ball.isJump = true
        break;

      case "ArrowDown":
        this.velocity.y = 1 * this.speed;
        break;

      case "ArrowLeft":
        this.velocity.x = -1 * this.speed;
        break;

      case "ArrowRight":
        this.velocity.x = 1 * this.speed;
        break;

        case "Enter":
        case "Enter":
        ball.velocity.x = enemy.velocity.x * 5;
        break;

      default:
        this.position.x;
        this.position.y;
        break;
    }
  }

  stopMovement(direction) {
    switch (direction) {
      case "ArrowLeft":
      case "ArrowRight":
        this.velocity.x = 0;
        break;
    }
  }

  update() {
    const bottomWall = canvas.height - this.height - 70;
    const rightWall = canvas.width - this.width;

    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (enemy.position.y > bottomWall) {
      this.position.y = bottomWall;
    }
    if (enemy.position.y < 0) {
      this.velocity.y *= -1;
    }

    if (enemy.position.x < 0) {
      this.velocity.x *= -1;
    }

    if (enemy.position.x > rightWall) {
      this.velocity.x *= -1;
    }
  }

  create() {
    board.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

function touchBallEnemy(enemy, ball) {
  const distX = Math.abs(ball.position.x - enemy.position.x - enemy.width / 2);
  const distY = Math.abs(ball.position.y - enemy.position.y - enemy.height / 2);

  if (
    distX <= enemy.width / 2 + ball.width / 2 - 50 &&
    distY <= enemy.height / 2 + ball.height / 2 - 50
  ) {
    ball.isJump = false
    ball.velocity.x = enemy.velocity.x * 1.2;
    ball.velocity.y = -Math.sqrt(2 * ball.gravity * ball.highJump) * 1.2;
  }
}

function touchPlayer(player, enemy) {
  const distX = Math.abs(
    enemy.position.x + enemy.width / 2 - (player.position.x + player.width / 2)
  );
  const distY = Math.abs(
    enemy.position.y +
      enemy.height / 2 -
      (player.position.y + player.height / 2)
  );

  if (
    distX <= player.width / 2 + ball.width / 2 - 110 &&
    distY <= player.height / 2 + ball.height / 2 - 50
  ) {
    // Jika terjadi tabrakan, sesuaikan posisi player dan enemy agar tidak saling menembus
    if (distX > distY) {
      // Tabrakan lebih dominan secara horizontal
      if (player.position.x < enemy.position.x) {
        player.position.x = enemy.position.x - player.width + 200;
      } else {
        player.position.x = enemy.position.x + enemy.width;
      }
    } else {
      // Tabrakan lebih dominan secara vertikal
      if (player.position.y < enemy.position.y) {
        player.position.y = enemy.position.y - player.height;
      } else {
        player.position.y = enemy.position.y + enemy.height;
      }
    }
  }
}
