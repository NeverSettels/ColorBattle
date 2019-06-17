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
    constructor (color, initialX ,initialY,board){
        this.x = initialX
        this.y = initialY
        this.board = board
        this.blockSize = canvas.width/board.numAccross
        this.color = color
    }
    moveUp(){
        if (this.y > 0 ) this.y -= this.blockSize
    }
    moveDown(){
        if (this.y < canvas.height - this.blockSize ) this.y += this.blockSize
    }
    moveRight(){
        if(this.x < canvas.width- this.blockSize){
            this.x += this.blockSize
        }
    
    }
    moveleft(){
        if(this.x > 0){
            this.x -= this.blockSize
        }
    
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.blockSize, this.blockSize)
    }
}