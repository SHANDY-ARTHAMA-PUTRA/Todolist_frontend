// app/(tabs)/_layout.tsx

import React, { useContext } from "react";
import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TitleContext } from "../_layout";

export default function TabLayout() {

  const { setTitle } = useContext(TitleContext);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '000',
        
        headerStyle: {
          backgroundColor: '#858be5',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#858be5',
        },
        headerTitle: route.name, // Title for the header
      })}
      screenListeners={{
        state: (e) => {
          const currentRouteName = e.data.state?.routes[e.data.state.index]?.name;
          if (currentRouteName === "index") {
            setTitle("Home"); // Update title in context
          }
          else
          setTitle(currentRouteName); // Update title in context
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home', 
          headerTitle: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="Suggestions" 
        options={{
          title: 'Suggestions',
          headerTitle: 'Suggestions',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="lightbulb-o" size={18} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="Users" 
        options={{
          title: 'Users',
          headerTitle: 'Users',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="users" size={18} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}