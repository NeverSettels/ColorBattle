let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext('2d');
let randColorP1 = getRandomColor()
let randColorP2 = getRandomColor()
let interval 


const mapLarge = new MapGenerator(10)
const player1 = new PlayerBlock(randColorP1, 0, 0, mapLarge)
const player2 = new PlayerBlock(randColorP2, canvas.width - player1.blockSize, canvas.height - player1.blockSize, mapLarge)

    
     