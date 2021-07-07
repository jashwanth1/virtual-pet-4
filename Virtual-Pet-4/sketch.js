var dog,saddog,happydog, database;
var foodS, foodStock;
var bedroom,garden,washroom;
var addFood;
var foodObj;


var feed, lastFed

function preload(){
  sadDog=loadImage("Dog.png")
  happyDog=loadImage("happy Dog.png");
  bedroom=loadImage("Bed Room.png");
  garden=loadImage("Garden.png");
  washroom=loadImage("Wash Room.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;




  addFood=createButton("Add Food");
  addFood.position(800,95)
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

}

function draw() {  
  background(46,139,87);

  foodObj.display();
  writeStock(foodS);
  
  if(foodS == 0){
    dog.addImage(happyDog);
    milkBottle2.visible=false;
  }else{
    dog.addImage(sadDog);
    milkBottle2.visible=true
  }
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed=data.val()
  })




  fill(255,255,255)

  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else{
    text("Last Feed: "+ lastFed+"AM",350,30)
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
}else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
} 
  if(gameState ===1){
    dog.addImage(happyDog)
    dog.scale=0.175;
    dog.y=250;
  }else(gameState === 2)
  {
    dog.addImage(sadDog)
    dog.scale=0.175;
    milkBottle2.visible=false;
    dog.y=250;
  }
 
  
  var Bath=createButton("I wany to take bath")
  Bath.position(580,125);
  if (bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }
  var sleep=createButton("I am very sleep")
  sleep.position(710,125);
  if (sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }
  var play=createButton("Lets play");
  play.position(500,160);
  if (play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }
  var playInGarden=createButton("Lets play in park");
  playInGarden.position(585,160);
  if (playInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.addImage(garden);
    dog.scale=1;
    milkBottle2.visible=false;
  }

  drawSprites();
}


function readStock(data) {
  foodS=data.val();
  foodObj.updateFoodStock();
}


function feedDog() {
  dog.addImage(happyDog);


  var food_Stock_val = foodObj.getFoodStock();
  if(food_Stock_val <= 0){
    foodObj.updateFoodStock(food_Stock_val = 0);
  }else{
    foodObj.updateFoodStock(food_Stock_val = -1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()

  })

}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


function update(state){
  database.ref('/').update({
    gameState:state
  });
}
function readStock(data) 
{
  foodS = data.val();
}
function writeStock(x) 
{
  database.ref('/').update({
    food:x
  })
}