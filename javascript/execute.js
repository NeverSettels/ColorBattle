fillerLoop()
window.onload = titleAppear




addEventListener('keydown', (e) => {
    e.preventDefault()
    if(e.keyCode === 32) {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    mapLarge.drawBasic()
     startGame()
   } else if(e.keyCode === 38) {
    player1.moveUp()
    }
    else if(e.keyCode === 40) {
        player1.moveDown()
        }
    else if(e.keyCode === 39) {
         player1.moveRight()
        }
    else if(e.keyCode === 37) {
        player1.moveleft()
        }
    else if(e.keyCode === 87) {
         player2.moveUp()
        }
    else if(e.keyCode === 83) {
        player2.moveDown()
       }
    else if(e.keyCode === 68) {
         player2.moveRight()
          }
    else if(e.keyCode === 65) {
        player2.moveleft()
        } 
             
 })

