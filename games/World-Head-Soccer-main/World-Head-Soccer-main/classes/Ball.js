class Ball {
  constructor(image,position, height, width) {
    this.image = new Image();
    this.image.src = image;
    this.width = width;
    this.height = height;
    this.position = position = {
        x: position.x,
        y: position.y,

    }

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.highJump = 100;
    this.gravity = 0.5;

    this.isJump = false;
  }

  jump(){
    this.velocity.y = -Math.sqrt(2 * this.gravity * this.highJump)
    this.isJump = true;

  }


  update() {
    // Apply gravity
    const bottomWall = canvas.height - this.height -100;
    const rightWall = canvas.width - this.width /2;
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;

    // Prevent falling through the bottom of the canvas
    if(this.position.y > bottomWall){
      this.position.y  = bottomWall
      this.velocity.y *= -0.5
      this.isJump = false
      // this.jump()
    }

   if(this.position.x > rightWall){
    this.position.x = rightWall 
   }

    // Move horizontally (if needed)
    this.position.x += this.velocity.x;
  }

  
  create(){
    board.drawImage(this.image,this.position.x, this.position.y, this.height, this.width,)
  }
}
