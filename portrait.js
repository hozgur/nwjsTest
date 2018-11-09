
var imgNames = ["portrait1.jpg", "portrait2.jpg", "portrait3.jpg"];
var img;
var imgIndex = 0;
function preload() {
  img =loadImage(imgNames[imgIndex]);
}

function nextImage() {
  background(255);
  //loop();
  frameCount = 0;
  image(img, 0, 0);    
  imgIndex += 1;
  if (imgIndex >= imgNames.length) {
    imgIndex = 0;
  }
}


function paintStroke(strokeLength, strokeColor,strokeThickness) {
  var stepLength = strokeLength/4.0;
  
  // Determines if the stroke is curved. A straight line is 0.
  var tangent1 = 0;
  var tangent2 = 0;
  
  var odds = random(1.0);
  
  if (odds < 0.7) {
    tangent1 = random(-strokeLength, strokeLength);
    tangent2 = random(-strokeLength, strokeLength);
  } 
  
  // Draw a big stroke
  noFill();
  stroke(strokeColor);
  strokeWeight(strokeThickness);
  curve(tangent1, -stepLength*2, 0, -stepLength, 0, stepLength, tangent2, stepLength*2);
  
  var z = 1;
  
  // Draw stroke's details
  for (num = strokeThickness; num > 0; num --) {
    var offset = random(-50, 25);
    var newColor = color(red(strokeColor)+offset, green(strokeColor)+offset, blue(strokeColor)+offset, random(100, 255));
    
    stroke(newColor);
    strokeWeight( random(0, 3));
    curve(tangent1, -stepLength*2, z-strokeThickness/2, -stepLength*random(0.9, 1.1), z-strokeThickness/2, stepLength*random(0.9, 1.1), tangent2, stepLength*2);
    
    z += 1;
  }
}


function setup() {
  createCanvas(950, 700);
  frameRate(60);
  nextImage();
}


function draw() {
  translate(width/2, height/2);
  
  var index = 0;
  
  //for (int y = 0; y < img.height; y+=1) {
  //  for (int x = 0; x < img.width; x+=1) {
  //    int odds = (int)random(2000);
      for(var a=0;a<50;a++)
			{
				
			var x =  random(img.width);
			var y =  random(img.height);
			index = y * img.width+x;
      //if (odds < 1) {
        loadPixels();
        var pixelColor = pixels[parseInt(index)];
        pixelColor = color(red(pixelColor), green(pixelColor), blue(pixelColor), 100);
        
        pushMatrix();
        translate(x-img.width/2, y-img.height/2);
        rotate(radians(random(-90, 90)));
        
        // Paint by layers from rough strokes to finer details
        if (frameCount < 20) {
          // Big rough strokes
          paintStroke(random(150, 250), pixelColor, random(20, 40));
        } else if (frameCount < 50) {
          // Thick strokes
          paintStroke(random(75, 125), pixelColor, random(8, 12));
        } else if (frameCount < 300) {
          // Small strokes
          paintStroke(random(30, 60), pixelColor, random(1, 4));
        } else if (frameCount < 350) {
          // Big dots
          paintStroke(random(5, 20), pixelColor, random(5, 15));
        } else if (frameCount < 900) {
          // Small dots
          paintStroke(random(1, 10), pixelColor, random(1, 7));
        }
        
        popMatrix();
			}
      //}
      
    //  index += 1;
    //}
  //}
  
  if (frameCount > 900) {
    noLoop();
  }
}


function mousePressed() {
  nextImage();
}