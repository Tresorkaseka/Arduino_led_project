// Arduino LED Control via Serial (USB)
//
// Pins (selon ton montage) :
// - Jaune : D8
// - Bleue : D9
// - Rouge : D10
//
// Le serveur Node envoie des commandes texte finissant par '\n', ex:
// - JAUNE_ON
// - BLEU_OFF
// - ROUGE_ON
//
// Note: on accepte BLEU_* et BLEUE_* par tolérance.

const int ledJaune = 8;
const int ledBleue = 9;
const int ledRouge = 10;

void setup() {
  Serial.begin(9600);

  pinMode(ledJaune, OUTPUT);
  pinMode(ledBleue, OUTPUT);
  pinMode(ledRouge, OUTPUT);

  digitalWrite(ledJaune, LOW);
  digitalWrite(ledBleue, LOW);
  digitalWrite(ledRouge, LOW);
}

void loop() {
  if (Serial.available() > 0) {
    String message = Serial.readStringUntil('\n');
    message.trim();

    if (message == "JAUNE_ON") {
      digitalWrite(ledJaune, HIGH);
    } else if (message == "JAUNE_OFF") {
      digitalWrite(ledJaune, LOW);
    } else if (message == "BLEU_ON" || message == "BLEUE_ON") {
      digitalWrite(ledBleue, HIGH);
    } else if (message == "BLEU_OFF" || message == "BLEUE_OFF") {
      digitalWrite(ledBleue, LOW);
    } else if (message == "ROUGE_ON") {
      digitalWrite(ledRouge, HIGH);
    } else if (message == "ROUGE_OFF") {
      digitalWrite(ledRouge, LOW);
    }
  }
}
