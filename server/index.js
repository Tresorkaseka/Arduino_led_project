const express = require('express');
const { SerialPort } = require('serialport');
const cors = require('cors');

const app = express();
app.use(cors());

const normalizeCouleur = (raw) => {
  const couleur = String(raw ?? '')
    .trim()
    .toLowerCase();

  if (couleur === 'jaune' || couleur === 'yellow') return 'JAUNE';
  if (couleur === 'bleu' || couleur === 'bleue' || couleur === 'blue') return 'BLEU';
  if (couleur === 'rouge' || couleur === 'red') return 'ROUGE';

  return null;
};

const normalizeEtat = (raw) => {
  const etat = String(raw ?? '')
    .trim()
    .toLowerCase();

  if (etat === 'on' || etat === '1' || etat === 'true') return 'ON';
  if (etat === 'off' || etat === '0' || etat === 'false') return 'OFF';

  return null;
};

// CONFIGURATION
// Mets ici le port que tu vois dans l'IDE Arduino (ex: COM13).
const PORT_ARDUINO = 'COM13';

const arduino = new SerialPort({
  path: PORT_ARDUINO,
  baudRate: 9600,
});

arduino.on('open', () => {
  console.log(`[OK] Connexion Arduino sur ${PORT_ARDUINO}`);
});

arduino.on('error', (err) => {
  console.error('[ERR] SerialPort:', err.message);
});

// Exemple: http://localhost:3000/led/JAUNE/ON
app.get('/led/:couleur/:etat', (req, res) => {
  const { couleur, etat } = req.params;

  const couleurNorm = normalizeCouleur(couleur);
  const etatNorm = normalizeEtat(etat);

  if (!couleurNorm) return res.status(400).send('Couleur invalide (jaune/bleu/rouge)');
  if (!etatNorm) return res.status(400).send('Etat invalide (on/off)');

  const commande = `${couleurNorm}_${etatNorm}\n`;
  console.log(`[INFO] /led/${couleur}/${etat} -> ${commande.trim()}`);

  arduino.write(commande, (err) => {
    if (err) {
      console.error('[ERR] Ecriture:', err.message);
      return res.status(500).send('Erreur');
    }
    return res.send(`LED ${couleurNorm} ${etatNorm}`);
  });
});

const PORT_SERVEUR = 3000;
app.listen(PORT_SERVEUR, '0.0.0.0', () => {
  console.log(`[OK] Serveur pret sur http://localhost:${PORT_SERVEUR}`);
});
