//create an array reflecting boardgame-tiles
let gridSize = 10;
let gameArr = new Array(gridSize);
for(let i = 0; i < gameArr.length; i++) {
    gameArr[i] = new Array(gridSize);
    gameArr[i].fill('empty');
}

//create HTML divs reflecting gameArr 
let gameBoard = document.querySelector('#game-board');
gameArr.forEach((row, y) => {
    row.forEach((column, x) => {
        let div = document.createElement('div');
        div.classList.add('empty');
        div.id = `${y}${x}`;
        gameBoard.appendChild(div);
    });
});

const hasWin = () => {
    let winNode = document.querySelector('#win-container');
    winNode.classList.toggle('hide');
}

const hasLost = () => {
    let loseNode = document.querySelector('#lose-container');
    loseNode.classList.toggle('hide');
}

//function to change y,x,classname of game-board depending on changes made on gameArr
const renderXY = (y, x, className) => {
    document.getElementById(`${y}${x}`)
    .setAttribute('class', `${className}`);
}

//function to iterate through gameArr and apply change to HTML elements
const renderGameArr = () => {
    for(let y = 0; y < gridSize; y++) {
        for(let x = 0; x < gridSize; x++) {
            renderXY(y, x, gameArr[y][x]);
        }
    }
}

//cat object in an
//array because will push dead fishes later
let cat = [{y : gameArr.length / 2, x : gameArr[0].length / 5, class : 'cat-head'}];

//render cat array (with future dead fishes)
const putCat = (cat) => {
    cat.forEach(catPart => {
        gameArr[catPart.y][catPart.x] = catPart.class;
    })
}

putCat(cat);

//random fish placement function
const randomFishPos = () => {
    let randomY = Math.floor(Math.random() * gridSize);
    let randomX = Math.floor(Math.random() * gridSize);
    while(gameArr[randomY][randomX] !== 'empty') {
        randomY = Math.floor(Math.random() * gridSize);
        randomX = Math.floor(Math.random() * gridSize);
    }
    gameArr[randomY][randomX] = 'fish-alive';
} 

let direction = 'right';
let nextDirection = direction;

randomFishPos();

renderGameArr();

//clear old cat position for each part of the cat
const clearCat = (cat) => {
    cat.forEach(catPart => {
        gameArr[catPart.y][catPart.x] = 'empty';
    })
};

//what would be new cat head position according to direction
//catPos contains copy of current cat head pos
const newHeadPosition = (tempCatPos, direction) => {
    switch(direction) {
        case 'right' :
            tempCatPos.x += 1;
            tempCatPos.direction = 'right';
            break;
        case 'left' :
            tempCatPos.x -= 1;
            tempCatPos.direction = 'left';
            break;
        case 'up' :
            tempCatPos.y -= 1;
            tempCatPos.direction = 'up';
            break;
        case 'down' :
            tempCatPos.y += 1;
            tempCatPos.direction = 'down';
            break;
    }
}

//verify that pos won't get cat out of grid and into itself
const canMoveHead = (tempCatPos) => {
    let {y, x} = tempCatPos;
    if(y < 0 || y >= gridSize) return false;
    if(x < 0 || x >= gridSize) return false;
    for(let i = 0; i < cat.length; i++) {
        if(cat[i].y === y && cat[i].x === x) return false;
    }
    return true;
}

//move real cat accordingly to new pos calculated 
//keep old pos to asign it to next catPart
//at the end of the loop newPos is equal to last fish old position
const moveCat = (newPos) => {
    cat.forEach(catPart => {
        const tempPos = {y: catPart.y, x: catPart.x};
        catPart.y = newPos.y;
        catPart.x = newPos.x;
        newPos = tempPos;
    });
}

//declare interval here to be able to clear it when user loses
let interval;
let fishCount = 0;

//copy cat pos in temp variable
//change temp pos according to direction - newHeadPosition
//if it can move there
    //check if there's a fish at this new temp pos
    //clear old cat head pos in gameArr
    //asign new pos for each part of the cat
    //asign new pos in gameArr
    //if fish push it cat arr and create new fish, will render next move
//if it can't move there clear interval
const move = () => {
    direction = nextDirection;
    let tempCatPos = {y : cat[0].y, x : cat[0].x};
    newHeadPosition(tempCatPos, direction);
    if(canMoveHead(tempCatPos)) {
        const isFish = gameArr[tempCatPos.y][tempCatPos.x] === 'fish-alive';

        clearCat(cat);
        moveCat(tempCatPos);

        putCat(cat);
        renderGameArr();

        if(isFish) {
            cat.push({y : tempCatPos.y, x : tempCatPos.x, class: 'fish-dead'});
            fishCount++;
            if(fishCount === 1) {
                clearInterval(interval);
                hasWin();
            }
            document.querySelector('.right-elements p span').innerText = fishCount;
            randomFishPos();
        }
    } else {
        clearInterval(interval);
        hasLost();
    }
}

//change direction according to key extracted from keydown event
const changeDirection = (keypress) => {
    const {key} = keypress;
    switch(key) {
        case 'ArrowUp' :
            if(direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown' : 
            if(direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowRight' : 
            if(direction !== 'left') nextDirection = 'right';
            break;
        case 'ArrowLeft' : 
            if(direction !== 'right') nextDirection = 'left';
            break;
    }
}

const startGame = () => {
    document.querySelector('#intro-game').classList.add('hide');
    interval = setInterval(move, 500);
    document.addEventListener('keydown', changeDirection);
}

let startLink = document.querySelector('#start');
startLink.addEventListener('click', startGame);




