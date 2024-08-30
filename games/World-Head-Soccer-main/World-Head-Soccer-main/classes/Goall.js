class Goall {
  constructor(image,position, width, height,) {
    this.image = new Image(), 
    this.image.src = image, 
    this.width = width,
    this.height = height;
    this.position = position = {
      x: position.x,
      y: position.y,
    };
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
