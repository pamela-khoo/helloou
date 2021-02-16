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

//cat object
let cat = {y : 8, x : 5, class : 'cat'};

//can you move cat at this pos
const canMoveCat = (tempCatPos) => {
    let {x} = tempCatPos;
    return x >= 0 && x < gridSize;
}

//put elem in gameArr
const putElem = elem => gameArr[elem.y][elem.x] = elem.class;
//clear old elem pos
const clearElem = elem => gameArr[elem.y][elem.x] = 'empty';

putElem(cat);
renderGameArr();


let dropItems = [];

//put a new elem in gameArr according to className
//push this new elem in dropItems array
const randomElem = (className) => {
    let y = 0;
    let randomX = Math.floor(Math.random() * gridSize);

    while(gameArr[y][randomX] !== 'empty') {
        randomX = Math.floor(Math.random() * gridSize);
    }

    gameArr[y][randomX] = `${className}`;
    dropItems.push({y : y, x : randomX, class : className});
};

//can you move elem at this pos
const canMoveElem = (tempElemPos) => tempElemPos.y < gridSize;

renderGameArr();


let intervalCreate;

//create fish or raindrop - more raindrop than fish
const createElems = () => {
    Math.round(Math.random() * 10) > 4 ? 
        randomElem('raindrop') : randomElem('fish');

    renderGameArr();
}

// intervalCreate = setInterval(createElems, 2000);


let intervalMove;

const moveElems = () => {
    dropItems.forEach((dropItem, i) => {

        let copyItemPos = {y : dropItem.y + 1, x : dropItem.x};

        clearElem(dropItem);

        if(canMoveElem(copyItemPos)) {
            const isCat = gameArr[copyItemPos.y][copyItemPos.x] === 'cat';

            if(isCat) {
                dropItems.splice(i, 1);
            } else {
                dropItem.y = copyItemPos.y
                putElem(dropItem);
            }

        } else {
            dropItems.splice(i, 1);
        }
    });
    renderGameArr();
}

// intervalMove = setInterval(moveElems, 1000);

const changeDirection = (keypress) => {
    let tempCatPos = {x : cat.x};
    const {key} = keypress;
    switch(key) {
        case 'ArrowRight' : 
            tempCatPos.x += 1;
            break;
        case 'ArrowLeft' : 
            tempCatPos.x -= 1;
            break;
    };
    if(tempCatPos.x !== cat.x && canMoveCat(tempCatPos)) {
        clearElem(cat);
        cat.x = tempCatPos.x;
        putElem(cat);
        renderGameArr();
    }
};

document.addEventListener('keydown', changeDirection);