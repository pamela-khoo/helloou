// const catPupil = () => {
//     let pupil = document.querySelector('.cat-pupil');
//     let x = (pupil.getBoundingClientRect().left) + (pupil.clientWidth / 2);
//     pupil.style.left = x;
// }

// document.querySelector('body').addEventListener('mousemove', catPupil);

let pupil = document.querySelector('.cat-pupil');
let pupilContainer = document.querySelector('.cat-eye');

window.addEventListener('mousemove', e => {
    const mX = e.clientX;
    const eyeLeftX = pupilContainer.getBoundingClientRect().x;
    const eyeRightX = (pupilContainer.getBoundingClientRect().x + pupilContainer.getBoundingClientRect().width);
    const pupilX = pupil.getBoundingClientRect().x;

    if(pupilX > eyeLeftX && pupilX < eyeRightX) {
        pupil.style.left = mX + 'px';
    }
    // console.log(pupilContainer.getBoundingClientRect());
})  

