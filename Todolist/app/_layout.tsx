// app/_layout.tsx

import React, { createContext, useContext, useState, useEffect} from "react";
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';

// Auth Context
export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Theme Context
export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Title Context
export const TitleContext = createContext({
  title: "",
  setTitle: (title: string) => {},
});

export default function RootLayout() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push({ pathname: "/login" }); // Arahkan ke halaman login jika belum login
    }
  }, [isLoggedIn]);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const [title, setTitle] = useState("Home");

  return (
<AuthContext.Provider value={{ isLoggedIn, login, logout }}>    
<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
  <TitleContext.Provider value={{ title, setTitle }}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: darkMode ? "#121212" : "#fff", // Drawer background
        },
        headerStyle: {
          backgroundColor: darkMode ? "#121212" : "#fff", // Header background
        },
        headerTintColor: darkMode ? "#fff" : "#000", // Header text color
        drawerActiveTintColor: darkMode ? "#bb86fc" : "#6200ee", // Active item color
        drawerInactiveTintColor: darkMode ? "#fff" : "#000", // Inactive item color
      }}
      >
        {/* Menu utama */}
        <Drawer.Screen
          name="(tabs)"
          options={({ route }) => ({
            drawerLabel: "Home",
            title: title, // Dynamic title
            headerShown: true,
            drawerIcon: ({ color, size }) => ( 
              <FontAwesome name="home" size={size} color={color} />
            ),
          })}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "User Profile",
            title: "User Profile",
            drawerIcon: ({ color, size }) => ( 
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            drawerIcon: ({ color, size }) => ( 
              <FontAwesome name="cogs" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About App",
            title: "About App",
            drawerIcon: ({ color, size }) => ( 
              <FontAwesome name="info-circle" size={size} color={color} />
            ),
          }}
        />

        {/* Stack untuk layar non-drawer */}
        <Drawer.Screen
          name="details/[id]"
          options={{
            drawerItemStyle: { display: 'none' }, // Tidak ditampilkan di menu Drawer
            headerTitle: "Detail",
            headerTransparent: true,
            headerTintColor: darkMode ? "#fff" : "#000",
          }}
        />
        <Drawer.Screen
          name="+not-found"
          options={{
            drawerItemStyle: { display: 'none' }, // Tidak ditampilkan di menu Drawer
            headerTitle: "Not Found",
          }}
        />
        <Drawer.Screen
          name="login"
          options={{
            drawerItemStyle: { display: 'none' }, // Tidak ditampilkan di menu Drawer
            headerTitle: "Login",
            headerTransparent: true,
            headerTintColor: darkMode ? "#fff" : "#000",
          }}
        />
        <Drawer.Screen
          name="forgotpassword"
          options={{
            drawerItemStyle: { display: 'none' }, // Tidak ditampilkan di menu Drawer
            headerTitle: "Forgot Password",
            headerTransparent: true,
            headerTintColor: darkMode ? "#fff" : "#000",
          }}
        />
        <Drawer.Screen
          name="signup"
          options={{
            drawerItemStyle: { display: 'none' }, // Tidak ditampilkan di menu Drawer
            headerTitle: "Sign Up",
            headerTransparent: true,
            headerTintColor: darkMode ? "#fff" : "#000",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  </TitleContext.Provider>
</ThemeContext.Provider>
</AuthContext.Provider>
  );
}