// youtube link:  

#define VRX_PIN A0
#define VRY_PIN A1
#define SW_PIN 2

const int onePin = 12;
const int twoPin = 8;
const int threePin = 7;

const int redPin = 6;
const int greenPin = 5;
const int bluePin = 3;

int joyX = 0;
int joyY = 0;
int sw = 0;

const int numReadings = 10;

int xReadings[numReadings];
int yReadings[numReadings];
int readIndex = 0;
float xTotal = 0;
float yTotal = 0;
float xAverage = 0;
float yAverage = 0;
float xStart;
float yStart;
bool start = false;
unsigned long lastTime;
const int interval = 16;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(57600);

  pinMode(onePin, OUTPUT);
  pinMode(twoPin, OUTPUT);
  pinMode(threePin, OUTPUT);

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  
  pinMode(SW_PIN, INPUT_PULLUP);
  for (int i = 0; i < numReadings; i++) {
    xReadings[i] = 0;
    yReadings[i] = 0;
  }
}

void loop() {
  // put your main code here, to run repeatedly:

  while (Serial.available() > 0) {

    int maze = Serial.parseInt();
    int red = Serial.parseInt();
    int green = Serial.parseInt();
    int blue = Serial.parseInt();

    if (Serial.read() == '\n') {
      red = constrain(red, 0, 255);
      green = constrain(green, 0, 255);
      blue = constrain(blue, 0, 255);

      if (maze == 1) {
        digitalWrite(onePin, HIGH);
      }
      else if (maze == 2) {
        digitalWrite(onePin, HIGH);
        digitalWrite(twoPin, HIGH);
      }
      else if (maze == 3) {
        digitalWrite(onePin, HIGH);
        digitalWrite(twoPin, HIGH);
        digitalWrite(threePin, HIGH);
      }
      else {
        digitalWrite(onePin, LOW);
        digitalWrite(twoPin, LOW);
        digitalWrite(threePin, LOW);
      }

      analogWrite(redPin, red);
      analogWrite(greenPin, green);
      analogWrite(bluePin, blue);
    }
  }

  int x = analogRead(VRX_PIN);
  int y = analogRead(VRY_PIN);
  int sw = digitalRead(SW_PIN);

  xTotal = xTotal - xReadings[readIndex];
  yTotal = yTotal - yReadings[readIndex];

  xReadings[readIndex] = x;
  yReadings[readIndex] = y;

  xTotal = xTotal + x;
  yTotal = yTotal + y;

  readIndex = readIndex + 1;

  xAverage = xTotal / numReadings;
  yAverage = yTotal / numReadings;

  if (readIndex >= numReadings) {
    readIndex = 0;
    if (!start) {
      xStart = xAverage;
      yStart = yAverage;
      start = true;
    }
  }

  if (start) {
    unsigned long now = millis();
    if (now - lastTime > interval) {
      Serial.print((int) (xAverage - xStart));
      Serial.print(", ");
      Serial.print((int) (yAverage - yStart));
      Serial.print(", ");
      Serial.println(!sw);

      lastTime = now;
    }
  }
}
