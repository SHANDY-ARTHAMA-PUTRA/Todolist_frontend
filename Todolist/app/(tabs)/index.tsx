// app/(tabs)/index.tsx

import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB, IconButton } from 'react-native-paper';
import Card from "@/components/Card";
import { ThemeContext } from "../_layout";

const dataCard = require("@/assets/dataCard.json");

interface Task {
  id: number;
  sumberGambar: string;
  judul: string;
  keterangan: string;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 3, borderRadius: 35, marginBottom: 15, backgroundColor: '#f1f1f1' },
  headerText: { fontSize: 16, fontWeight: 'bold' },
  deleteButton: { position: 'absolute', bottom: 16, alignSelf: 'center', backgroundColor: '#ff4444', borderRadius: 100 },
  categoryTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  textWhite: { fontSize: 20, color: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  date: { fontSize: 16, color: '#666', marginBottom: 15 },
  fab: { position: 'absolute', right: 16, bottom: 16, borderRadius: 100, backgroundColor: '#858be5' },
});

export default function Index() {
  const { darkMode } = useContext(ThemeContext);

  const getFormattedDate = () => {
    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const [tasks, setTasks] = useState<Task[]>(dataCard.posts);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [importantTasks, setImportantTasks] = useState<Task[]>([]);

  const handleLongPress = (id: number) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds([id]);
    }
  };

  const handleSelectChange = (id: number, isSelected: boolean) => {
    setSelectedIds(prev =>
      isSelected ? [...prev, id] : prev.filter(selectedId => selectedId !== id)
    );
  };

  const handleDelete = () => {
    setTasks(tasks.filter(task => !selectedIds.includes(task.id)));
    setSelectedIds([]);
  };

  const handleTaskStatusChange = (id: number, isCompleted: boolean) => {
    if (isCompleted) {
      const task = tasks.find(item => item.id === id);
      if (task) {
        setTasks(tasks.filter(item => item.id !== id));
        setCompletedTasks([...completedTasks, task]);
      }
    } else {
      const task = completedTasks.find(item => item.id === id);
      if (task) {
        setCompletedTasks(completedTasks.filter(item => item.id !== id));
        setTasks([...tasks, task]);
      }
    }
  };

  const handleImportantStatusChange = (id: number, isImportant: boolean) => {
    if (isImportant) {
      const task = tasks.find(item => item.id === id);
      if (task) {
        setTasks(tasks.filter(item => item.id !== id));
        setImportantTasks([...importantTasks, task]);
      }
    } else {
      const task = importantTasks.find(item => item.id === id);
      if (task) {
        setImportantTasks(importantTasks.filter(item => item.id !== id));
        setTasks([...tasks, task]);
      }
    }
  };

  const groupedData = [
    { category: "Penting", data: importantTasks },
    { category: "Selesai", data: completedTasks },
    { category: "Tugas", data: tasks },
  ].filter(group => group.data.length > 0);

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
      {selectedIds.length > 0 && (
        <View style={[styles.headerContainer, { backgroundColor: darkMode ? "#414141" : "#f1f1f1" }]}>
          <IconButton icon="close" size={25} iconColor={darkMode ? "#fff" : "#000"} onPress={() => setSelectedIds([])} />
          <Text style={[styles.headerText, { color: darkMode ? "#fff" : "#000" }]}>{`${selectedIds.length} Selected`}</Text>
          <IconButton
            icon={selectedIds.length === tasks.length ? "playlist-remove" : "playlist-check"}
            size={25}
            iconColor={darkMode ? "#fff" : "#000"}
            onPress={() =>
              setSelectedIds(selectedIds.length === tasks.length ? [] : tasks.map(task => task.id))
            }
          />
        </View>
      )}
      <Text style={[styles.header, { color: darkMode ? "#fff" : "#000" }]}>My Day</Text>
      <Text style={[styles.date, { color: darkMode ? "#fff" : "#000" }]}>{getFormattedDate()}</Text>
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={groupedData}
        keyExtractor={item => item.category}
        renderItem={({ item: group }) => (
          <View>
            <Text style={[styles.categoryTitle, { color: darkMode ? "#fff" : "#000" }]}>{group.category}</Text>
            {group.data.map(task => (
              <TouchableOpacity key={task.id} onPress={() => console.log("Task Pressed", task.judul)}>
                <Card
                  id={task.id}
                  sumberGambar={task.sumberGambar}
                  judul={task.judul}
                  keterangan={task.keterangan}
                  isSelected={selectedIds.includes(task.id)}
                  onLongPress={handleLongPress}
                  onSelectChange={handleSelectChange}
                  onStatusChange={handleTaskStatusChange}
                  onImportantChange={handleImportantStatusChange}
                  showCheckbox={selectedIds.length > 0}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      {selectedIds.length > 0 && (
        <IconButton
          style={styles.deleteButton}
          icon="delete"
          size={40}
          iconColor='#fff'
          onPress={handleDelete}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        color="#fff"
        onPress={() => console.log("Add task")}
      />
    </View>
  );
}