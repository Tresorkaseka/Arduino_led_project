# Tech Context

## Server (`server/`)
- Node.js + Express
- `serialport` pour communiquer avec l’Arduino en USB (COMxx sur Windows)
- `cors` pour autoriser l’app mobile

Endpoints:
- `GET /led/:couleur/:etat`

## Mobile (`mobile/`)
- Expo + React Native + Expo Router
- Écran principal: `mobile/app/(tabs)/index.tsx`
- Configuration serveur: `mobile/constants/server.ts`

## Arduino (`arduino/`)
- Sketch: `arduino/Arduino_led_project.ino`
- Pins par défaut: jaune=8, bleue=9, rouge=10

