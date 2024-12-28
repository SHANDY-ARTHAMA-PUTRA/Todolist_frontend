// app/+not-found.tsx

import React, { useContext } from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { ThemeContext } from "./_layout";

export default function NotFoundScreen() {

  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      {/* Mengatur judul layar "Oops!" */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      
      {/* Tampilan layar dengan teks dan link kembali ke beranda */}
      <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }, ]}>
        <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }, ]}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={[styles.linkText, { color: darkMode ? "#fff" : "#000" }, ]}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: '#1e90ff',
    fontWeight: '500',
  },
});