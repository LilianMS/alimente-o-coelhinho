const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var chao, fundo, rope, fruta, fruta_con;
var coelho, coelho_img;
var button1;
var sound, musica;
var pisca, come, triste;
var come_som,triste_som,air,cut_som;
var rope2,rope3;
var fruta_con2,fruta_con3;
var canW, canH;

function preload(){
  fundo = loadImage("assets/background.png");
  coelho_img = loadImage("assets/eat_0.png");
  musica = loadSound("assets/sound1.mp3");
  pisca = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png");
  come = loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png",);
  triste = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png");
  come_som = loadSound("assets/eating_sound.mp3");
  triste_som = loadSound("assets/sad.wav");
  air = loadSound("assets/air.wav");
  cut_som = loadSound("assets/rope_cut.mp3");

  come.looping = false;
  triste.looping = false;



}

function setup() {

  var isMobile = /iPhone|iPad|iPod|Anroid/i.test(navigator.userAgent)

  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW,canW);
  }else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW,canH);
  }

  engine = Engine.create();
  world = engine.world;

  chao = new Ground(width/2,height-10,width,20);
  rope = new Rope(6,{x:200,y:30});
  rope2 = new Rope(4,{x:90,y:30});
  rope3 = new Rope(7,{x:300,y:30});
  fruta = new Fruta();

  Composite.add(rope,fruta);
  fruta_con = new Link(rope,fruta.body);
  Composite.add(rope2,fruta);
  fruta_con2 = new Link(rope2,fruta.body);
  Composite.add(rope3,fruta);
  fruta_con3 = new Link(rope3,fruta.body);

  pisca.frameDelay = 30;
  come.frameDelay = 20;
  triste.frameDelay = 30;

  coelho = createSprite(350,canH-80);
  coelho.addAnimation('piscando',pisca);
  coelho.addAnimation('comendo',come);
  coelho.addAnimation('triste',triste);

  coelho.scale = 0.2;
  coelho.debug = false;
  coelho.setCollider("rectangle", 0,0,300,600);
  
  button1 = createImg("assets/cut_btn.png");
  button1.position(170,30);
  button1.size(50,50);
  button1.mouseClicked(drop);

  button2 = createImg("assets/cut_btn.png");
  button2.position(70,30);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg("assets/cut_btn.png");
  button3.position(270,30);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  sound = createImg("assets/mute.png");
  sound.position(390,30);
  sound.size(50,50);
  sound.mouseClicked(playMute);

  balao = createImg("assets/balloon.png");
  balao.position(427,160)
  balao.size(70,50)
  balao.mouseClicked(ar)

  //musica.play();

  imageMode(CENTER)
  rectMode(CENTER)
  ellipseMode(CENTER)
}

function draw() {
  background(51);
  image(fundo,width/2,height/2,width,height);

  text(mouseX + ","+ mouseY, 20,20);
  
  chao.show();
  rope.show();
  rope2.show();
  rope3.show();

  if(fruta !== null){
    fruta.show();   
  }
  


Engine.update(engine);

  drawSprites();

  if(colisao(fruta,coelho,80)==true){
    World.remove(world,fruta.body);
    fruta = null;
    coelho.changeAnimation("comendo");
    come_som.play();
  }

  if(colisao(fruta,chao.body,120) == true){
    coelho.changeAnimation("triste");
    if(triste_som.isPlaying() == false){
      triste_som.play();
      triste_som.setVolume(0.2);
    }
  }
}



function drop(){
  rope.break();
  fruta_con.cut();
  cut_som.play();
}
function drop2(){
  rope2.break();
  fruta_con2.cut();
  cut_som.play();
}
function drop3(){
  rope3.break();
  fruta_con3.cut();
  cut_som.play();
}

function playMute(){

  if(musica.isPlaying()){
    musica.stop();
    sound.style("filter","hue-rotate(0)");
  }else{
    musica.play();
    musica.setVolume(0.3);
    sound.style("filter","hue-rotate(120deg)");
  }

}


function colisao(body,sprite,c){
  if(body !== null){
    var d = dist(body.body.position.x,body.body.position.y,sprite.position.x,sprite.position.y);

    if(d < c){
      return true;
    }else{
      return false;
    }

  }
}

function ar(){
  air.play();
  air.setVolume(0.2);
  Body.applyForce(fruta.body,{x:0,y:0},{x:-0.01,y:0});
}