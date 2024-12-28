// app/login.tsx

import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "@/app/_layout";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import Toast from "react-native-easy-toast";
import * as SplashScreen from "expo-splash-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "./_layout";

export default function Login() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(false);
  const toastRef = useRef<any>(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toastRef.current?.show("Email dan Password tidak boleh kosong!", 1500);
      return;
    }

    if (email !== "john_doe@gmail.com" || password !== "11223344") {
      toastRef.current?.show("Email atau Password salah, coba lagi!", 1500);
      return;
    }

    try {
      setIsSplashVisible(true); // Tampilkan splash screen
      await SplashScreen.preventAutoHideAsync();

      // Simulasikan delay 3 detik
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setIsSplashVisible(false); // Sembunyikan splash screen
        login(); // Set status login
        router.push("/"); // Navigasi ke halaman utama
      }, 3000);
    } catch (error) {
      console.error("Error handling SplashScreen:", error);
      setIsSplashVisible(false);
    }
  };

  if (isSplashVisible) {
    return (
      <ImageBackground
        source={require("@/assets/images/splash.png")}
        style={styles.splashContainer}
        resizeMode="cover"
      />
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 16,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={require("@/assets/images/icon.png")} style={styles.logo} />
      <Text style={[styles.welcomeText, { color: darkMode ? "#fff" : "#000" }]}>Welcome Back</Text>

      <TextInput
        style={[styles.input, { color: darkMode ? "#fff" : "#000", backgroundColor: darkMode ? "#1e1e1e" : "#fff", borderColor: darkMode ? "#333" : "#ccc" }]}
        placeholder="Email"
        placeholderTextColor={darkMode ? "#aaa" : "#666"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={[styles.passwordContainer, { borderColor: darkMode ? "#333" : "#ccc" }]}>
        <TextInput
          style={[styles.passwordInput, { color: darkMode ? "#fff" : "#000", backgroundColor: darkMode ? "#1e1e1e" : "#fff" }]}
          placeholder="Password"
          placeholderTextColor={darkMode ? "#aaa" : "#666"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color={darkMode ? "#fff" : "#000"}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push({ pathname: "/forgotpassword" })}>
        <Text style={[styles.linkText, { color: darkMode ? "#bb86fc" : "#6200ee" }]}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: darkMode ? "#bb86fc" : "#6200ee" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.googleButton, { borderColor: darkMode ? "#333" : "#ccc", backgroundColor: darkMode ? "#1e1e1e" : "#fff" }]}
      >
        <Image source={require("@/assets/images/google.png")} style={styles.googleIcon} />
        <Text style={[styles.googleButtonText, { color: darkMode ? "#fff" : "#000" }]}>Sign in with Google</Text>
      </TouchableOpacity>

      <Text style={[styles.footerText, { color: darkMode ? "#aaa" : "#000" }]}>
        Don’t have an account?{' '}
        <Text
          style={[styles.linkText, { color: darkMode ? "#bb86fc" : "#6200ee" }]}
          onPress={() => router.push({ pathname: "/signup" })}
        >
          Sign up
        </Text>
      </Text>

      <Toast ref={toastRef} position="bottom" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  splashContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: 100, height: 100, marginBottom: 30, marginTop: 45 },
  welcomeText: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
  input: { width: "80%", padding: 12, borderWidth: 1, borderRadius: 5, marginBottom: 25 },
  button: { width: "80%", padding: 12, borderRadius: 5, alignItems: "center", marginTop: 25 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  passwordContainer: { width: "80%", flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 5, marginBottom: 25, paddingHorizontal: 1 },
  passwordInput: { flex: 1, padding: 12 },
  eyeIcon: { marginLeft: 5, marginRight: 5 },
  googleButton: { flexDirection: "row", alignItems: "center", marginTop: 25, borderWidth: 1, padding: 8, borderRadius: 5 },
  googleButtonText: { fontSize: 14, fontWeight: "bold" },
  googleIcon: { width: 35, height: 35, marginRight: 10 },
  linkText: { marginTop: 3, fontWeight: "bold" },
  footerText: { marginTop: 20, fontSize: 14 },
});
