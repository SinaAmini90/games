
localStorage.removeItem('matrixBoardSaved');
localStorage.removeItem('fulledCellQuantitySaved');


//////////////////////////////get background image /////////////
let backImageAddress = './images/back.jpg';
let gameBackGround = document.getElementsByTagName('body')[0];
gameBackGround.style.backgroundImage = `url(${backImageAddress})`;
const unsplashAccessKey = `StYrqbKcS3_YJEavWxC3rS9D7eB4Fngm7p97xcXow0g`;
let backImageJson = "";
async function getBackgroundPhoto() {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}&orientation=landscape&topics='Wallpapers'`);
    if (response.ok) {
        backImageJson = await response.json();
        backImageAddress = `${backImageJson.urls.regular}`;
        gameBackGround.style.backgroundImage = `url(${backImageAddress})`;
    } else {
        console.log("something went wrong");
    };
};
getBackgroundPhoto();

