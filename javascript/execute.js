fillerLoop()
window.onload = titleAppear

addEventListener('keydown', e => {
  e.preventDefault()
  if (e.keyCode === 32) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mapLarge.drawBasic()
    startGame()
  } else if (e.keyCode === 38) {
    player1.moveUp()
  } else if (e.keyCode === 40) {
    player1.moveDown()
  } else if (e.keyCode === 39) {
    player1.moveRight()
  } else if (e.keyCode === 37) {
    player1.moveleft()
  } else if (e.keyCode === 87) {
    player2.moveUp()
  } else if (e.keyCode === 83) {
    player2.moveDown()
  } else if (e.keyCode === 68) {
    player2.moveRight()
  } else if (e.keyCode === 65) {
    player2.moveleft()
  } else if (e.keyCode === 82) {
    window.location.reload()
  }
})
blue.onclick = e => {
  player1.color = '#1e90ff'
  p1Color.style = 'background: #1e90ff'
}
green.onclick = e => {
  player1.color = '#228b22'
  p1Color.style = 'background: #228b22'
}
purple.onclick = e => {
  player1.color = '#9932cc'
  p1Color.style = 'background: #9932cc'
}
rand1.onclick = e => {
  let color1 = getRandomColor()
  player1.color = color1
  p1Color.style = `background: ${color1}`
}
red.onclick = e => {
  player2.color = '#dc143c'
  p2Color.style = 'background: #dc143c'
}
orange.onclick = e => {
  player2.color = '#ff8c00'
  p2Color.style = 'background: #ff8c00'
}
yellow.onclick = e => {
  player2.color = '#ffd700'
  p2Color.style = 'background: #ffd700'
}
rand2.onclick = e => {
  let color2 = getRandomColor()
  player2.color = color2
  p2Color.style = `background: ${color2}`
}
