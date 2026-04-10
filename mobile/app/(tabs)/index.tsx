import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SERVER_IP, SERVER_PORT } from '@/constants/server';

export default function HomeScreen() {
  const commanderLed = async (couleur: string, etat: 'on' | 'off') => {
    try {
      const url = `http://${SERVER_IP}:${SERVER_PORT}/led/${couleur}/${etat}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch {
      Alert.alert('Erreur', "Vérifie que le serveur tourne, que l'IP est bonne, et que le Wi‑Fi est le même.");
    }
  };

  const BoutonLed = ({ couleur, label }: { couleur: string; label: string }) => (
    <ThemedView style={styles.row}>
      <ThemedText type="subtitle">{label}</ThemedText>
      <View style={styles.buttonGroup}>
        <Pressable style={[styles.button, styles.onButton]} onPress={() => void commanderLed(couleur, 'on')}>
          <ThemedText style={styles.btnText}>ON</ThemedText>
        </Pressable>
        <Pressable style={[styles.button, styles.offButton]} onPress={() => void commanderLed(couleur, 'off')}>
          <ThemedText style={styles.btnText}>OFF</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Contrôle Arduino
      </ThemedText>

      <BoutonLed couleur="jaune" label="LED Jaune" />
      <BoutonLed couleur="bleue" label="LED Bleue" />
      <BoutonLed couleur="rouge" label="LED Rouge" />

      <ThemedText style={styles.hint}>
        Serveur : {SERVER_IP}:{SERVER_PORT}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 48, paddingHorizontal: 16 },
  title: { marginBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
  },
  buttonGroup: { flexDirection: 'row' },
  button: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10, marginLeft: 10 },
  onButton: { backgroundColor: '#2E7D32' },
  offButton: { backgroundColor: '#C62828' },
  btnText: { color: '#fff', fontWeight: '700' },
  hint: { marginTop: 18, opacity: 0.7 },
});

