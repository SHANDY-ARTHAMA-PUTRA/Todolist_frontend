// components/Card.tsx

import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Checkbox, IconButton } from "react-native-paper";
import { ThemeContext } from "./../app/_layout";

const PlaceholderImage = require('@/assets/images/01.png');
const { width } = Dimensions.get("window");

type Props = {
  id: number;
  sumberGambar: string;
  judul: string;
  keterangan: string;
  isSelected: boolean;
  onLongPress: (id: number) => void;
  onSelectChange: (id: number, isSelected: boolean) => void;
  onStatusChange?: (id: number, isCompleted: boolean) => void;
  onImportantChange?: (id: number, isImportant: boolean) => void;
  showCheckbox: boolean;
};

export default function Card({ id, sumberGambar, judul, keterangan, isSelected, onLongPress, onSelectChange, 
  onStatusChange, onImportantChange, showCheckbox, }: Props) {

  const { darkMode } = useContext(ThemeContext);

  const imageSource = sumberGambar ? { uri: sumberGambar } : PlaceholderImage;

  const [isCompleted, setIsCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const handleCheckboxPress = () => {
    if (onStatusChange) {
      const newStatus = !isCompleted;
      setIsCompleted(newStatus);
      onStatusChange(id, newStatus);
    }
  };

  const handleImportantPress = () => {
    if (onImportantChange) {
      const newStatus = !isImportant;
      setIsImportant(newStatus);
      onImportantChange(id, newStatus);
    }
  };

  const handleCheckboxToggle = () => {
    const newStatus = !isSelected;
    onSelectChange(id, newStatus);
  };

  return (
    <Pressable
      onPress={() => router.push({
          pathname: "./details/[id]",
          params: { id: id },})
      }
      onLongPress={() => onLongPress(id)}
      delayLongPress={1000}
    >
      <View style={[styles.panel, { backgroundColor: darkMode ? "#414141" : "#ececec" },]}>
        {showCheckbox && (
          <Checkbox
            color={
            isSelected ? (darkMode ? "#858be5" : "#858be5") : "transparent" }
            uncheckedColor={darkMode ? "#fff" : "#000"}
            status={isSelected ? "checked" : "unchecked"}
            onPress={handleCheckboxToggle}
          />
        )}
        {onStatusChange && (
          <Checkbox
            color={
            isCompleted ? (darkMode ? "#858be5" : "#858be5") : "transparent" }
            uncheckedColor={darkMode ? "#fff" : "#000"}
            status={isCompleted ? "checked" : "unchecked"}
            onPress={handleCheckboxPress}
          />
        )}
        <Image style={styles.image} source={imageSource}/>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>{judul}</Text>
          <Text style={[styles.textKecil, { color: darkMode ? "#fff" : "#000" }]}>{keterangan}</Text>
        </View>
        {onImportantChange && (
          <IconButton
            icon={isImportant ? "star" : "star-outline"}
            iconColor={isImportant ? (darkMode ? "#FFD700" : "#FFD700") : darkMode ? "#fff" : "#000"}
            onPress={handleImportantPress}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.9,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textKecil: {
    fontSize: 12,
  },
  image: {
    width: width * 0.2,
    height: width * 0.15,
    marginEnd: 14,
    borderRadius: 8,
  },
});