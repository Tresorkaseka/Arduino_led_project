# Arduino LED Project (USB + Mobile)

Pilote 3 LEDs branchées sur un Arduino **depuis ton téléphone**.

Le téléphone (Expo/React Native) envoie une requête HTTP à ton PC (serveur Node.js/Express), puis le PC transmet une commande à l’Arduino via **USB (Serial)**.

## Pourquoi ce projet

- Projet simple mais “réel” : *mobile → réseau → PC → USB → Arduino*.
- Très bon point de départ pour une **maison intelligente** : tu peux remplacer les LEDs par des **relais** (ou un module adapté) pour commander des **ampoules/prises** depuis ton portable, ajouter des capteurs, etc.

## Architecture

```
Téléphone (Expo Go)
   |
   | HTTP (Wi‑Fi)
   v
PC (Node.js + Express)  -- USB Serial -->  Arduino (setup/loop)
```

![Aperçu du projet](docs/localsend.png)

Répertoires :
- `arduino/` : sketch Arduino (`.ino`)
- `server/` : serveur Express + SerialPort
- `mobile/` : app Expo (Expo Router)

## Prérequis

- Arduino IDE (ou équivalent)
- Node.js + npm
- Téléphone Android/iOS avec **Expo Go**
- Arduino + 3 LEDs + 3 résistances (ex: 220Ω) + breadboard + fils

## Montage (hardware)

Pins par défaut dans le sketch :
- LED Jaune : `D8`
- LED Bleue : `D9`
- LED Rouge : `D10`

Schéma logique (par LED) :
- `Dx` → **résistance** → LED (patte longue) → LED (patte courte) → `GND`

Important :
- Toutes les LEDs partagent une **masse (GND)** correcte. Si la masse n’est pas branchée, la LED ne s’allumera pas.

## 1) Arduino (sketch)

1. Ouvre `arduino/Arduino_led_project.ino` dans l’IDE Arduino.
2. Sélectionne ta carte + le port COM.
3. Téléverse.

Commandes attendues (terminées par `\\n`) :
- `JAUNE_ON`, `JAUNE_OFF`
- `BLEU_ON`, `BLEU_OFF` (tolère aussi `BLEUE_*`)
- `ROUGE_ON`, `ROUGE_OFF`

## 2) Serveur (PC)

### Configuration

Édite `server/index.js` :
- `PORT_ARDUINO` : mets ton port, ex: `COM13`
- `PORT_SERVEUR` : par défaut `3000`

### Installer + lancer

Dans un terminal :

```bash
cd server
npm install
npm start
```

Test rapide depuis le PC :

```text
http://localhost:3000/led/jaune/on
http://localhost:3000/led/bleue/on
http://localhost:3000/led/rouge/on
```

## 3) App Mobile (Expo)

### Réseau

Le téléphone et le PC doivent être sur le **même Wi‑Fi**.

### Config IP du PC

1. Trouve l’IPv4 du PC (sur Windows) :
   - `ipconfig`
   - cherche “Adresse IPv4” de ta carte **Wi‑Fi**
2. Mets cette IP dans `mobile/constants/server.ts` (`SERVER_IP`).

### Installer + lancer

Dans un autre terminal :

```bash
cd mobile
npm install
npx expo start
```

Scanne le QR code avec Expo Go, puis utilise les boutons ON/OFF.

## Dépannage

### Upload Arduino impossible : “Accès refusé sur COMxx”
- Le port série est utilisé par un autre programme.
- Stoppe le serveur Node (`Ctrl+C`) et ferme le Moniteur Série, puis retente le téléversement.

### Le téléphone ne contrôle rien
- Vérifie que le serveur tourne.
- Vérifie `SERVER_IP` (bonne IP Wi‑Fi).
- Vérifie que le PC et le téléphone sont sur le même Wi‑Fi.
- Pare-feu Windows : autoriser le port `3000` en entrée (réseau privé).

### Une LED ne répond pas
- Vérifie la masse (GND), le sens de la LED, la résistance, et le pin.

## Idées d’évolution (domotique)

- Remplacer les LEDs par un **module relais** pour piloter des ampoules/prises.
- Ajouter un tableau de bord (scènes “Salon”, “Nuit”, etc.).
- Ajouter des capteurs (température, mouvement) et exposer des routes `/sensor/...`.
- Passer en WebSockets pour des retours temps réel (états, logs).
