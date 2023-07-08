let music = document.querySelector('audio');
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');
let bar = document.querySelector('.time-bar');
let point = document.querySelector('.ponto');

play.addEventListener('click', tocarMusica);
pause.addEventListener('click',pausarMusica);
music.addEventListener('timeupdate', atualizarBarra);

function tocarMusica(){
    music.play();
    pause.style.display = "inline";
    play.style.display = "none";
}
function pausarMusica(){
    music.pause();
    pause.style.display = "none";
    play.style.display = "inline";
}

function atualizarBarra(){
    var duration = music.duration;
    var proporcao = music.currentTime / duration;
    bar.value = proporcao;
    console.log(proporcao);
    point.style.left = Math.floor(proporcao * 100) + '%';
}