var myData;
var astronautlist = [];
var colorList = ['#669999',
  '#FED837',
  '#FFFFFF',
  '#73C3CA'
];

function preload() {
  myData = loadJSON('assets/peopleinspace.json');
}

function setup() {

  createCanvas(500, 500);
  angleMode(DEGREES);
  for (var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    var careerDays = astroData.careerdays;
    //var bioPhoto = astroData.biophoto;
    //var img = createImg(bioPhoto);
    var newAstronaut = new Astronaut(astroData.name, astroData.launchdate, astroData.careerdays, astroData.title);
    astronautlist.push(newAstronaut);
  }
  //print(astronautlist.length);
}

function draw() {
  background(51);
  //note
  //textFont('Satisfy');
  textAlign(CENTER);
  textSize(15);
  fill(255, 255, 255);
  text("Press the planet to see the astronant's name", 250, 430);
  text("Orbit Size >> Career Days     Planet Size >> Days in Space", 250, 450);

  push();
  translate(width / 2, height / 2);
  //rotate(45);
  ellipse(0, 0, 50, 50);
  for (var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    var careerDays = astroData.careerdays;
    stroke(254, 204, 51);
    strokeWeight(0.5);
    noFill();
    ellipse(0, 0, careerDays * 2.8, careerDays * 1.2);
  }
  for (var i = 0; i < astronautlist.length; i++) {
    var astro = astronautlist[i];
    astro.display();
    astro.move();
  }
  pop();
}

function Astronaut(name, date, careerdays, title) {
  this.name = name;
  this.launchDate = date;
  this.startPosition = random(0, 360);
  var daysInSpace = (Date.now() - Date.parse(this.launchDate)) / (1000 * 60 * 60 * 24) / 2; //milisecond from 1970 00:00)
  this.careerDays = careerdays;
  //print(daysInSpace);
  this.radius = daysInSpace;
  this.orbitalRadius = this.careerDays;
  this.title = title;
  var colorHex = random(colorList);
  //this.biophoto = biophoto;

  this.display = function() {
    //ellipse()
    stroke(255);
    if (this.title == 'Commander') {
      strokeWeight(5);
    } else {
      strokeWeight(2);
    }

    var distance = dist(mouseX - width / 2, mouseY - height / 2, this.x, this.y);
    print(distance);
    if (distance > this.radius) {
      //fill(75, 157, 197);
      fill(color(colorHex));
    } else {
      fill(255, 51, 102);
    }
    ellipse(this.x, this.y, this.radius * 2);
    if ((mouseIsPressed == true) && (distance <= this.radius)) {
      textAlign(CENTER);
      textSize(12);
      noStroke();
      fill(255);
      text(this.name, this.x, this.y + this.radius + 15);
      //image(this.img, this.x, this.y, 50, 50);
    }
    return false
  }

  this.move = function() {
    this.x = this.orbitalRadius * cos(frameCount / 2 + this.startPosition) * 1.4;
    this.y = this.orbitalRadius * sin(frameCount / 2 + this.startPosition) * 0.6;
  }
}