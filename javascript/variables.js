let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
var sec = document.getElementById('sec')
let blue = document.querySelector(`#blue`)
let green = document.querySelector(`#green`)
let purple = document.querySelector(`#purple`)
let rand1 = document.querySelector(`#rand1`)
let red = document.querySelector(`#red`)
let orange = document.querySelector(`#orange`)
let yellow = document.querySelector(`#yellow`)
let rand2 = document.querySelector(`#rand2`)
let p1Color = document.querySelector('#p1color')
let p2Color = document.querySelector('#p2color')
let randColorP1 = getRandomColor()
let randColorP2 = getRandomColor()
let battle = new Audio()
battle.src = 'http://23.237.126.42/ost/bang-bang-busters-arcade/fejcqoyf/08_Boss%20Theme%201.mp3'
let finish = new Audio()
finish.src = 'http://23.237.126.42/ost/dragoon-might-arcade/ycrwiwze/05_New%20Beginning%20%28Intermission%29.mp3'
let titleMusic = new Audio()
titleMusic.src = 'http://23.237.126.42/ost/rapid-hero-arcade/lggalrpk/03_Waiting%20for%20Start.mp3'

let interval
let frames = 0
let playBack = 1

const mapLarge = new MapGenerator(10)

mapLarge.basicMap()
const bomb = new Bomb(mapLarge)
const player1 = new PlayerBlock(randColorP1, 0, 0, 0, 0, mapLarge, `p1`, 'images/player1.png')
const player2 = new PlayerBlock(
  randColorP2,
  canvas.width - player1.blockSize,
  canvas.height - player1.blockSize,
  9,
  9,
  mapLarge,
  `p2`,
  'images/player2.png'
)

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var x = 0; x < 6; x++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

let i = 0
let j = 0
function fillerLoop() {
  setTimeout(function() {
    ctx.fillStyle = `${getRandomColor()}`
    ctx.fillRect(i, j, 20, 20)
    i += 20
    if (i < 400) {
      fillerLoop()
    } else if (j < 400) {
      fillerLoop()
      i = 0
      j += 20
    } else if (j >= 400 && i >= 400) return undefined
  }, 1)
}
function titleAppear() {
  titleMusic.play()
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = 'white'
  ctx.font = "30px 'Press Start 2P'"
  ctx.textBaseline = 'bottom'
  ctx.fillText(`Press 'SPACE'`, 15, 150)
  ctx.fillText(`to begin`, 60, 250)
}

function update() {
  frames++
  checkCollition()
  player1.draw()
  player2.draw()
  printSeconds()
  battle.playbackRate = `${(playBack += 0.0005)}`
}

function startGame() {
  titleMusic.pause()
  console.log(mapLarge.arrOutter)
  bomb.draw()
  ctx.globalCompositeOperation = 'source-over'
  mapLarge.drawBasic()
  if (interval) return
  interval = setInterval(update, 1000 / 120)
  battle.play()
  setTimeout(gameOver, 15000)
}

function gameOver() {
  battle.pause()
  finish.play()
  clearInterval(interval)
  interval = false
  determineWinner(mapLarge.arrOutter)
  ctx.fillStyle = `black`
  ctx.font = "20px 'Press Start 2P'"
  ctx.fillText(`${determineWinner(mapLarge.arrOutter)}`, mapLarge.blockSize, canvas.height / 2)
  console.log(mapLarge.arrOutter)
  sec.style = 'font-size: 30px'
  sec.innerText = 'Press "R" to play again'
}

function determineWinner(arr) {
  let p1Score = 0
  let p2Score = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === `p1`) p1Score++
      else if (arr[i][j] === `p2`) p2Score++
    }
  }
  if (p1Score > p2Score) {
    return `Player 1 Wins!!!`
  } else if (p1Score < p2Score) {
    return `Player 2 Wins!!!`
  } else {
    return `It's a Tie!!!!!!`
  }
}

function printSeconds() {
  sec.innerText = 15 - Math.floor(getSeconds())
}

function getSeconds() {
  return (frames / 120) % 60
}

function checkCollition() {
  if (player1.isTouching(bomb)) {
    bomb.x = Math.floor(Math.random() * bomb.length) * bomb.blockSize
    bomb.y = Math.floor(Math.random() * bomb.length) * bomb.blockSize
    if (player1.i != 0) mapLarge.arrOutter[player1.i - 1][player1.j] = 'p1'
    if (player1.i != 0 && player1.j != 0) mapLarge.arrOutter[player1.i - 1][player1.j - 1] = 'p1'
    if (player1.j != 0) mapLarge.arrOutter[player1.i][player1.j - 1] = 'p1'
    if (player1.i != bomb.length - 1) mapLarge.arrOutter[player1.i + 1][player1.j] = 'p1'
    if (player1.i != bomb.length - 1 && player1.j != 0) mapLarge.arrOutter[player1.i + 1][player1.j - 1] = 'p1'
    if (player1.i != bomb.length - 1 && player1.j != bomb.length - 1)
      mapLarge.arrOutter[player1.i + 1][player1.j + 1] = 'p1'
    if (player1.j != bomb.length - 1) mapLarge.arrOutter[player1.i][player1.j + 1] = 'p1'
    if (player1.j != bomb.length - 1 && player1.i != 0) mapLarge.arrOutter[player1.i - 1][player1.j + 1] = 'p1'
    ctx.fillStyle = `${player1.color}`
    ctx.clearRect(
      player1.x - player1.blockSize,
      player1.y - player1.blockSize,
      player1.blockSize * 3,
      player1.blockSize * 3
    )
    ctx.fillRect(
      player1.x - player1.blockSize,
      player1.y - player1.blockSize,
      player1.blockSize * 3,
      player1.blockSize * 3
    )
    bomb.draw()
  } else if (player2.isTouching(bomb)) {
    bomb.x = Math.floor(Math.random() * bomb.length) * bomb.blockSize
    bomb.y = Math.floor(Math.random() * bomb.length) * bomb.blockSize
    if (player2.i != 0) mapLarge.arrOutter[player2.i - 1][player2.j] = 'p2'
    if (player2.i != 0 && player2.j != 0) mapLarge.arrOutter[player2.i - 1][player2.j - 1] = 'p2'
    if (player2.j != 0) mapLarge.arrOutter[player2.i][player2.j - 1] = 'p2'
    if (player2.i != bomb.length - 1) mapLarge.arrOutter[player2.i + 1][player2.j] = 'p2'
    if (player2.i != bomb.length - 1 && player2.j != 0) mapLarge.arrOutter[player2.i + 1][player2.j - 1] = 'p2'
    if (player2.i != bomb.length - 1 && player2.j != bomb.length - 1)
      mapLarge.arrOutter[player2.i + 1][player2.j + 1] = 'p2'
    if (player2.j != bomb.length - 1) mapLarge.arrOutter[player2.i][player2.j + 1] = 'p2'
    if (player2.j != bomb.length - 1 && player2.i != 0) mapLarge.arrOutter[player2.i - 1][player2.j + 1] = 'p2'
    ctx.fillStyle = `${player2.color}`
    ctx.clearRect(
      player2.x - player2.blockSize,
      player2.y - player2.blockSize,
      player2.blockSize * 3,
      player2.blockSize * 3
    )
    ctx.fillRect(
      player2.x - player2.blockSize,
      player2.y - player2.blockSize,
      player2.blockSize * 3,
      player2.blockSize * 3
    )
    bomb.draw()
  }
}
