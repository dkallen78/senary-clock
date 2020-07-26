const getRandomNumber = function(floor, ceiling) {
  //----------------------------------------------------//
  //Gets random number for the math problems            //
  //where floor is the lowest number possible and       //
  //ceiling is the highest number possible              //
  //----------------------------------------------------//

  let range = (ceiling - floor) + 1;
  return Math.floor((Math.random() * range) + floor);
}

function makeCircle() {
  //----------------------------------------------------//
  //Makes the circle SVG element for the outer face     //
  //of the clock                                        //
  //----------------------------------------------------//

  let circle = document.createElementNS(svgNS, "circle");
  circle.classList.add("circle");
  circle.id = "rim";

  circle.style.stroke = "aqua";
  circle.style.strokeWidth = 3;
  circle.style.fill = "none";

  return circle;
}

function makeCenter(parent) {
  let circle = document.createElementNS(svgNS, "circle");
  circle.classList.add("circle");
  circle.id = "center";

  circle.style.fill = "aqua";

  parent.appendChild(circle);
}

function makeEllipses(parent, number) {

  let defs = document.createElementNS(svgNS, "defs");

  let gradient = document.createElementNS(svgNS, "radialGradient");
  gradient.id = "ellipseGradient";

  addStop(gradient, "0%", "violet");
  addStop(gradient, "50%", "orchid");
  addStop(gradient, "100%", "fuchsia");

  defs.appendChild(gradient);
  parent.appendChild(defs);

  let angle = 0;
  let change = 360 / number;

  for (let i = 0; i < number; i++) {
    let ellipse = document.createElementNS(svgNS, "ellipse");
    ellipse.classList.add("ellipse");
    ellipse.style.transform = "rotate(" + angle + "deg)";
    parent.appendChild(ellipse);

    angle += change;
  }


}

function makeNumbers(parent, number) {
  let angle = 0;
  let change = 360 / number;

  for (let i = 0; i < number; i++) {
    angle += change;

    let digit = i + 1;
    let numero = document.createElementNS(svgNS, "text");
    numero.innerHTML = digit.toString(6).padStart(2, 0);
    numero.classList.add("numbers");
    numero.style.transform = "rotate(" + angle + "deg) translate(41vh, 8vh)";
    parent.appendChild(numero);
  }

  setTimeout(function() {
    let time = new Date();
    illuminateHour(time.getHours());
  }, 100);

}

function makeHand(parent, id) {
  let hand = document.createElementNS(svgNS, "rect");
  hand.id = id;
  hand.classList.add("hands");

  let defs = document.createElementNS(svgNS, "defs");
  let gradient = document.createElementNS(svgNS, "linearGradient");
  gradient.id = "handGradient";
  gradient.setAttribute("gradientTransform", "rotate(90)");

  /*addStop(gradient, "0%", "dodgerBlue");
  addStop(gradient, "100%", "aqua");*/

  addStop(gradient, "0%", "orangered");
  addStop(gradient, "100%", "gold");

  defs.appendChild(gradient);
  parent.appendChild(defs);
  parent.appendChild(hand);

  hand.style.fill = "url('#handGradient')";
  return hand;
}

function makeHandShadow(parent, id) {
  let hand = document.createElementNS(svgNS, "rect");
  hand.id = id;
  hand.classList.add("handShadows");

  parent.appendChild(hand);

  return hand;
}

function addStop(parent, offset, color) {
  let stop = document.createElementNS(svgNS, "stop");
  stop.setAttribute("offset", offset);
  stop.setAttribute("stop-color", color);
  parent.appendChild(stop);
}

function flicker() {
  //----------------------------------------------------//
  //Causes a flicker effect in the clock numbers        //
  //----------------------------------------------------//

  let numbers = document.getElementsByClassName("numbers");
  for (let i = numbers.length - 1; i >= 0; i--) {
    numbers[i].parentNode.removeChild(numbers[i]);
  }

  setTimeout(function() {
    makeNumbers(svg, 24);
  }, getRandomNumber(0, 100));
}

function illuminateHour(hour) {
  let newHour = ((hour + 24) - 1) % 24;
  let oldHour = ((hour + 24) - 2) % 24;
  let numbers = document.getElementsByClassName("numbers");
  numbers[oldHour].style.filter = "";
  numbers[newHour].style.filter = "drop-shadow(0 0 .5vh aqua)";
}

//
//The clock element in the HTML document
let clock = document.getElementById("clock");

//
//Makes the big SVG element to put in
//the HTML document
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
let svgNS = svg.namespaceURI;
svg.id = "svgClock";

let circle = makeCircle();

svg.appendChild(circle);

makeEllipses(svg, 24);
makeNumbers(svg, 24);

let defs = document.createElementNS(svgNS, "defs");
svg.appendChild(defs);
let filter = document.createElementNS(svgNS, "filter");
defs.appendChild(filter);
filter.id = "blur";
let blur = document.createElementNS(svgNS, "feGaussianBlur");
filter.appendChild(blur);
blur.setAttribute("in", "SourceGraphic");
blur.setAttribute("stdDeviation", "2");

let sHandShadow = makeHandShadow(svg, "sHandShadow");
let sHand = makeHand(svg, "sHand");

let mHandShadow = makeHandShadow(svg, "mHandShadow");
let mHand = makeHand(svg, "mHand");

let hHandShadow = makeHandShadow(svg, "hHandShadow");
let hHand = makeHand(svg, "hHand");

makeCenter(svg);

clock.appendChild(svg);

let numbers = document.getElementsByClassName("numbers");
let digitalTime = document.createElementNS(svgNS, "text");
digitalTime.setAttribute("textLength", "50%");
svg.appendChild(digitalTime);

//
//Will update the clock face at 100Hz
let hourCheck = null;

let refreshInterval = setInterval(function() {
  if (getRandomNumber(0, 200) === 1) {
    flicker();
  }

  let time = new Date();

  let msSeconds = (time.getSeconds() * 1000) + time.getMilliseconds();
  let sAngle = msSeconds * 0.006;
  sHand.style.transform = "rotate(" + sAngle + "deg)";
  sHandShadow.style.transform = "rotate(" + sAngle + "deg)";

  let msMinutes = (time.getMinutes() * 60000) + msSeconds;
  let mAngle = msMinutes * 0.0001;
  mHand.style.transform = "rotate(" + mAngle + "deg)";
  mHandShadow.style.transform = "rotate(" + mAngle + "deg)";

  let msHours = (time.getHours() * 3600000) + msMinutes;
  let hAngle = msHours * 0.00000833;
  hHand.style.transform = "rotate(" + hAngle + "deg)";
  hHandShadow.style.transform = "rotate(" + hAngle + "deg)";

  let hour = time.getHours().toString(6).padStart(2, 0);
  let minute = time.getMinutes().toString(6).padStart(3, 0);
  let second = time.getSeconds().toString(6).padStart(3, 0);
  let timeString = hour + ":" + minute + ":" + second;

  digitalTime.innerHTML = timeString;
  digitalTime.id = "digitalTime";

  if (hour !== hourCheck) {
    hourCheck = hour;
    illuminateHour(time.getHours());
  }

}, 10);
