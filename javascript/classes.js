 class MapGenerator{
    constructor(x,y){
        this.arrOutter = []
        this.numAccross = x
        this.numDown = y
    }
    //maps
    basicMap(){
        for(let i = 0; i < this.numAccross; i++){
            let arrTemp = []
            for(let j = 0; j < this.numDown; j++){
                arrTemp.push(0)
            }
            this.arrOutter.push(arrTemp)
        }
        return this.arrOutter
    }

    randObstacleMap(){
        //for(let k = 0; k < (this.numAccross - (this.numAccross-2)); k++){
            let randX = Math.floor(Math.random()*(this.arrOutter.length-1))
            let randY = Math.floor(Math.random()*(this.arrOutter.length-1))
            this.arrOutter[randY][randX] = 'x'
           
       // }

        return this.arrOutter
    }
    // draw
    draw(){
        
    }
}