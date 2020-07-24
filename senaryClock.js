function makeCanvas(id, height = 900, width = 900) {
  //----------------------------------------------------//
  //Returns a canvas                                    //
  //string-> id: the id of the canvas                   //
  //integer-> height: height of the canvas              //
  //integer-> width: width of the makeCanvas            //
  //----------------------------------------------------//

  var canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.classList.add("canvas");
  canvas.height = height;
  canvas.width = width;

  return canvas;
}

function drawHand(radians, handLength, handWidth) {
  let x1 = (450 + (20 * Math.cos(radians * Math.PI)));
  let y1 = (450 + (20 * Math.sin(radians * Math.PI)));

  let x2 = (450 + (handLength * Math.cos(radians * Math.PI)));
  let y2 = (450 + (handLength * Math.sin(radians * Math.PI)));

  handContext.beginPath();
  handContext.moveTo(x1, y1);
  handContext.lineTo(x2, y2);
  handContext.lineWidth = handWidth;
  handContext.shadowOffsetX = 5;
  handContext.shadowOffsetY = 5;
  handContext.shadowBlur = 5;
  handContext.shadowColor = "black";
  let grad = handContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, "aqua");
  grad.addColorStop(1, "dodgerBlue");
  handContext.strokeStyle = grad;
  handContext.stroke();
  handContext.closePath();
}

let senaryClock = document.getElementById("clock");

//
//Makes the canvas for the clock face
let clockCanvas = makeCanvas("clockCanvas");
senaryClock.appendChild(clockCanvas);
let clockContext = clockCanvas.getContext("2d");

//
//Sets the color and style of the clock elements
let lineWidth = 5;
let baseColor = "fuchsia";
let baseShadow = "rgba(255, 0, 0, 1)";
//baseColor = "red";

//
//Draws the outer circle of the clock face
clockContext.beginPath();
clockContext.arc(450, 450, 400, 0, (2 * Math.PI));

clockContext.shadowOffsetX = 5;
clockContext.shadowOffsetY = 5;
clockContext.shadowBlur = 5;
clockContext.shadowColor = "black";
clockContext.lineWidth = lineWidth;
/*let faceGrad = clockContext.createLinearGradient(450, 900, 450, 0);
faceGrad.addColorStop(0, "gold");
faceGrad.addColorStop(1, "orangered");
clockContext.fillStyle = faceGrad;
clockContext.fill();*/
clockContext.strokeStyle = "aqua";
clockContext.stroke();

//
//Lifts the "pen" off of the canvas
clockContext.closePath();

//
//Draws the 24 hour markers on the face
let faceNumber = 5;
for (let i = 0; i < 1.9999999; i += .083333333) {
  clockContext.beginPath();

  let xPos = (450 + (300 * Math.cos(i * Math.PI)));
  let yPos = (450 + (300 * Math.sin(i * Math.PI)));

  faceNumber = (faceNumber % 24) + 1;
  let ellipseRot = faceNumber * (2/24);

  clockContext.ellipse(xPos, yPos, 20, 5, ((ellipseRot + 1.5) * Math.PI), 0, (2 * Math.PI));

  //
  //Text position
  let xPos3 = (450 + (360 * Math.cos(i * Math.PI)));
  let yPos3 = (450 + (360 * Math.sin(i * Math.PI)));

  clockContext.lineWidth = 10;
  let grd = clockContext.createRadialGradient(xPos, yPos, 1, xPos, yPos, 20);
  grd.addColorStop(0, "violet");
  grd.addColorStop(.5, "orchid");
  grd.addColorStop(1, "fuchsia");
  clockContext.fillStyle = grd; //fuchsia
  clockContext.fill();
  clockContext.closePath();

  clockContext.beginPath();
  clockContext.font = "40px Monospace";
  clockContext.fillStyle = "fuchsia";
  clockContext.shadowOffsetX = 5;
  clockContext.shadowOffsetY = 5;
  clockContext.shadowBlur = 5;
  clockContext.shadowColor = "black";
  clockContext.strokeStyle = "aqua";
  clockContext.lineWidth = 1.5;
  clockContext.strokeText(faceNumber.toString(6).padStart(2, 0), xPos3 - 25, yPos3 + 12);
  //clockContext.fill();
  clockContext.closePath();
}

//
//Draws the center dot
clockContext.beginPath();
clockContext.arc(450, 450, 10, 0, (2 * Math.PI));
clockContext.fillStyle = baseColor;
clockContext.fill();
clockContext.shadowOffsetX = 5;
clockContext.shadowOffsetY = 5;
clockContext.shadowBlur = 5;
clockContext.shadowColor = "black";
clockContext.closePath();

//
//The hands of the clock
let handCanvas = makeCanvas("handCanvas");
senaryClock.appendChild(handCanvas);
let handContext = handCanvas.getContext("2d");

//
//Will update the clock face at 100Hz
let refreshInterval = setInterval(function() {
  handContext.clearRect(0, 0, 900, 900);
  drawHands();

}, 10);

function drawHands() {
  let time = new Date();
  //
  //These equations calculate the number
  //of milliseconds in a second, minute, and hour
  let msSeconds = (time.getSeconds() * 1000) + time.getMilliseconds();
  let msMinutes = (time.getMinutes() * 60000) + msSeconds;
  let msHours = (time.getHours() * 3600000) + msMinutes;

  //
  //Draws the second hand
  let sAngle = ((msSeconds * 0.0000333) + 1.5) % 2;
  drawHand(sAngle, 310, 10);
  //
  //Draws the minute hand
  let mAngle = ((msMinutes * 0.000000555) + 1.5) % 2;
  drawHand(mAngle, 230, 15);
  //
  //Draws the hour hand
  let hAngle = ((msHours * 0.000000023148148) + 1.5) % 2;
  drawHand(hAngle, 150, 20);

  //
  //Displays the time numerically
  let hour = time.getHours().toString(6).padStart(2, 0);
  let minute = time.getMinutes().toString(6).padStart(3, 0);
  let second = time.getSeconds().toString(6).padStart(3, 0);
  let timeString = hour + ":" + minute + ":" + second;

  handContext.beginPath();

  handContext.font = "40px Monospace";
  handContext.fillStyle = baseColor;
  handContext.lineWidth = lineWidth;
  handContext.shadowOffsetX = 5;
  handContext.shadowOffsetY = 5;
  handContext.shadowBlur = 5;
  handContext.shadowColor = "black";
  handContext.fillText(timeString, 330, 395);


  handContext.rect(320, 350, 260, 60);
  handContext.strokeStyle = "aqua";
  handContext.stroke();
  handContext.closePath();
}
