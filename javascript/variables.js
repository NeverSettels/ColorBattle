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
let large = document.querySelector('#mapLarge')
let med = document.querySelector('#mapMid')
let small = document.querySelector('#mapSmall')
let mapText = document.querySelector('#mapSelector')
let mute = document.querySelector('.mute')
let unmute = document.querySelector('.unmute')
let player1Score = document.querySelector('#player1Score')
let player2Score = document.querySelector('#player2Score')
let randColorP1 = getRandomColor()
let randColorP2 = getRandomColor()
let battle = new Audio()
battle.src = 'http://23.237.126.42/ost/bang-bang-busters-arcade/fejcqoyf/08_Boss%20Theme%201.mp3'
battle.volume = 0.5
let finish = new Audio()
finish.src = 'http://23.237.126.42/ost/dragoon-might-arcade/ycrwiwze/05_New%20Beginning%20%28Intermission%29.mp3'
finish.volume = 0.5
let titleMusic = new Audio()
titleMusic.src = 'http://23.237.126.42/ost/rapid-hero-arcade/lggalrpk/03_Waiting%20for%20Start.mp3'
titleMusic.volume = 0.5
let conan = new Audio()
conan.src = 'conan.mp3'

let hasPlayer1selectedColor = false
let hasPlayer2selectedColor = false
let hasGameStarted = false
let interval
let frames = 0
let playBack = 1
const mapLarge = new MapGenerator(10)

mapLarge.basicMap()
let bomb = new Bomb(mapLarge)
let player2 = new PlayerBlock(randColorP2, 0, 0, 0, 0, mapLarge, `p2`, 'images/player2.png')

let player1 = new PlayerBlock(
  randColorP1,
  canvas.width - player2.blockSize,
  canvas.height - player2.blockSize,
  9,
  9,
  mapLarge,
  `p1`,
  'images/player1.png'
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
  printScores()
  battle.playbackRate = `${(playBack += 0.0005)}`
}

function startGame() {
  hasGameStarted = true
  titleMusic.pause()
  bomb.draw()
  ctx.globalCompositeOperation = 'source-over'
  if (interval) return
  interval = setInterval(update, 1000 / 120)
  battle.play()
  setTimeout(gameOver, 15000)
}

function gameOver() {
  battle.pause()
  finish.play()
  easterEgg(score1(mapLarge.arrOutter), score1(mapLarge.arrOutter))
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
function score1(arr) {
  let p1S = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === `p1`) p1S++
    }
  }
  return p1S
}
function score2(arr) {
  let p2S = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === `p2`) p2S++
    }
  }
  return p2S
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
  console.log(p1Score)
  console.log(p2Score)
}
function printScores() {
  player1Score.textContent = `Score: ${score1(mapLarge.arrOutter)}`
  player2Score.textContent = `Score: ${score2(mapLarge.arrOutter)}`
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
function easterEgg(num1, num2) {
  if (num1 > 60 || num2 > 60) {
    finish.pause()
    conan.play()
    conan.volume = 1
  }
}
