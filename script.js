//Vetor de objeto que contém o caminho das músicas juntamente com outras informações
let musicas = [
    {musica:"Can't Hide - Otis McDonald", artista:"matheus", src:"musicas/Can't Hide - Otis McDonald.mp3",img:"img/capa/radio.jpg"},
    {musica:"Enough - NEFFEX", artista:"ribeiro", src:"musicas/Enough - NEFFEX.mp3",img:"img/capa/emoji.jpg"},
    {musica:"Here it Comes - TrackTribe", artista:"cardoso", src:"musicas/Here it Comes - TrackTribe.mp3",img:"img/capa/guarda-chuva.jpg"},
    {musica:"Savior - Telecasted", artista:"Matheus Ribeiro", src:"musicas/Savior - Telecasted.mp3",img:"img/capa/guitarra-preta.jpg"},
    {musica:"Upstate - TrackTribe", artista:"Matheus Cardoso", src:"musicas/Upstate - TrackTribe.mp3",img:"img/capa/balao.jpg"}
];

//Pega os componentes da página
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

//Adiciona os eventos aos componentes
play.addEventListener('click', tocarMusica);
pause.addEventListener('click',pausarMusica);
next.addEventListener('click',avancaMusica);
ret.addEventListener('click',retornaMusica);
barra.addEventListener('mousedown', retiraEventoMusica);
barra.addEventListener('click', clicaBarraMusica);
music.addEventListener('timeupdate', atualizaValoresGerais);

//Váriável para controlar o indice do vetor de músicas
let index_musica = 0;

//Como se inícia na primeira música o botão de retroceder precisa estar desabilitado
VerificaInativaButton();

//Quando a página for aberta carrega a primeira música
window.onload = function (){
    carregaMusica(index_musica);
}

//Função para tocar a música e trocar o botão de play para pause
function tocarMusica(){
    music.play();
    pause.style.display = "inline";
    play.style.display = "none";
}

//Função para pausar a música e trocar o botão de pause para play
function pausarMusica(){
    music.pause();
    pause.style.display = "none";
    play.style.display = "inline";
}

//Função que função que atualizará a barra de progresso e o tempo da música
function atualizaValoresGerais(){
    atualizarBarra();
    atualizaValorInicio();
}

//Função que atualiza a barra de progresso da música
function atualizarBarra(){
    var duration = music.duration;
    barra.value = music.currentTime;
    if(duration == music.currentTime){ // pausa a música quando ele chega ao fim
        pausarMusica();
    }
}

//Atializa o tempo total da música
function atualizaValorFim(){
    fim.textContent = converteMinutos(Math.floor(music.duration));
}

//Atualiza o tempo atual da música
function atualizaValorInicio(){
    inicio.textContent =  converteMinutos(Math.floor(music.currentTime)); 
}

//Retira o evento timeupdate da música
function retiraEventoMusica(){
    music.removeEventListener('timeupdate', atualizaValoresGerais);
}

//Atualiza o tempo e a barra de progresso quando o usuário clica em um tempo na barra de progresso
function clicaBarraMusica(){
    music.currentTime =  barra.value; //Tempo atual da música recebe o valor da barra de progresso
    music.addEventListener('timeupdate', atualizaValoresGerais); // Retorna o evento para a música
}

//Converte minutos em segundos 
function converteMinutos(segundos){
    var campoMinutos = Math.floor(segundos / 60);
    var campoSegundos = segundos % 60; 
    if(campoSegundos < 10){
        campoSegundos = "0"+campoSegundos;
    }
    return campoMinutos + ":" + campoSegundos;
}

//Função para carregar música
function carregaMusica(index){
    music.src = musicas[index].src; //Carrega música
    music.addEventListener("loadeddata", () => { //Quando a música for completamente carregada
        capa.src = musicas[index].img; //Muda imagem de capa
        nameMusic.textContent = musicas[index].musica; //Coloca o nome da música
        artista.textContent = musicas[index].artista; //Coloca o nome do artista
        barra.max = music.duration; //Atualiza o valor total da barra de progresso
        atualizaValorInicio(); //Atualiza o valor de inicio 
        atualizaValorFim(); //Atualiza o valor de fim
    } );
}

//Função para retornar para a música anterior
function retornaMusica(){
    if (index_musica > 0){ //verifica se é a primeira música
        index_musica = index_musica - 1; 
        var tocar = true;
        if (music.paused){ 
            tocar = false;
        }
        carregaMusica(index_musica);
        VerificaInativaButton();
        if (tocar){ //Se a música estivesse tocando ela continua tocando
            tocarMusica();
        }
    }
}

//Função para avançar para a próxima música
function avancaMusica(){
    if (index_musica < musicas.length){ //Verifica se é a ultima música
        index_musica = index_musica + 1;
        var tocar = true;
        if (music.paused){
            tocar = false;
        }
        carregaMusica(index_musica);
        VerificaInativaButton();
        if (tocar){ //Se a música estivesse tocando ela continua tocando
            tocarMusica();
        }
    }
}

//Desabilita botão de retroceder ou de avançar;
function VerificaInativaButton(){
    if(index_musica == 0){ //Desabilita botão de retroceder se for a primeira música
        ret.style.opacity = 0.3;
    }else{
        ret.style.opacity = 1;
    }

    if(index_musica == (musicas.length - 1)){ //Desabilita botão de avançar se for a ultima música
        next.style.opacity = 0.3;
    }else{
        next.style.opacity = 1;
    }
}