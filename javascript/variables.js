

    let canvas = document.querySelector("#canvas")
    let ctx = canvas.getContext('2d');
    var sec  = document.getElementById('sec');
    let randColorP1 = getRandomColor()
    let randColorP2 = getRandomColor()
    let battle = new Audio();
    battle.src = "http://23.237.126.42/ost/bang-bang-busters-arcade/fejcqoyf/08_Boss%20Theme%201.mp3";
    let finish = new Audio();
    finish.src = "http://23.237.126.42/ost/dragoon-might-arcade/ycrwiwze/05_New%20Beginning%20%28Intermission%29.mp3";
    
    let interval 
    let frames = 0
    let playBack = 1
    
    
    const mapLarge = new MapGenerator(10)
    const player1 = new PlayerBlock(randColorP1, 0, 0,0,0, mapLarge, `p1`)
    const player2 = new PlayerBlock(randColorP2, canvas.width - player1.blockSize, canvas.height - player1.blockSize,9,9, mapLarge,`p2`)
    

