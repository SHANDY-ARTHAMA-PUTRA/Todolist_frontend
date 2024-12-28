// app/(tabs)/Suggestions.tsx

import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, IconButton } from 'react-native-paper';
import { ThemeContext } from "../_layout";

export default function Suggestions() {

  const { darkMode } = useContext(ThemeContext);

  const suggestions = [
    { id: '1', category: 'From Yesterday', title: 'Self-meeting with Jo', completed: true },
    { id: '2', category: 'To-Do', title: 'Buy travel insurance' },
    { id: '3', category: 'To-Do', title: 'Update blog' },
    { id: '4', category: 'Upcoming', title: 'Pick up flights to Seattle', completed: true },
  ];

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }, ]}>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log('Suggestion Pressed', item.title)}>
            <View style={[styles.suggestionContainer, { backgroundColor: darkMode ? "#121212" : "#fff" }, ]}>
              <Checkbox status={item.completed ? 'checked' : 'unchecked'} />
              <View style={[styles.suggestionTextContainer, { backgroundColor: darkMode ? "#121212" : "#fff" }, ]}>
                <Text style={[styles.categoryText, { color: darkMode ? "#fff" : "#000" }, ]}>{item.category}</Text>
                <Text style={[styles.suggestionText, { color: darkMode ? "#fff" : "#000" }, ]}>{item.title}</Text>
              </View>
              <IconButton icon="plus" onPress={() => console.log('Add suggestion')} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  suggestionContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  suggestionTextContainer: { flex: 1, marginLeft: 8 },
  categoryText: { fontSize: 12, color: '#666' },
  suggestionText: { fontSize: 16 },
});