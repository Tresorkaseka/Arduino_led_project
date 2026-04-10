# System Patterns

## Pattern: Mobile → HTTP → Serial

1. **Mobile (Expo)** envoie une requête HTTP `GET /led/:couleur/:etat`.
2. **Serveur (Express)** valide/normalise les paramètres, puis écrit une commande texte sur le port série (`serialport`).
3. **Arduino** lit la ligne via `Serial.readStringUntil('\n')` et applique `digitalWrite(...)`.

## Pattern: Commandes texte simples

Format: `COULEUR_ETAT\n`
- `JAUNE_ON`, `JAUNE_OFF`
- `BLEU_ON`, `BLEU_OFF`
- `ROUGE_ON`, `ROUGE_OFF`

Le serveur est tolérant sur les alias (ex: `bleue` → `BLEU`).

