class Player {
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
    // this.isSpacePressed = false;
    // this.isJump = false;
  }

  movement(direction) {
    console.log(direction);
    switch (direction) {
      case "W":
      case "w":
        // if (this.isJump === false) {
        this.velocity.y = -Math.sqrt(2 * this.gravity * this.highJump);
        // }
        // this.isJump = true;
        break;

      case "A":
      case "a":
        this.velocity.x = -1 * this.speed;
        break;

      case "D":
      case "d":
        this.velocity.x = 1 * this.speed;
        break;

      case " ":
        // this.isSpacePressed = true;
        ball.velocity.x = player.velocity.x * 5;
        break;

      case "":
        this.velocity.x = 0;
        break;
      default:
        this.position.x;
        this.position.y;
        break;
    }
  }

  stopMovement(direction) {
    switch (direction) {
      case "A":
      case "a":
      case "D":
      case "d":
        this.velocity.x = 0;
        break;
    }
  }

  update() {
    this.isSpacePressed = false;
    const bottomWall = canvas.height - this.height - 70;
    const rightWall = canvas.width - this.width;

    // this.position.y += this.velocity.y
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (player.position.y > bottomWall) {
      this.position.y = bottomWall;
      this.velocity.y = 0;
    }
    if (player.position.y < 0) {
      this.velocity.y *= -1;
      // this.isJump = false;
    }

    if (player.position.x < 0) {
      this.velocity.x *= -1;
    }

    if (player.position.x > rightWall) {
      this.velocity.x *= -1;
    }
    // else{
    //     console.log("aku jatuh tidakk")
    // }
  }

  create() {
    board.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
      // this.speed,
    );
    // board.fillStyle = this.color;
    // board.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  increaseSpeed() {
    this.speed += 0.5;
    console.log(`Speed increased to: ${this.speed}`);
  }
}

function touchBallPlayer(player, ball) {
  const distX = Math.abs(
    (ball.position.x - player.position.x - player.width/2)
  );
  const distY = Math.abs(
    ball.position.y + ball.height / 2 - (player.position.y + player.height / 2 +75)
  );

  if (
    distX <= player.width / 2 + ball.width / 2 -110&&
    distY <= player.height / 2 + ball.height / 2 -50
  ) {
    ball.isJump = false
    ball.velocity.x = player.velocity.x * 1.2;
    ball.velocity.y = -Math.sqrt(2 * ball.gravity * ball.highJump) * 1.2;
  }
}

function touchEnemy(player, enemy) {
  const distX = Math.abs(
    enemy.position.x + enemy.width / 2 - (player.position.x + player.width / 2)
  );
  const distY = Math.abs(
    enemy.position.y +
      enemy.height / 2 -
      (player.position.y + player.height / 2)
  );

  if (
    distX <= player.width / 2 + enemy.width / 2 &&
    distY <= player.height / 2 + enemy.height / 2
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
