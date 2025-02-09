import {getUrlParams, setUrlParams, gridSize, gameArr, reloadOnRestartClick, sparkleSound, winSound, loseSound, renderXY} from '../js/gamesFunctions.js';

//sounds effects
const dropSound = new Audio('./style/music/drop-sound.mp3');
dropSound.volume = 0.4;
//background sound
const backgroundMusic = document.querySelector('#background-music');
backgroundMusic.volume = 0.3;

//dealing with queryParams
let params = getUrlParams();

//dealing with return buttin queryParams
const returnHomeBtn = document.querySelector('.left-elements a');
delete params.game2;
const setUrl = setUrlParams(`${returnHomeBtn.href}`, params);
returnHomeBtn.href = setUrl;

const hasWin = () => {
    winSound.volume = 0.2;
    winSound.play();
    let winNode = document.querySelector('#win-container');
    winNode.classList.toggle('hide');
    winNode.style.animation = 'appear 0.3s';

    // dealing with winning query params
    let winHomeBtn = document.querySelector('#win-home');
    params.game2 = 'getEm';
    let newURL = setUrlParams(`${winHomeBtn.href}`, params);
    winHomeBtn.href = newURL;
}

//show loseHTML if lose
const hasLost = () => {
    loseSound.volume = 1;
    loseSound.play();
    let loseNode = document.querySelector('#lose-container');
    loseNode.classList.toggle('hide');
    loseNode.style.animation = 'appear 0.3s';

    // dealing with losing query params
    let loseHomeBtn = document.querySelector('#lose-home');
    for(let param in params) {
        if(param === 'game2');
        delete params.game2;
    }
    let newURL = setUrlParams(`${loseHomeBtn.href}`, params);
    loseHomeBtn.href = newURL;
}


//--------------start building game-------------//

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
    let randomX = Math.floor(Math.random() * gridSize);

    while(gameArr[0][randomX] !== 'empty') {
        randomX = Math.floor(Math.random() * gridSize);
    }

    gameArr[0][randomX] = `${className}`;
    dropItems.push({y : 0, x : randomX, class : className});
};

//clear intervals
const stopGame = () => {
    clearInterval(intervalMove);
} 

//depending on class of the element update counter
const changeCounters = (className) => {
    if(className === 'fish' || className === 'fish2'){
        sparkleSound.currentTime = 0;
        sparkleSound.play();
        changeFishCounter();
    };
    if(className === 'raindrop'){
        dropSound.currentTime = 0;
        dropSound.play();
        changeDropCounter();
    };

    // check for the game-over condition
    checkGameOver();
}

//update fish counter and add condition to accelerate game - verify if win
const changeFishCounter = () => {
    fishCount++;
    document.querySelector('.right-elements p span').innerText = fishCount;

    console.log("Fish:", fishCount);
    console.log("Rain", raindropCount);

    if(fishCount === 5) {
        stopGame();
        intervalMove = setInterval(moveElems, 400);
    }

    if(fishCount === 10) {
        stopGame();
        intervalMove = setInterval(moveElems, 250);
    }

    /*if(fishCount === 20 && raindropCount === 0) {
        stopGame();
        document.removeEventListener('keydown', changeDirection);
        hasWin();
    }*/
        
}

//update raindrop counter - verify if lose
const changeDropCounter = () => {
    raindropCount++;
    document.querySelector('.right-elements p:nth-child(4) span').innerText = raindropCount;
    if(raindropCount === 5) {
        stopGame();
        document.removeEventListener('keydown', changeDirection);
        hasLost();
    }
}

// Central function to check game over conditions after both counters are updated
const checkGameOver = () => {

    if(fishCount === 2 && raindropCount === 2) {
        console.log("Testing lost fish=2 rain=2")
        stopGame();
        document.removeEventListener('keydown', changeDirection);
        hasLost();
    }

    if(fishCount === 20 && raindropCount === 4) {
        console.log("Testing lost fish=20 rain=4")
        stopGame();
        document.removeEventListener('keydown', changeDirection);
        hasLost();
    }

    // Check for the losing condition: 20 fish and 1 raindrop
    if(fishCount === 20 && raindropCount === 1) {
        console.log("Testing lost fish=20 rain=1")
        stopGame();
        document.removeEventListener('keydown', changeDirection);
        hasLost();
    }

    if(fishCount === 20 && raindropCount === 0) {
        console.log("Testing WIN fish=20 rain=0")
        stopGame();
        document.removeEventListener('keydown', changeDirection);
        hasWin();
    }
}

/*
//create fish or raindrop - more raindrop than fish
const createElems = () => {
    Math.round(Math.random() * 20) > 7 ? randomElem('raindrop') : randomElem('fish');
    renderGameArr();
}
*/

// Create raindrop or other elements - raindrop is more frequent
const createElems = () => {
    // Generate a random number between 0 and 20
    const randomNumber = Math.round(Math.random() * 20);

    // If the random number is between 8 and 20, it's a raindrop
    if (randomNumber > 7) {
        randomElem('raindrop');
    }
    else {
        const elementIndex = Math.floor(Math.random() * 2); 
        
        // Map the index to the corresponding element
        switch (elementIndex) {
            case 0:
                randomElem('fish');
                break;
            case 1:
                randomElem('fish2');
                break;
            /*
            case 2:
                randomElem('element1'); 
                break;
            case 3:
                randomElem('element2');
                break;
            case 4:
                randomElem('element3'); 
                break;
            case 5:
                randomElem('element4'); 
                break;
            case 6:
                randomElem('element5'); 
                break;
            case 7:
                randomElem('element6'); 
                break;
            case 8:
                randomElem('element7'); 
                break;
            case 9:
                randomElem('element8'); 
                break;
            */
        }
    }

    // Update the game state after adding the element
    renderGameArr();
}


let fishCount = 0;
let raindropCount = 0;
let intervalMove;

let createItemNow = 0;


//for each elem items
    //test new pos (y+1)
    //clear elem from gameArr
    //if less than gridSize
        //check if cat at this new pos
        //if cat change counters, erase item from dropItems, index-- to not miss an element
        //else let item go at new pos
    //if it can't move there
        //erase item from dropItems, index-- again to not miss an element

//create a element one time in two 
    //first time createItemNow < 0 so add 1
    //next time createItemNow > 0 so createElem and reset createItemNow to 0;
//anyway renderGame to html grid
const moveElems = () => {
    for(let index = 0; index < dropItems.length; index++) {
        const dropItem = dropItems[index];
        let copyItemPos = {y : dropItem.y + 1, x : dropItem.x};

        clearElem(dropItem);

        if(copyItemPos.y < gridSize) {
            const isCat = gameArr[copyItemPos.y][copyItemPos.x] === 'cat';

            if(isCat) {
                changeCounters(dropItem.class);
                dropItems.splice(index, 1);
                index--;
            } else {
                dropItem.y = copyItemPos.y
                putElem(dropItem);
            }

        } else {
            dropItems.splice(index, 1);
            index--;
        }
    }

    if(createItemNow > 0) {
        createElems();
        createItemNow = 0;
    } else {
        createItemNow++;
    }

    renderGameArr();
}

//cat event listener keypress moves cat x 
//check if cat encounter an elem(fish-raindrop) when moving to deal with it : 
    //add to proper counter
    //erase elem from gameArr
    //erase elem from dropItems arr
//put new cat pos in gameArr
//render HTML
const changeDirection = (key) => {
    let tempCatPos = {x : cat.x};
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

        if (gameArr[cat.y][cat.x] !== 'empty') {
            const item = dropItems.findIndex( ({x, y}) => x === cat.x && y == cat.y );
            changeCounters(gameArr[cat.y][cat.x]);
            gameArr[cat.y][cat.x] = 'empty';
            dropItems.splice(item, 1);
        }

        putElem(cat);
        renderGameArr();
    }
};

//for keydown event only
const onKeyPress = (keypress) => {
    changeDirection(keypress.key);
}

//hide intro - start interval - listen to keydown 
const startGame = () => {
    backgroundMusic.volume = 0.1;
    sparkleSound.play();
    document.querySelector('#intro-game').classList.add('hide');
    intervalMove = setInterval(moveElems, 500);
    document.addEventListener('keydown', onKeyPress);

    //mobile version
    let leftBtn = document.getElementById('left');
    let rightBtn = document.getElementById('right');
    leftBtn.addEventListener('click', () => changeDirection('ArrowLeft'));
    rightBtn.addEventListener('click', () => changeDirection('ArrowRight'));
}

//launch startGame when user click on startLink
let startLink = document.querySelector('#start');
startLink.addEventListener('click', startGame);

//reload page if click on restart buttons
reloadOnRestartClick();


