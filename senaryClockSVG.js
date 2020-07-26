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
}

function makeHand(id) {
  let hand = document.createElementNS(svgNS, "rect");
  hand.id = id;
  hand.classList.add("hands");
  return hand;
}

function flicker() {
  //----------------------------------------------------//
  //Causes a flicker effect in the clock numbers        //
  //----------------------------------------------------//

  let numbers = document.getElementsByClassName("numbers");
  for (let i = numbers.length - 1; i >= 0; i--) {
    numbers[i].parentNode.removeChild(numbers[i]);
  }
  numbers = document.getElementsByClassName("numbers");

  setTimeout(function() {
    makeNumbers(svg, 24);
  }, getRandomNumber(0, 100));
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

let sHand = makeHand("sHand");
svg.appendChild(sHand);

let mHand = makeHand("mHand");
svg.appendChild(mHand);

let hHand = makeHand("hHand");
svg.appendChild(hHand);

makeCenter(svg);

clock.appendChild(svg);

let numbers = document.getElementsByClassName("numbers");
console.log(numbers);

//
//Will update the clock face at 100Hz
let refreshInterval = setInterval(function() {
  if (getRandomNumber(0, 200) === 1) {
    flicker();
  }

  let time = new Date();

  let msSeconds = (time.getSeconds() * 1000) + time.getMilliseconds();
  let sAngle = msSeconds * 0.006;
  sHand.style.transform = "rotate(" + sAngle + "deg)";

  let msMinutes = (time.getMinutes() * 60000) + msSeconds;
  let mAngle = msMinutes * 0.0001;
  mHand.style.transform = "rotate(" + mAngle + "deg)";

  let msHours = (time.getHours() * 3600000) + msMinutes;
  let hAngle = msHours * 0.00000833;
  hHand.style.transform = "rotate(" + hAngle + "deg)";

}, 10);
