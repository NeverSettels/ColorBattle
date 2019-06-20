fillerLoop()
window.onload = titleAppear
addEventListener('keydown', e => {
  e.preventDefault()
})
addEventListener('keyup', e => {
  e.preventDefault()
  if (hasPlayer1selectedColor && hasPlayer2selectedColor) {
    if (e.keyCode === 32) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      mapLarge.drawBasic()
      startGame()
    }
    if (hasGameStarted) {
      if (e.keyCode === 38) {
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
        titleMusic.play()
        titleMusic.loop = true
      }
    }
  }
})
blue.onclick = e => {
  player1.color = '#1e90ff'
  p1Color.style = 'background: #1e90ff'
  hasPlayer1selectedColor = true
}
green.onclick = e => {
  player1.color = '#228b22'
  p1Color.style = 'background: #228b22'
  hasPlayer1selectedColor = true
}
purple.onclick = e => {
  player1.color = '#9932cc'
  p1Color.style = 'background: #9932cc'
  hasPlayer1selectedColor = true
}
rand1.onclick = e => {
  let color1 = getRandomColor()
  player1.color = color1
  p1Color.style = `background: ${color1}`
  hasPlayer1selectedColor = true
}
red.onclick = e => {
  player2.color = '#dc143c'
  p2Color.style = 'background: #dc143c'
  hasPlayer2selectedColor = true
}
orange.onclick = e => {
  player2.color = '#ff8c00'
  p2Color.style = 'background: #ff8c00'
  hasPlayer2selectedColor = true
}
yellow.onclick = e => {
  player2.color = '#ffd700'
  p2Color.style = 'background: #ffd700'
  hasPlayer2selectedColor = true
}

rand2.onclick = e => {
  let color2 = getRandomColor()
  player2.color = color2
  p2Color.style = `background: ${color2}`
  hasPlayer2selectedColor = true
}

mute.onclick = e => {
  let bool = e.target.classList.toggle('unmute')
  if (bool) {
    mute.innerHTML = '<img src="./images/mute.png" alt="" />'
    titleMusic.muted = true
    battle.muted = true
    finish.muted = true
  } else {
    mute.innerHTML = '<img src="./images/speaker.png" alt="" />'
    titleMusic.muted = false
    battle.muted = false
    finish.muted = false
  }
}

addEventListener('keydown', e => {
  if (e.keyCode === 80) {
    titleMusic.play()
    titleMusic.loop = true
  }
})
