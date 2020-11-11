//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

//variáveis de velocidade
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis da raquete
let xRaquete = 0;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 75;

//variáveis da raquete do oponente
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//variável de colisão
let colidiu = false;

function preload(){
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  mostraRaquetes();
  movimentaBolinha();
  verificaColisaoBorda();
  movimentaRaquete();
  movimentaRaqueteOponente();
  colisaoRaquete(xRaquete, yRaquete);
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  contaPontuacao();
  incluiPlacar();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width ||
     xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  } else if (yBolinha + raio > height ||
            yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquetes() {
  rect(xRaquete, yRaquete, raqueteComprimento, raqueteAltura);
  rect(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 5;
  } else if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 5;
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function colisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function contaPontuacao(){
  if (xBolinha - raio < 0) {
    pontosDoOponente += 1;
    ponto.play();
  } else if (xBolinha + raio > 600) {
    meusPontos += 1;
    ponto.play();
  }
}

function incluiPlacar(){
  textAlign(CENTER);
  textSize(20);
  fill(255);
  text(meusPontos, 200, 26);
  text(pontosDoOponente, 400, 26)
}