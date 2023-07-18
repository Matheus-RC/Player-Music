let musicas = [
    {musica:"Can't Hide - Otis McDonald", artista:"matheus", src:"musicas/Can't Hide - Otis McDonald.mp3",img:"img/capa/radio.jpg"},
    {musica:"Enough - NEFFEX", artista:"ribeiro", src:"musicas/Enough - NEFFEX.mp3",img:"img/capa/emoji.jpg"},
    {musica:"Here it Comes - TrackTribe", artista:"cardoso", src:"musicas/Here it Comes - TrackTribe.mp3",img:"img/capa/guarda-chuva.jpg"},
    {musica:"Savior - Telecasted", artista:"Matheus Ribeiro", src:"musicas/Savior - Telecasted.mp3",img:"img/capa/guitarra-preta.jpg"},
    {musica:"Upstate - TrackTribe", artista:"Matheus Cardoso", src:"musicas/Upstate - TrackTribe.mp3",img:"img/capa/balao.jpg"}
];


let music = document.querySelector('audio');
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');
let next = document.querySelector('.next');
let ret = document.querySelector('.return');
let barra = document.querySelector('.barra');
let inicio = document.querySelector('.inicio');
let fim = document.querySelector('.fim');
let capa = document.querySelector('.capa');
let nameMusic = document.querySelector('.descricao h2');
let artista = document.querySelector('.descricao i');

play.addEventListener('click', tocarMusica);
pause.addEventListener('click',pausarMusica);
next.addEventListener('click',avancaMusica);
ret.addEventListener('click',retornaMusica);
barra.addEventListener('mousedown', retiraEventoMusica);
barra.addEventListener('click', clicaBarraMusica);
music.addEventListener('timeupdate', atualizaValoresGerais);


let index_musica = 0;
VerificaInativaButton();

window.onload = function (){
    carregaMusica(index_musica);
}

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

function atualizaValoresGerais(){
    atualizarBarra();
    atualizaValorInicio();
}

function atualizarBarra(){
    var duration = music.duration;
    barra.value = music.currentTime;
    if(duration == music.currentTime){
        pausarMusica();
    }
}

function atualizaValorFim(){
    fim.textContent = converteMinutos(Math.floor(music.duration));
}

function atualizaValorInicio(){
    inicio.textContent =  converteMinutos(Math.floor(music.currentTime)); 
}

function retiraEventoMusica(){
    music.removeEventListener('timeupdate', atualizaValoresGerais);
}

function clicaBarraMusica(){
    var tocando = true;
    if(music.paused){
        music.pause();
        tocando = false;
    }
    music.currentTime =  barra.value;
    atualizarBarra();
    if(tocando == true){
        music.play();
    }
    music.addEventListener('timeupdate', atualizaValoresGerais);
}

function converteMinutos(segundos){
    var campoMinutos = Math.floor(segundos / 60);
    var campoSegundos = segundos % 60; 
    if(campoSegundos < 10){
        campoSegundos = "0"+campoSegundos;
    }
    return campoMinutos + ":" + campoSegundos;
}

function carregaMusica(index){
    console.log(index);
    music.src = musicas[index].src;
    music.addEventListener("loadeddata", () => {
        capa.src = musicas[index].img;
        nameMusic.textContent = musicas[index].musica;
        artista.textContent = musicas[index].artista;
        barra.max = music.duration;
        atualizaValorInicio();
        atualizaValorFim();
    } );
}

function retornaMusica(){
    if (index_musica > 0){
        index_musica = index_musica - 1;
        var tocar = true;
        if (music.paused){
            tocar = false;
        }
        carregaMusica(index_musica);
        VerificaInativaButton();
        if (tocar){
            tocarMusica();
        }
    }
}

function avancaMusica(){
    if (index_musica < musicas.length){
        index_musica = index_musica + 1;
        var tocar = true;
        if (music.paused){
            tocar = false;
        }
        carregaMusica(index_musica);
        VerificaInativaButton();
        if (tocar){
            tocarMusica();
        }
    }
}

function VerificaInativaButton(){
    if(index_musica == 0){
        ret.style.opacity = 0.3;
    }else{
        ret.style.opacity = 1;
    }

    if(index_musica == (musicas.length - 1)){
        next.style.opacity = 0.3;
    }else{
        next.style.opacity = 1;
    }
}