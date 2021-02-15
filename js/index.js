// on load check url params to know if a mini game has been won 


// 1 - Defining main container and its width
const page = document.querySelector("body");

// 2 - Defining eyes and their limits
const eyes = document.querySelectorAll(".eye");
let leftEye = {};
let rightEye = {};

eyes.forEach((eye) => {
    if (eye.classList.contains("cat-eye")) {
      leftEye = eye.getBoundingClientRect();
    } else {
      rightEye = eye.getBoundingClientRect();
    }
});

// 3 - Defining pupils and its width
const leftPupil = document.querySelector(".pupil-left");
const rightPupil = document.querySelector(".pupil-right");
const pupilRadius = document.querySelector(".cat-pupil").getBoundingClientRect().width / 2;

// 4 - Functions to adjust eyes position
const adjustEye = (mousePos, eye, pupil) => {
  if (mousePos < eye.left) {
    pupil.style.left = 0;
    pupil.style.right = "initial";
  } else if (mousePos > eye.right - pupilRadius) {
    pupil.style.left = "initial";
    pupil.style.right = 0;
  } else {
    pupil.style.left = `${(mousePos - eye.left) / 2}px`;
  }
};

// 5 - Listening to the mouse moves, calling the function for each eye
page.addEventListener("mousemove", (e) => {
  const mousePos = e.pageX;

  adjustEye(mousePos, leftEye, leftPupil);
  adjustEye(mousePos, rightEye, rightPupil);
});

// CONFETTI ANIMATION 

const catSnakeBtn = document.querySelector('.button-container');
const catSnakeSvg = document.querySelector('.button-container #svg');

const animItemSnake = bodymovin.loadAnimation({
  wrapper: catSnakeSvg,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://assets9.lottiefiles.com/packages/lf20_t1qvgine.json'
});

catSnakeBtn.addEventListener('mouseenter', () => {
  catSnakeSvg.classList.remove('hide');
  animItemSnake.goToAndPlay(0,true);
})

const getEmBtn = document.querySelector('.button-container:nth-child(2)');
const getEmSvg = document.querySelector('.button-container:nth-child(2) #svg');

const animItemGetEm = bodymovin.loadAnimation({
  wrapper: getEmSvg,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://assets9.lottiefiles.com/packages/lf20_t1qvgine.json'
});

getEmBtn.addEventListener('mouseenter', () => {
  getEmSvg.classList.remove('hide');
  animItemGetEm.goToAndPlay(0,true);
})








