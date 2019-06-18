
 class Bomb {
     constructor(map) {
         this.map = map
         this.img = new Image()
         this.img.src = 'images/bomb.png'  
         this.blockSize = canvas.width/this.map.numAccross
         this.length = this.map.numAccross 
         this.x = (Math.floor(Math.random()*(this.length) ))*this.blockSize
         this.y = (Math.floor(Math.random()*(this.length) ))*this.blockSize
     }
        draw() {            
            ctx.drawImage(this.img , this.x, this.y, this.blockSize, this.blockSize)
        }
}


 
 class MapGenerator{
    constructor(x){
        this.arrOutter = []
        this.numAccross = x
        this.blockSize = canvas.width/this.numAccross
    }
    //maps
    basicMap(){
        for(let i = 0; i < this.numAccross; i++){
            let arrTemp = []
            for(let j = 0; j < this.numAccross; j++){
                arrTemp.push(0)
            }
            this.arrOutter.push(arrTemp)
        }
        return this.arrOutter
    }

    randObstacleMap(x){
        this.basicMap()
        for(let k = 0; k < (this.numAccross - (this.numAccross-x)); k++){
            let randX = Math.floor(Math.random()*(this.arrOutter.length-1))
            let randY = Math.floor(Math.random()*(this.arrOutter.length-1))
            this.arrOutter[randY][randX] = 'x'
           
       }

        return this.arrOutter
    }
    // draw
    drawBasic(){
        let positionX = 0
        let positionY = 0
        ctx.strokeStyle = "black"
        for (positionX=0; positionX < canvas.width; positionX += (this.blockSize)){
        for (positionY=0; positionY < canvas.width; positionY += (this.blockSize)) 
        ctx.strokeRect(positionX, positionY, this.blockSize, this.blockSize)
        } 
    }

    }


class PlayerBlock{
    constructor (color, initialX , initialY , initialArrY, initialArrX, board, val){
        this.x = initialX
        this.y = initialY
        this.i = initialArrY
        this.j = initialArrX
        this.val = val
        this.board = board
        this.blockSize = canvas.width/board.numAccross
        this.color = color
    }
    moveUp(){
        if (this.y > 0 ) {
            this.y -= this.blockSize
            this.i--
            this.board.arrOutter[this.i][this.j] = this.val
            
        }
    }
    moveDown(){
        if (this.y < canvas.height - this.blockSize ) {
            this.y += this.blockSize
            this.i++
            this.board.arrOutter[this.i][this.j] = this.val
            
        }
    }
    moveRight(){
        if(this.x < canvas.width- this.blockSize){
            this.x += this.blockSize
            this.j++
            this.board.arrOutter[this.i][this.j] = this.val
            
        }
    
    }
    moveleft(){
        if(this.x > 0){
            this.x -= this.blockSize
            this.j--
            this.board.arrOutter[this.i][this.j] = this.val
        }
    
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.blockSize, this.blockSize)  
    }
    isTouching(bomb) {
        return (
          this.x < bomb.x + bomb.blockSize  &&
          this.x + this.blockSize > bomb.x &&
          this.y < bomb.y + bomb.blockSize  &&
          this.y + this.blockSize > bomb.y
        ) 
      }
}




