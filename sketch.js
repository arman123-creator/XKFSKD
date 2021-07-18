var dog,sadDog,happyDog,milk,washroom,lazyDog,bedRoom;
var foodObj;
var foodS, foodStock;
var fedTime, lastFed, feed, addFood;    

function preload(){
  sadDog=loadImage("images/Dog.png");
  happyDog=loadImage("images/Happy.png");
gardenImage = loadImage("images/Garden.png");
livingRoom = loadImage("images/Living Room.png")
milkBottle = loadImage("images/milk.png")
washroom = loadImage("images/Wash Room.png");
lazyDod = loadImage("images/Lazy.png");
bedRoom = loadImage("images/Bed Room.png");
}

function setup() {
  database = firebase.database()
  createCanvas(1000,600);
  
  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.2;

milk = createSprite(700,200,150,150)
milk.addImage(milkBottle)
milk.scale = 0.1

  feed = createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  var name = createInput("NAME")
  name.position(900,95);

var title = createElement('h4')
title.html("PLEASE GIVE YOUR PET A NAME")
title.position(900,50)

var Bath = createButton("I WANT TO TAKE BATH");
  Bath.position(500,125)
Bath.mousePressed(BathDog)


var Park = createButton("I WANT TO GO TO GARDEN");
  Park.position(480,155)
Park.mousePressed(GotoGarden)


var Bed = createButton("I WANT TO SLEEP");
Bed.position(480,185);
Bed.mousePressed(Sleeping);

var living = createButton("GIVE ME BONE")
living.position(480,215)
living.mousePressed(Bone);

}

function draw() {
  background("white");

 
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill("red");
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %12 + "PM", 350, 30);
  }
  else if(lastFed == 0) {
    text("Last Feed: 12AM ", 350, 30);
  }
  else {
    text("Last Feed:  " + lastFed + "AM", 350, 30);
  }

  
  


  


  drawSprites();

}

//function to read Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
  function feedDog() {
    dog.addImage(happyDog);
    milk.visible = false;
    
    dog.y =300;
    dog.scale =0.27;

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }

function BathDog(){
  dog.addImage(washroom)
    milk.visible = false;
    dog.x=500;
    dog.y=350;
    dog.scale=0.7;
   dog.width=800;
}


function GotoGarden(){
    dog.addImage(gardenImage)
    milk.visible=false;
    dog.x=500;
    dog.y=350;
    dog.scale=0.7;
   dog.width=800;
}
function Sleeping(){
dog.addImage(bedRoom)
milk.visible=false;
dog.x=500;
dog.y=350;
dog.scale=0.7;
dog.width=800;
}
function Bone(){
    dog.addImage(livingRoom)
    milk.visible=false;
    dog.x=500;
    dog.y=350;
    dog.scale=0.7;
   dog.width=800;
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}
