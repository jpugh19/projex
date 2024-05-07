// youtube link: https://www.youtube.com/watch?v=Nb9F6BK_W34

let sprite;
let sheet;
let animations;
let port;
let joyX = 0;
let joyY = 0;
let sw = 0;
let connectButton;
let circleX;
let circleY;
let speed = 3;
let width = 3065;
let height = 1540;
let maze = [];
let maze1 = [];
let maze2 = [];
let maze3 = [];
let pages = [];
let treasure1;
let treasure2;
let treasure3;
let portalA;
let portalB;
let redPortalA;
let redPortalB;
let bluePortalA;
let bluePortalB;
let greenPortalA;
let greenPortalB;
let redPortal = 0;
let greenPortal = 0;
let bluePortal = 0;
let currentMaze = 0;
let drawn = false;
let warp = 0;
let gameFont;
let characterSelect;
let startButton;
let redoButton;
let treasureSound = new Tone.PolySynth(Tone.MetalSynth);
let portalSound = new Tone.PolySynth(Tone.MonoSynth);
let crusher = new Tone.BitCrusher(3);
let delay = new Tone.Delay(0, 2);
let notes = ["C2", "A#3", "C2", "C4", "C2", "G3", "C2", "F3", "C2", "A#3", "C2", "C4", "C2", "G3", "C2", "F3", "C2", "A#3", "C2", "G#3", "C2", "D#3", "C2", "F3", "C2", "A#3", "C2", "G#3", "C2", "D#3", "C2", "F3"];

treasureSound.connect(crusher);
crusher.toDestination();
portalSound.connect(delay);
delay.toDestination();

let instrument = new Tone.Synth({
  oscillator: {
    type: "square"
  },
  envelope: {
    attack: 1.0,
    decay: 0.1,
    sustain: 1,
    release: 2.0
  }
}).toDestination();

let soundTrack = new Tone.Sequence (function (time, note) {
  instrument.triggerAttackRelease(note, 0.8);
}, notes, "8n");

maze1.push([width / 2, 0, width, 1]);
maze1.push([width / 2, height, width, 1]);
maze1.push([width, height / 2, 1, height]);
maze1.push([0, height / 2, 1, height]); // 0
maze1.push([300, 120, 599, 40]);
maze1.push([790, 120, 180, 40]);
maze1.push([900, 643, 40, 1284]);
maze1.push([400, 400, 40, 520]);
maze1.push([650, 260, 280, 40]); // 5
maze1.push([260, 835, 40, 1220]);
maze1.push([162, 245, 155, 40]);
maze1.push([80, 385, 155, 40]);
maze1.push([162, 525, 155, 40]);
maze1.push([80, 665, 155, 40]); // 10
maze1.push([162, 810, 155, 40]);
maze1.push([110, 1239, 40, 600]);
maze1.push([529, 400, 40, 239]);
maze1.push([760, 400, 240, 40]);
maze1.push([694, 540, 371, 40]); // 15
maze1.push([570, 680, 380, 40]);
maze1.push([580, 810, 600, 40]);
maze1.push([400, 1190, 40, 508]);
maze1.push([710, 957, 340, 40]);
maze1.push([590, 1110, 340, 40]); // 20
maze1.push([710, 1265, 340, 40]);
maze1.push([721, 1424, 600, 40]);
maze1.push([1660, 640, 1480, 40]);
maze1.push([1043, 1104, 40, 681]);
maze1.push([1180, 1219, 40, 640]); // 25
maze1.push([1333, 1104, 40, 681]);
maze1.push([1480, 1219, 40, 640]);
maze1.push([1623, 1104, 40, 681]);
maze1.push([1780, 1219, 40, 640]);
maze1.push([1188, 784, 248, 40]); // 30
maze1.push([1478, 784, 248, 40]);
maze1.push([1968, 784, 648, 40]);
maze1.push([2271, 1104, 40, 600]);
maze1.push([1976, 919, 350, 40]);
maze1.push([2076, 1074, 350, 40]); // 35
maze1.push([1976, 1229, 350, 40]);
maze1.push([2076, 1384, 350, 40]);
maze1.push([2420, 840, 40, 440]);
maze1.push([2732, 1384, 663, 40]);
maze1.push([2622, 1184, 663, 40]); // 40
maze1.push([2933, 872, 40, 584]);
maze1.push([2580, 840, 40, 440]);
maze1.push([2690, 1040, 180, 40]);
maze1.push([2760, 870, 40, 300]);
maze1.push([2736, 600, 352, 40]); // 45
maze1.push([2933, 243, 40, 484]);
maze1.push([2540, 425, 200, 40]);
maze1.push([2803, 347, 40, 464]);
maze1.push([1023, 163, 40, 324]);
maze1.push([1173, 465, 504, 40]); // 50
maze1.push([1448, 305, 590, 40]);
maze1.push([1393, 135, 700, 40]);
maze1.push([1764, 220, 40, 210]);
maze1.push([1980, 465, 920, 40]);
maze1.push([2420, 280, 40, 330]); // 55
maze1.push([2680, 260, 205, 40]);
maze1.push([2612, 135, 342, 40]);
maze1.push([2003, 135, 436, 40]);
maze1.push([2092, 305, 614, 40]);

maze2.push([width / 2, 0, width, 1]);
maze2.push([width / 2, height, width, 1]);
maze2.push([width, height / 2, 1, height]);
maze2.push([0, height / 2, 1, height]); // 0
maze2.push([110, 770, 40, 1360]);
maze2.push([300, 110, 340, 40]);
maze2.push([400, 260, 340, 40]);
maze2.push([250, 530, 40, 500]);
maze2.push([590, 141, 40, 278]); // 5
maze2.push([690, 760, 600, 40]);
maze2.push([410, 510, 40, 240]);
maze2.push([735, 610, 610, 40]);
maze2.push([675, 410, 490, 40]);
maze2.push([300, 910, 340, 40]); //10
maze2.push([620, 1115, 40, 670]);
maze2.push([365, 1080, 470, 40]);
maze2.push([300, 1430, 340, 40]);
maze2.push([430, 1260, 340, 40]);
maze2.push([800, 1204, 40, 670]); // 15
maze2.push([750, 251, 40, 278]);
maze2.push([900, 196, 40, 389]);
maze2.push([1060, 365, 40, 530]);
maze2.push([970, 1115, 40, 670]);
maze2.push([1290, 1430, 600, 40]); // 20
maze2.push([1340, 1280, 696, 40]);
maze2.push([1709, 1400, 40, 280]);
maze2.push([1100, 880, 40, 580]);
maze2.push([1150, 610, 60, 40]);
maze2.push([1200, 365, 40, 530]); // 25
maze2.push([1550, 610, 420, 40]);
maze2.push([1360, 345, 40, 490]);
maze2.push([1450, 760, 380, 40]);
maze2.push([1280, 975, 40, 390]);
maze2.push([1190, 1150, 140, 40]); // 30
maze2.push([1530, 245, 40, 490]);
maze2.push([1700, 295, 40, 590]);
maze2.push([1620, 975, 40, 390]);
maze2.push([1450, 1005, 40, 250]);
maze2.push([1515, 1150, 170, 40]); // 35
maze2.push([1815, 1280, 170, 40]);
maze2.push([2400, 1430, 1100, 40]);
maze2.push([2465, 1280, 890, 40]);
maze2.push([2930, 970, 40, 880]);
maze2.push([2987, 510, 154, 40]); // 40
maze2.push([2210, 1150, 1140, 40]);
maze2.push([2800, 585, 40, 1170]);
maze2.push([2930, 190, 40, 380]);
maze2.push([1780, 810, 40, 440]);
maze2.push([2077, 610, 556, 40]); // 45
maze2.push([2110, 1010, 420, 40]);
maze2.push([2610, 1010, 340, 40]);
maze2.push([2295, 860, 790, 40]);
maze2.push([2300, 935, 40, 110]);
maze2.push([1920, 785, 40, 110]); // 50
maze2.push([2055, 685, 40, 110]);
maze2.push([2200, 785, 40, 110]);
maze2.push([2335, 685, 40, 110]);
maze2.push([2670, 475, 40, 730]);
maze2.push([2510, 510, 40, 460]); // 55
maze2.push([2590, 720, 120, 40]);
maze2.push([2180, 460, 620, 40]);
maze2.push([1850, 240, 40, 480]);
maze2.push([2040, 130, 340, 40]);
maze2.push([2480, 130, 340, 40]); // 60
maze2.push([2250, 300, 480, 40]);

maze3.push([width / 2, 0, width, 1]);
maze3.push([width / 2, height, width, 1]);
maze3.push([width, height / 2, 1, height]);
maze3.push([0, height / 2, 1, height]); // 0
maze3.push([800, height / 2, 40, height]);
maze3.push([500, 1400, 240, 40]);
maze3.push([640, 1140, 40, 560]);
maze3.push([510, 1200, 40, 360]);
maze3.push([290, 1040, 400, 40]); // 5
maze3.push([190, 1220, 380, 40]);
maze3.push([210, 1400, 160, 40]);
maze3.push([110, 1330, 40, 180]);
maze3.push([420, 880, 400, 40]);
maze3.push([110, 770, 40, 500]); // 10
maze3.push([640, 430, 40, 680]);
maze3.push([510, 660, 40, 400]);
maze3.push([240, 760, 40, 200]);
maze3.push([375, 565, 40, 410]);
maze3.push([487, 340, 264, 40]); // 15
maze3.push([240, 370, 40, 300]);
maze3.push([287, 640, 136, 40]);
maze3.push([155, 500, 130, 40]);
maze3.push([510, 110, 40, 220]);
maze3.push([355, 200, 270, 40]); // 20
maze3.push([110, 180, 40, 360]);
maze3.push([240, 140, 40, 80]);
maze3.push([375, 40, 40, 80]);
maze3.push([width / 2, 800, 1424, 40]);
maze3.push([2225, 1180, 40, 720]); // 25
maze3.push([2060, 1227, 40, 624]);
maze3.push([1550, 1060, 980, 40]);
maze3.push([1500, 935, 1080, 40]);
maze3.push([1580, 1310, 40, 460]);
maze3.push([1900, 1395, 280, 40]); // 30
maze3.push([1740, 1300, 40, 230]);
maze3.push([1850, 1205, 180, 40]);
maze3.push([940, 1165, 40, 500]);
maze3.push([1380, 1215, 360, 40]);
maze3.push([1080, 1248, 40, 335]); // 35
maze3.push([1280, 1395, 360, 40]);
maze3.push([2900, 1400, 328, 40]);
maze3.push([2490, 1400, 300, 40]);
maze3.push([2360, 1180, 40, 400]);
maze3.push([2620, 1180, 40, 400]); // 40
maze3.push([2490, 1000, 40, 760]);
maze3.push([2756, 1090, 40, 400]);
maze3.push([2964, 1270, 200, 40]);
maze3.push([2876, 1140, 200, 40]);
maze3.push([2964, 1010, 200, 40]); // 45
maze3.push([2740, 870, 460, 40]);
maze3.push([2360, 580, 40, 580]);
maze3.push([2787, 640, 554, 40]);
maze3.push([2950, 800, 40, 100]);
maze3.push([2795, 710, 40, 100]); // 50
maze3.push([2650, 800, 40, 100]);
maze3.push([2658, 490, 554, 40]);
maze3.push([1995, 640, 500, 40]);
maze3.push([2915, 295, 40, 350]);
maze3.push([1628, 490, 1424, 40]); // 55
maze3.push([1725, 585, 40, 150]);
maze3.push([1210, 640, 780, 40]);
maze3.push([936, 234, 40, 292]);
maze3.push([1356, 360, 800, 40]);
maze3.push([1776, 235, 40, 470]); // 60
maze3.push([1296, 108, 680, 40]);
maze3.push([1410, 234, 690, 40]);
maze3.push([2618, 140, 554, 40]);
maze3.push([2590, 310, 420, 40]);
maze3.push([2260, 310, 160, 40]); // 65
maze3.push([2200, 205, 40, 170]);
maze3.push([1940, 310, 288, 40]);
maze3.push([2036, 140, 288, 40]);

function preload() {
  animations = {
    stand: { row: 0, col: 0, frames: 1 },
    walkRight: { row: 0, col: 1, frames: 8 },
    walkUp: { row: 5, frames: 6 },
    walkDown: { row: 5, col: 6, frames: 6 },
    portal: { row: 11, col: 1, frames: 1 },
    treasure: { row: 11, col: 4, frames: 1 }
  };

  gameFont = loadFont('assets/Playball.ttf');
}

Tone.Transport.start();
Tone.Transport.bpm.value = 90;
portalSound.volume.value = 2;

function setup() {
  port = createSerial();
  createCanvas(width, height);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }

  frameRate(60);

  textFont(gameFont);

  makeButtons();
}

function draw() {
  background(220);
  if (!drawn) {
    drawMaze();
    drawn = true;
  }

  if (currentMaze == 0) {
    startPage();
  }
  else if (currentMaze == 1) {
    level1(sprite, treasure1);
  }
  else if (currentMaze == 2) {
    level2(sprite, treasure2);
  }
  else if (currentMaze == 3) {
    level3(sprite, treasure3);
  }
  else {
    soundTrack.stop();
    endPage();
  }

  let characters = port.available();
  let str = port.read(characters);
  let lines = str.split("\n");
  let latest = "";
  if (lines.length > 0) {
    let lastIndex = lines.length > 1 ? lines.length - 2 : lines.length - 1;
    latest = lines[lastIndex];
  }
  let values = latest.split(",");
  if (values.length > 2) {
    joyX = values[0];
    joyY = values[1];
    sw = Number(values[2]);
  }

  if (port.opened() && frameCount % 3 == 0) {
    let message = `${currentMaze} ${redPortal} ${greenPortal} ${bluePortal}\n`;
    port.write(message);
  }
}

function keyPressed() {
  if (keyCode === 32 && keyIsPressed) {
    replay();
  }
}

function makeButtons() {
  characterSelect = createSelect();
  characterSelect.position(1250, 800);
  characterSelect.size(500, 100);
  characterSelect.style('font-size', '64px');
  characterSelect.option('Spelunky Guy');
  characterSelect.option('Ninja');
  characterSelect.option('Viking');
  characterSelect.option('Green Girl');
  characterSelect.option('Cyclops');
  characterSelect.option('Robot');
  characterSelect.option('Meat Boy');
  characterSelect.option('Van Helsing');
  characterSelect.selected('Spelunky Guy');

  startButton = createButton("Start Game");
  startButton.position(1300, 1200);
  startButton.size(400, 200);
  startButton.style('font-size', '64px');
}

function startPage() {
  textSize(256);
  text("Amazing Maze", 800, 300);

  textSize(96);
  text("Select your Character", 1100, 700);

  startButton.mousePressed(startGame);
}

function endPage() {
  textSize(256);
  text("Congratulations!", 800, 300);

  textSize(96);
  text("You Completed Amazing Maze", 1050, 700);

  text("Press Space to Play Again", 1100, 1300)

  keyPressed();
}

function level1(sprite, treasure) {
  move(sprite);

  if (sprite.overlapping(treasure) && sw == 1) {
    treasureSound.triggerAttackRelease('A6', "8n");
    transition(treasure);
  }
}

function level2(sprite, treasure) {
  move(sprite);

  if (sprite.overlapping(portalA)) {
    if (sw == 1) {
      if (warp == 0) {
        portalSound.triggerAttackRelease('C5', "8n");
        sprite.x = portalB.x;
        sprite.y = portalB.y;
        warp = 1;
      }
    }
    else {
      warp = 0;
    }
    redPortal = 255;
    bluePortal = 255;
    greenPortal = 255;
  }
  else if (sprite.overlapping(portalB)) {
    if (sw == 1) {
      if (warp == 0) {
        portalSound.triggerAttackRelease('C5', "8n");
        sprite.x = portalA.x;
        sprite.y = portalA.y;
        warp = 1;
      }
    }
    else {
      warp = 0;
    }
    redPortal = 255;
    bluePortal = 255;
    greenPortal = 255;
  }
  else {
    redPortal = 0;
    bluePortal = 0;
    greenPortal = 0;
  }

  if (sprite.overlapping(treasure) && sw == 1) {
    treasureSound.triggerAttackRelease('A6', "8n");
    transition(treasure);
  }
}

function level3(sprite, treasure) {
  move(sprite);

  if (sprite.overlapping(redPortalA)) {
    if (sw == 1) {
      if (warp == 0) {
        portalSound.triggerAttackRelease('C5', "8n");
        sprite.x = redPortalB.x;
        sprite.y = redPortalB.y;
        warp = 1;
      }
    }
    else {
      warp = 0;
    }
    redPortal = 255;
  }
  else if (sprite.overlapping(redPortalB)) {
    if (sw == 1) {
      if (warp == 0) {
        portalSound.triggerAttackRelease('C5', "8n");
        sprite.x = redPortalA.x;
        sprite.y = redPortalA.y;
        warp = 1;
      }
    }
    else {
      warp = 0;
    }
    redPortal = 255;
  }
  else if (sprite.overlapping(bluePortalA)) {
    if (sw == 1) {
      if (warp == 0) {
        portalSound.triggerAttackRelease('C5', "8n");
        sprite.x = bluePortalB.x;
        sprite.y = bluePortalB.y;
        warp = 1;
      }
    }
    else {
      warp = 0;
    }
    bluePortal = 255;
  }
  else if (sprite.overlapping(bluePortalB)) {
    if (sw == 1) {
      if (warp == 0) {
        portalSound.triggerAttackRelease('C5', "8n");
        sprite.x = bluePortalA.x;
        sprite.y = bluePortalA.y;
        warp = 1;
      }
    }
    else {
      warp = 0;
    }
    bluePortal = 255;
  }
  else if (sprite.overlapping(greenPortalA)) {
    if (sw == 1) {
      if (warp == 0) {
        portalSound.triggerAttackRelease('C5', "8n");
        sprite.x = greenPortalB.x;
        sprite.y = greenPortalB.y;
        warp = 1;
      }
    }
    else {
      warp = 0;
    }
    greenPortal = 255;
  }
  else if (sprite.overlapping(greenPortalB)) {
    if (sw == 1) {
      if (warp == 0) {
        portalSound.triggerAttackRelease('C5', "8n");
        sprite.x = greenPortalA.x;
        sprite.y = greenPortalA.y;
        warp = 1;
      }
    }
    else {
      warp = 0;
    }
    greenPortal = 255;
  }
  else {
    redPortal = 0;
    bluePortal = 0;
    greenPortal = 0;
  }

  if (sprite.overlapping(treasure) && sw == 1) {
    treasureSound.triggerAttackRelease('A6', "8n");
    transition(treasure);
  }
}

function startGame() {
  Tone.start();
  soundTrack.start();
  if (characterSelect.selected() == 'Spelunky Guy') {
    sheet = 'assets/SpelunkyGuy.png';
  }
  else if (characterSelect.selected() == 'Ninja') {
    sheet = 'assets/Ninja.png';
  }
  else if (characterSelect.selected() == 'Viking') {
    sheet = 'assets/Viking.png';
  }
  else if (characterSelect.selected() == 'Green Girl') {
    sheet = 'assets/GreenGirl.png';
  }
  else if (characterSelect.selected() == 'Cyclops') {
    sheet = 'assets/Cyclops.png';
  }
  else if (characterSelect.selected() == 'Robot') {
    sheet = 'assets/Robot.png';
  }
  else if (characterSelect.selected() == 'Meat Boy') {
    sheet = 'assets/MeatBoy.png';
  }
  else if (characterSelect.selected() == 'Van Helsing') {
    sheet = 'assets/VanHelsing.png';
  }
  clear();
  startButton.remove();
  characterSelect.remove();
  sprite = drawSprite(41, 41, 80, 80);
  transition();
}

function replay() {
  soundTrack.start();
  sprite.visible = true;
  sprite.x = 41;
  sprite.y = 41;
  clear();
  currentMaze = 1;
  drawn = false;
}

function move(sprite) {
  if (drawn) {
    sprite.rotation = 0;
    if (Math.abs(joyX) > Math.abs(joyY)) {
      if (joyX > 0) {
        sprite.changeAni('walkRight');
        sprite.vel.x = joyX / 100;
        sprite.vel.y = 0;
        sprite.scale.x = 1;
      }
      else if (joyX < 0) {
        sprite.changeAni('walkRight');
        sprite.vel.x = joyX / 100;
        sprite.vel.y = 0;
        sprite.scale.x = -1;
      }
    }
    else {
      if (joyY > 0) {
        sprite.changeAni('walkDown');
        sprite.vel.x = 0;
        sprite.vel.y = joyY / 100;
      }
      else if (joyY < 0) {
        sprite.changeAni('walkUp');
        sprite.vel.x = 0;
        sprite.vel.y = joyY / 100;
      }
    }
    if (joyX == 0 && joyY == 0) {
      sprite.changeAni('stand');
      sprite.vel.x = 0;
      sprite.vel.y = 0;
    }
  }
}

function transition() {
  maze.forEach(function(wall) {
    wall.remove();
  });
  if (currentMaze == 1) {
    treasure1.remove();
    sprite.x = 181;
    sprite.y = 181;
  }
  else if (currentMaze == 2) {
    treasure2.remove();
    sprite.x = 732;
    sprite.y = 1480;
    portalA.remove();
    portalB.remove();
  }
  else if (currentMaze == 3) {
    treasure3.remove();
    sprite.x = 41;
    sprite.y = 41;
    sprite.visible = false;
    redPortalA.remove();
    redPortalB.remove();
    greenPortalA.remove();
    greenPortalB.remove();
    bluePortalA.remove();
    bluePortalB.remove();
  }
  currentMaze++;
  drawn = false;
}

function createPortal(x, y, w, h) {
  let portal = new Sprite(x, y, w, h);
  portal.spriteSheet = sheet;
  portal.addAnis(animations);
  portal.changeAni('portal');
  portal.collider = 'none';
  portal.layer = 1;
  return portal;
}

function createTreasure(x, y, w, h) {
  let goal = new Sprite(x, y, w, h);
  goal.spriteSheet = sheet;
  goal.addAnis(animations);
  goal.changeAni('treasure');
  goal.collider = 'static';
  goal.layer = 1;
  return goal;
}

function createMaze(x, y, w, h) {
  let wall = new Sprite(x, y, w, h);
  wall.collider = 'static';
  wall.layer = 2;
  maze.push(wall);
}

function drawMaze() {
  if (currentMaze == 1) {
    for (i = 0; i < maze1.length; i++) {
      createMaze(maze1[i][0], maze1[i][1], maze1[i][2], maze1[i][3]);
    }
    treasure1 = createTreasure(955, 41, 80, 80);
  }
  else if (currentMaze == 2) {
    for (i = 0; i < maze2.length; i++) {
      createMaze(maze2[i][0], maze2[i][1], maze2[i][2], maze2[i][3]);
    }
    portalA = createPortal(490, 510, 80, 80);
    portalB = createPortal(3009, 57, 80, 80);
    treasure2 = createTreasure(1780, 41, 80, 80);
  }
  else if (currentMaze == 3) {
    for (i = 0; i < maze3.length; i++) {
      createMaze(maze3[i][0], maze3[i][1], maze3[i][2], maze3[i][3]);
    }
    redPortalA = createPortal(575, 1330, 80, 80);
    redPortalB = createPortal(width - 50, height - 55, 80, 80);
    greenPortalA = createPortal(2280, 63, 80, 80);
    greenPortalB = createPortal(1820, 1300, 80, 80);
    bluePortalA = createPortal(1711, 298, 80, 80);
    bluePortalB = createPortal(1340, 1310, 80, 80);
    treasure3 = createTreasure(2145, 1470, 80, 80);
  }
}

function drawSprite(x, y, w, h) {
  let character = new Sprite(x, y, w, h);
  character.spriteSheet = sheet;
  character.addAnis(animations);
  character.anis.frameDelay = 8;
  character.changeAni('stand');
  character.layer = 2;
  return character;
}