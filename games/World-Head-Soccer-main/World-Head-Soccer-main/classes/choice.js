// class choice{
//     create(){
//         board.drawImage(playerProperty.image)
//     }
// }

// const player1 = document.getElementById("")

// function choicePlayer(){

//     const imgPlayer1 = document.getElementById("imgPlayer1");
//     const Player1 = imgPlayer1(playerProperty.image)
//     if(!player1){
//         console.log('player tidak ada') 
//     } else{
//         new choice();
//     }

// }  

// var dificuldade;

// function setPlayer(e) {
//     // Para isto usamos uma forma de guardar data no browser, nem todos sao compativeis por isso faz-se este check com o if (parecido cmo a prof faz o check do canvas)
//     if (typeof (Storage) !== "undefined") {
//         dificuldade = e;

//         if (dificuldade == playerProperty.image[0]) {
//             localStorage.setItem("ArrowRight");
//         } else if (dificuldade == playerProperty.image[1]) {
//             localStorage.setItem("ArrowLeft");
//         } else {
//             console.log("A dificuldade nao funcionou...")
//         }
//     } else {
//         alert("Sorry, your browser does not support Web Storage... If you want to play this game you'll need a browser that supports it.");
//         window.open("mainGame.html", "_self");
//     }
// }

// function getDificuldade() {
//     return localStorage.getItem("lastname");
// }


let scrollContainer = document.querySelector('.gallery');
let back = document.getElementById('back');
let next = document.getElementById('next');


scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
})

next.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += 900;
})
back.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += 900;
})