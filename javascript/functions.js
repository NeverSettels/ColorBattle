function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var x = 0; x < 6; x++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

    
  let i = 0;  
  let j = 0;
    function fillerLoop () {  
      
        setTimeout(function () {    
            ctx.fillStyle =`${getRandomColor()}`
            ctx.fillRect(i,j, 20, 20)          
           i+=20;                     
           if (i < 400) {            
              fillerLoop();             
           }  
            else if (j < 400){ 
                fillerLoop()
                 i = 0
                 j+=20
                }                    
        }, 1)
    }
function titleAppear(){     
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "white";
      ctx.font = "50px KulminoituvaRegular ";
      ctx.textBaseline = 'bottom'
      ctx.fillText("ColorBattle", 20, 200); 
  }

  function update(){
    frames++
    player1.draw()
    player2.draw()
    printSeconds()
    battle.playbackRate = `${playBack += .0005}`
  }

  function startGame() {
    if (interval) return
    interval = setInterval(update, 1000/120)
    battle.play()
    setTimeout(gameOver, 15000 )
  }

  function gameOver() {
    battle.pause()
    finish.play()
    clearInterval(interval)
    interval = false
    determineWinner(mapLarge.arrOutter)
    ctx.fillStyle = `black`
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText(`${determineWinner(mapLarge.arrOutter)}`, mapLarge.blockSize, canvas.height/2);
  }

  function determineWinner(arr){
      let p1Score = 0;
      let p2Score = 0;
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){
        if(arr[i][j] === `p1`) p1Score++
        else if (arr[i][j] === `p2`) p2Score++  
        }  
    }
    if(  p1Score > p2Score  ){
        return `Player 1 Wins!!!`
    }
    else if(  p1Score < p2Score  ){
         return`Player 2 Wins!!!`
    }
    else {
        return`It's a Tie!!!!!!`
    }
  }

  function printSeconds() {
    sec.innerText = 15 - Math.floor(getSeconds())
    
}


  function getSeconds(){ return (frames/120)%60}


