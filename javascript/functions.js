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
    player1.draw()
    player2.draw()
  }

  function startGame() {
    if (interval) return
    interval = setInterval(update, 1000/120)
  }
;