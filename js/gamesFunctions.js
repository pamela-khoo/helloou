//dealing with query params
const getUrlParams = () => {
    let params = {};
  
    if (window.location.search)
      for(let p of new URLSearchParams(window.location.search)) {
        params[p[0]] = p[1];
      }
    return params;
}
  
const setUrlParams = (url, params) => {
    if (params) {
        url += `?`
        let oneDone = false;

        Object.keys(params).forEach(element => {
        url += (oneDone ? '&' : '') + `${element}=${params[element]}`;
        oneDone = true;
        });
    }
    return url;
}

//------GAME CONSTRUCTION----//

//create gameArr
export let gridSize = 10;
export let gameArr = new Array(gridSize);
for(let i = 0; i < gameArr.length; i++) {
    gameArr[i] = new Array(gridSize);
    gameArr[i].fill('empty');
}

//create tile HTML elements according to gameArr
export let gameBoard = document.querySelector('#game-board');
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

//reload all game-page when user click on restart button
const reloadOnRestartClick = () => {
    let restartBtns = [...document.querySelectorAll('.restart')]
    const reload = () => {
        document.location.reload();
    }
    restartBtns.forEach(restartBtn => {
        restartBtn.addEventListener('click', reload)
    });
}

//sparkle sound
export const sparkleSound = new Audio('./style/music/sparkle-sound.mp3');
export const winSound = new Audio('./style/music/yay-sound.mp3');
export const loseSound = new Audio('./style/music/ohnonono.mp3');

export {setUrlParams, getUrlParams, reloadOnRestartClick, renderXY}