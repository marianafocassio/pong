//variáveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//velocidade bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variáveis raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

//velocidade raquete oponente
let velocidadeYOponente;

//p5collide2d
let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponentes = 0;

let chanceDeErrar = 0;

//sons jogo
let somRaquetada;
let somPonto;
let trilhaSonora;

function preload () {
  trilhaSonora = loadSound("/sons/trilha.wav");
  somPonto = loadSound("/sons/ponto.wav");
  somRaquetada = loadSound("/sons/raquetada.wav");
}

//tamanho cenário
function setup() {
  createCanvas(600, 400);
  trilhaSonora.loop();
}

//execução dos desenhos e movimentação
function draw() {
  background(173, 232, 244);
  
  mostraBolinha();
  
  movimentaBolinha();
  
  verificaColisaoBorda();
  
  mostraRaquete(xRaquete, yRaquete);
  
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  
  movimentaMinhaRaquete();
  
  movimentaRaqueteOponente();
  
  verificaColisao(xRaquete, yRaquete);
  
  verificaColisao(xRaqueteOponente, yRaqueteOponente);
  
  incluiPlacar();
  
  marcaPonto();
}

function mostraBolinha() {
  fill(2, 62, 138);
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha; // xBolinha = xBolinha + velocidadeXBolinha
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    //condição para o eixo x
  if(xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  //condição para o eixo y
  if(yBolinha + raio > height || yBolinha - raio < 0 ) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete (x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete, 10);
}

function movimentaMinhaRaquete () {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -=10;
  }
    if(keyIsDown(DOWN_ARROW)) {
    yRaquete +=10;
  }
}

function calculaChanceDeErrar() {
  if (pontosOponentes >= meusPontos) {
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

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function verificaColisao (x, y) {
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1;
    somRaquetada.play();
  }
}

function incluiPlacar () {
  stroke(0, 150, 199)
  textSize(22);
  textAlign(CENTER);
  fill(color (0, 150, 199));
  rect(145, 7, 50, 30, 5);
  fill(255);
  text(meusPontos, 170, 30);
  fill(color (0, 150, 199));
  rect(445, 7, 50, 30, 5);
  fill(255);
  text(pontosOponentes, 470, 30);
}

function marcaPonto () {
  if (xBolinha > 590) {
    meusPontos += 1;
    somPonto.play();
  }
  if (xBolinha < 10) {
    pontosOponentes += 1;
    somPonto.play();
  }
}