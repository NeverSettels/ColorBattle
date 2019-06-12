let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext('2d');

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
            ctx.fillRect(i,j, 10, 10)          
           i+=10;                     
           if (i < 400) {            
              fillerLoop();             
           }  
            else if (j < 400){ 
                fillerLoop()
                 i = 0
                 j+=10
                }                    
        }, 1)
     }
     fillerLoop()
