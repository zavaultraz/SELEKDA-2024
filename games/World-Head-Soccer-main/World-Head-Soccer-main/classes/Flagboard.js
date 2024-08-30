class Flagboard {
  constructor(images, position, width, height) {
    this.images = images.map(src => {
        const img = new Image();
        img.src = src;
        return img;
      });
      this.position = {
        x: position.x,
        y: position.y,
      };
    this.width = width;
    this.height = height;
    this.imagesLoaded = [false, false, false, false,];

    this.images.forEach((image, index) => {
        image.onload = () => {
          this.imagesLoaded[index] = true;
        //   console.log(`Flagboard image ${index + 1}.`);
        };
      });
    }
  

  create() {
    if (this.images) {
        for (let i = 0; i < 15; i++) {
          const img = this.images[i % 2];
          const xPos = this.position.x + (i * this.width - 5);
          board.drawImage(img, xPos, this.position.y, this.width, this.height);
          // console.log(i, i % 3);
        }
    }
  }
}
