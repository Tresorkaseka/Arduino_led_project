# Active Context (2026-04-10)

**État**
- Chaîne complète fonctionnelle: Expo → Express → Serial → Arduino.
- Correction appliquée: tolérance `BLEU_*` / `BLEUE_*` pour éviter les divergences de nommage.
- Diagnostic matériel confirmé: une masse (GND) manquante empêchait une LED de fonctionner.

**Décisions**
- Monorepo avec 3 sous-projets (`arduino/`, `server/`, `mobile/`).
- IP du PC configurée dans `mobile/constants/server.ts` pour centraliser le paramètre.

**Points d’attention**
- Téléversement Arduino: stopper `server/` (libérer COMxx) avant upload si nécessaire.
- Réseau: téléphone et PC sur le même Wi‑Fi + autoriser le port 3000 au pare-feu Windows.

