# Project Brief — Arduino LED Control (USB + Mobile)

Ce projet permet de contrôler 3 LEDs branchées sur un Arduino via une application mobile (Expo/React Native) qui parle à un serveur Node.js (Express). Le serveur envoie ensuite des commandes à l’Arduino via USB (Serial).

**Objectif**
- Depuis le téléphone: allumer/éteindre les LEDs *jaune*, *bleue*, *rouge*.

**Composants**
- `arduino/` : sketch Arduino (lecture Serial, pilotage des pins).
- `server/` : serveur Node.js (Express) + `serialport` (USB) + `cors`.
- `mobile/` : application Expo (Expo Router) avec 3 boutons ON/OFF.

**Contraintes**
- Le téléphone et le PC doivent être sur le même Wi‑Fi.
- Le pare-feu Windows doit autoriser l’accès au port 3000 depuis le réseau local.
- Le port série (ex: COM13) ne peut être utilisé que par un seul programme à la fois (IDE Arduino / serveur).

