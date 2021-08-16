const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope, fruit, fruitConstraint;
var bgImg, cutImg, fruitImg, rabbitImg;
var rabbit;
var blinkAnim, eatAnim, sadAnim

function preload() {
  bgImg = loadImage("./assets/background.png");
  fruitImg = loadImage("./assets/melon.png");
  rabbitImg = loadImage("./assets/Rabbit-01.png");

  blinkAnim = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png");
  blinkAnim.playing = true;
  blinkAnim.frameDelay = 10;
  eatAnim = loadAnimation("./assets/eat_0.png", "./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png");
  eatAnim.playing = true;
  eatAnim.looping = false;
  sadAnim = loadAnimation("./assets/sad_1.png", "./assets/sad_2.png", "./assets/sad_3.png");
  sadAnim.playing = true;
  sadAnim.looping = false;
}

function setup() 
{
  createCanvas(500, 700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200, 690, 600, 20);
  rope = new Rope(6, {x: 250, y: 30});
  rabbit = createSprite(width/2, height-70, 100, 100);
  //rabbit.addImage(rabbitImg);
  rabbit.addAnimation("blink", blinkAnim);
  rabbit.addAnimation("sad", sadAnim);
  rabbit.addAnimation("eat", eatAnim);
  rabbit.scale = 0.175;

  button = createImg("./assets/cut_btn.png");
  button.position(225, 25);
  button.size(50, 50);

  button.mouseClicked(drop);
  
  var fruit_options = {
    density: 0.001
  }

  fruit = Bodies.circle(300, 300, 15, fruit_options);
  Composite.add(rope.body, fruit);

  imageMode(CENTER);
  fruitConstraint = new Link(rope, fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bgImg, width/2, height/2, 500, 700);
  ground.show();
  rope.show();
  ellipse(fruit.position.x, fruit.position.y, 15, 15);
  if (fruit != null) {
    image(fruitImg, fruit.position.x, fruit.position.y, 70, 70);  
    if (collide(fruit, rabbit) == true) {
      rabbit.changeAnimation("eat");
      sadAnim.playing = false;
    }
    if (collide(fruit, ground.body) == true) {
      rabbit.changeAnimation("sad");
    }
  }



  Engine.update(engine);
  
  drawSprites(); 
}

function drop() {
  rope.break();
  fruitConstraint.detach();
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
  }
  if (d <= 80) {
    World.remove(world, body);
    return true;
  } else {
    return false;
  }
}
