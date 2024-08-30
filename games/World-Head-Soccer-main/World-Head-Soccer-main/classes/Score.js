class Score {
    constructor(width, height, color) {
      this.color = color;
      this.width = width;
      this.height = height;
      this.value1 = 0;
      this.value2 = 0;
      this.font = "40px Arial";
      this.textColor = "white";
      this.shadowColor = "rgba(0, 0, 0, 0.5)";
      this.shadowBlur = 10;
    //   this.buttonElement = buttonElement; // Referensi ke elemen button
    }
    
    create() {
      // Gaya kotak skor
      board.fillStyle = this.color;
      board.fillRect(canvas.width / 2 - this.width / 2, canvas.height / 10, this.width, this.height);
      
      // Gaya teks skor
      board.fillStyle = this.textColor;
      board.font = this.font;
      board.textAlign = "center";
      board.textBaseline = "middle";
      
      // Menambahkan bayangan teks
      board.shadowColor = this.shadowColor;
      board.shadowBlur = this.shadowBlur;
      
      // Menggambar teks skor
      board.fillText(`${this.value1}   :   ${this.value2}`, canvas.width / 2, canvas.height / 10 + this.height / 2);
      
      // Menghapus bayangan setelah menggambar teks
      board.shadowBlur = 10;
  
      // Perbarui teks pada elemen button

      //pakai ini saat ingin mengambil id html
    //   this.buttonElement.textContent = `Score: ${this.value}`;

    // this.textContent = `Score: ${this.value1} : ${this.value2}`;
    }
    
    increase(player) {
        if (player === "player") {
          this.value1 += 1; // Tambah nilai skor untuk player
        } else if (player === "enemy") {
          this.value2 += 1; // Tambah nilai skor untuk enemy
        }
      }
    }

    function checkGoal() {
        // Misalnya, asumsi goal berada di kiri dan kanan canvas
        const goalLeft = 100;
        const goalRight = canvas.width;
      
        // Kondisi untuk mencetak gol
        if (ball.position.x <= goalLeft) {
          score.increase("enemy"); // Enemy mencetak gol
          resetBall(),resetPlayer(),resetEnemy() // Atur ulang posisi bola
        } else if (ball.position.x + ball.width >= goalRight) {
          score.increase("player"); // Player mencetak gol
          resetBall(),resetPlayer(),resetEnemy() // Atur ulang posisi bola
        }
      }
  

      function resetBall() {
        ball.position.x = canvas.width / 2;
        ball.position.y = canvas.height / 2;
        ball.velocity.x = 0;
        ball.velocity.y = 0;
      }
      function resetPlayer() {
        player.position.x = playerProperty.position.x;
        player.position.y = playerProperty.position.y;
        player.velocity.x = 0;
        player.velocity.y = 0;
      }
      function resetEnemy() {
        enemy.position.x =  enemyProperty.position.x;
        enemy.position.y =  enemyProperty.position.y;
        enemy.velocity.x = 0;
        enemy.velocity.y = 0;
      }

  function totalScore () {
    const goal = goalProperty.width;
    if (player.position.x && ball.position.x > goal) { // Contoh kondisi untuk mencetak skor
      value1.increase();
    }
  }
    