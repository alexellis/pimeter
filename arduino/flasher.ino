#define LDR   A0
#define FlashLED 3
#define light_threshold 700

bool fired;

void setup() {
  Serial.begin(9600);
  pinMode(LDR, INPUT);
  pinMode(FlashLED, OUTPUT);
  fired = false;
}

void flash() {
      analogWrite(FlashLED, 100);
      delay(30);
      analogWrite(FlashLED, 0); 
}

void loop() {
  long val = analogRead(LDR);
  if(val < light_threshold) {
    if(fired==false){
      flash();
      Serial.println("1/1000 kW.");
      fired=true; 
    }
  }
  else {
       fired=false;
  }
  delay(5);
}

