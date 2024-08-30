class Timer {
  constructor(value, width, height) {
     this.value = value,
     this.width = width,
     this.height = height;
     this.font = "40px Arial";
     this.textColor = "white";
      this.shadowColor = "rgba(0, 0, 0, 0.5)";
     this.shadowBlur = 10;  }

  create(){

    // TEXT 1
    board.fillStyle = this.textColor
    board.font = this.font
    board.textAlign = "center"
    board.textBaseline= "middle"
    board.fillText(`Timer`, canvas.width / 2, canvas.height / 4 + this.height/2);

    
    // TEXT 2
    board.fillText(`30`, canvas.width / 2, canvas.height / 4 + this.height + 30);
    board.fillStyle = this.textColor
    board.font = this.font
    board.textAlign = "center"
    board.textBaseline= "middle"

  }
}

const timer = document.getElementById("timer").innerHTML = parseInt(document.getElementById("timer").innerHTML) +1;
