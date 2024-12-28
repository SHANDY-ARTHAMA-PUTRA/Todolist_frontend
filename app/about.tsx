// app/about.tsx

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ThemeContext } from "./_layout";

export default function About() {

  const { darkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>Tentang</Text>

      <TouchableOpacity style={styles.item} onPress={() => Linking.openURL('https://privacy.example.com')}>
        <Text style={[styles.text, { color: darkMode ? "#858be5" : "#0000ee" }]}>Privasi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => Linking.openURL('https://exportinfo.example.com')}>
        <Text style={[styles.text, { color: darkMode ? "#858be5" : "#0000ee" }]}>Ekspor info Anda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => Linking.openURL('https://eula.example.com')}>
        <Text style={[styles.text, { color: darkMode ? "#858be5" : "#0000ee" }]}>Persyaratan Lisensi Perangkat Lunak</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => Linking.openURL('https://thirdparty.example.com')}>
        <Text style={[styles.text, { color: darkMode ? "#858be5" : "#0000ee" }]}>Pemberitahuan Pihak Ketiga</Text>
      </TouchableOpacity>

      <View style={styles.item}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Versi</Text>
        <Text style={[styles.versionText, { color: darkMode ? "#fff" : "#000" }]}>1.0.0 beta build #0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
  versionText: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: 'italic',
  },
});