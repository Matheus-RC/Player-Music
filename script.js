let music = document.querySelector('audio');
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');
let bar = document.querySelector('.time-bar');
let point = document.querySelector('.ponto');
let inicio = document.querySelector('.inicio');
let fim = document.querySelector('.fim');
let capa = document.querySelector('.capa');
let nameMusic = document.querySelector('.descricao h2');
let artista = document.querySelector('.descricao i');

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
    fim.textContent = converteMinutos(Math.floor(music.duration));
    bar.value = proporcao;
    console.log(proporcao);
    point.style.left = Math.floor(proporcao * 100) + '%';
    inicio.textContent =  converteMinutos(Math.floor(music.currentTime)); 
}

function converteMinutos(segundos){
    var campoMinutos = Math.floor(segundos / 60);
    var campoSegundos = segundos % 60; 
    if(campoSegundos < 10){
        campoSegundos = "0"+campoSegundos;
    }
    return campoMinutos + ":" + campoSegundos;
}