// app/settings.tsx

import React, { useContext, useState } from "react";
import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import { ThemeContext } from "./_layout";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  // State for other switches
  const [playCompletionSound, setPlayCompletionSound] = useState(false);
  const [confirmBeforeDelete, setConfirmBeforeDelete] = useState(false);
  const [showDueToday, setShowDueToday] = useState(false);
  const [recognizeDateTime, setRecognizeDateTime] = useState(false);
  const [removeDateTime, setRemoveDateTime] = useState(false);
  const [quickAddNotification, setQuickAddNotification] = useState(false);
  const [reminderNotifications, setReminderNotifications] = useState(false);
  const [sharedListActivity, setSharedListActivity] = useState(false);
  const [dueTodayNotification, setDueTodayNotification] = useState(false);

  return (
    <ScrollView style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
      {/* General Settings */}
      <Text style={[styles.sectionTitle, { color: darkMode ? "#fff" : "#000" }]}>Umum</Text>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Putar suara penyelesaian</Text>
        <Switch
          value={playCompletionSound}
          onValueChange={setPlayCompletionSound}
          trackColor={{ false: "#ccc", true: "#858be5" }}
          thumbColor={playCompletionSound ? "#858be5" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Konfirmasi sebelum menghapus</Text>
        <Switch
          value={confirmBeforeDelete}
          onValueChange={setConfirmBeforeDelete}
          trackColor={{ false: "#ccc", true: "#858be5" }}
          thumbColor={confirmBeforeDelete ? "#858be5" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Tampilkan tugas "Jatuh Tempo Hari Ini" di Hari Saya</Text>
        <Switch
          value={showDueToday}
          onValueChange={setShowDueToday}
          trackColor={{ false: "#ccc", true: "#858be5" }}
          thumbColor={showDueToday ? "#858be5" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Kenali tanggal dan waktu di judul tugas</Text>
        <Switch
          value={recognizeDateTime}
          onValueChange={setRecognizeDateTime}
          trackColor={{ false: "#ccc", true: "#858be5" }}
          thumbColor={recognizeDateTime ? "#858be5" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Hapus tanggal dan waktu dari judul tugas setelah dikenali</Text>
        <Switch
          value={removeDateTime}
          onValueChange={setRemoveDateTime}
          trackColor={{ false: "#ccc", true: "#858be5" }}
          thumbColor={removeDateTime ? "#858be5" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Mode gelap</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#ccc", true: "#858be5" }}
          thumbColor={darkMode ? "#858be5" : "#f4f3f4"}
        />
      </View>

      {/* Notifications Settings */}
      <Text style={[styles.sectionTitle, { color: darkMode ? "#fff" : "#000" }]}>Pemberitahuan</Text>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Pemberitahuan penambahan cepat</Text>
        <Switch
          value={quickAddNotification}
          onValueChange={setQuickAddNotification}
          trackColor={{ false: "#ccc", true: "#858be5" }}
          thumbColor={quickAddNotification ? "#858be5" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Aktivitas daftar bersama</Text>
        <Switch
          value={sharedListActivity}
          onValueChange={setSharedListActivity}
          trackColor={{ false: "#ccc", true: "#858be5" }}
          thumbColor={sharedListActivity ? "#858be5" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Pemberitahuan Jatuh Tempo Hari Ini</Text>
        <Switch
          value={dueTodayNotification}
          onValueChange={setDueTodayNotification}
          trackColor={{ false: "#ccc", true: "#858be5" }}
          thumbColor={dueTodayNotification ? "#858be5" : "#f4f3f4"}
        />
      </View>
      
      {/* Help and Feedback */}
      <Text style={[styles.sectionTitle, { color: darkMode ? "#fff" : "#000" }]}>Bantuan & umpan balik</Text>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Dapatkan dukungan</Text>
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Tanya Jawab Umum</Text>
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Salin ID sesi dan pengguna</Text>
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>Menikmati aplikasi kami? Beri nilai</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
});