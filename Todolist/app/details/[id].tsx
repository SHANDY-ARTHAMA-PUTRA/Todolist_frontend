// app/details/[id].tsx

import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../_layout";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const dataCard = require('@/assets/dataCard.json');

type Post = {
    id: number,
    sumberGambar: string,
    judul: string,
    keterangan: string,
};

export default function Detail() {
    const { darkMode } = useContext(ThemeContext);

    const [status, setStatus] = useState("");

    const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    };

    const { id } = useLocalSearchParams<{ id: string }>();
    const filteredData = dataCard.posts.filter((item: Post) => {
        let idNumber: number;
        idNumber = +id;
        if (item.id == idNumber) {
            return item;
        }
    });

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirmDate = (date: Date) => {
        const formattedDate = date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        setSelectedDate(formattedDate);
        hideDatePicker();
    };

    const showTimePicker = () => setTimePickerVisibility(true);
    const hideTimePicker = () => setTimePickerVisibility(false);
    const handleConfirmTime = (time: Date) => {
        const formattedTime = time.toLocaleTimeString();
        setSelectedTime(formattedTime);
        hideTimePicker();
    };

    return (
        <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
            <Image style={styles.image} source={filteredData[0].sumberGambar}></Image>

        <ScrollView>
            <View style={[styles.bottom, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
                <Text style={[styles.judul, { color: darkMode ? "#fff" : "#000" }]}>{filteredData[0].judul}</Text>
                <Text style={[styles.keterangan, { color: darkMode ? "#fff" : "#000" }]}>{filteredData[0].keterangan}</Text>

            <View style={styles.reminderSection}>
                <Text style={[styles.reminderTitle, { color: darkMode ? "#fff" : "#000" }]}>Setel Pengingat</Text>

                <TouchableOpacity style={styles.reminderButton} onPress={showDatePicker}>
                    <MaterialIcons name="calendar-today" size={20} color={darkMode ? "#fff" : "#000"} />
                    <Text style={[styles.reminderOption, { color: darkMode ? "#bb86fc" : "#6200ee" }]}>Setel Tanggal</Text>
                </TouchableOpacity>
                {selectedDate && <Text style={[styles.reminderResult, { color: darkMode ? "#fff" : "#000" }]}>{selectedDate}</Text>}

                <TouchableOpacity style={styles.reminderButton} onPress={showTimePicker}>
                    <MaterialIcons name="alarm" size={20} color={darkMode ? "#fff" : "#000"} />
                    <Text style={[styles.reminderOption, { color: darkMode ? "#bb68fc" : "#6200ee" }]}>Setel Waktu</Text>
                </TouchableOpacity>
                {selectedTime && <Text style={[styles.reminderResult, { color: darkMode ? "#fff" : "#000" }]}>{selectedTime}</Text>}

                <View style={styles.statusSection}>
                <Text style={[styles.reminderTitle, { color: darkMode ? "#fff" : "#000" }]}>Setel Status</Text>
                <View style={styles.statusOptions}>
                <TouchableOpacity style={styles.radioButton} onPress={() => handleStatusChange("Selesai")}>
                    <MaterialIcons name={status === "Selesai" ? "radio-button-checked" : "radio-button-unchecked"} size={20} color={darkMode ? "#fff" : "#000"}/>
                    <Text style={[styles.statusText, { color: darkMode ? "#fff" : "#000" }]}>Selesai</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButton} onPress={() => handleStatusChange("Sedang Berjalan")}>
                <MaterialIcons name={status === "Sedang Berjalan" ? "radio-button-checked" : "radio-button-unchecked"} size={20} color={darkMode ? "#fff" : "#000"}/>
                    <Text style={[styles.statusText, { color: darkMode ? "#fff" : "#000" }]}>Sedang Berjalan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButton} onPress={() => handleStatusChange("Belum Mulai")}>
                <MaterialIcons name={status === "Belum Mulai" ? "radio-button-checked" : "radio-button-unchecked"} size={20} color={darkMode ? "#fff" : "#000"}/>
                    <Text style={[styles.statusText, { color: darkMode ? "#fff" : "#000" }]}>Belum Mulai</Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
            </View>
        </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={() => console.log("FAB Clicked")}>
                <MaterialIcons name="edit" size={24} color="#fff" />
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottom: {
        padding: 24,
        backgroundColor: "#fff",
        borderRadius: 24,
        marginTop: 10,
        width: "100%",
    },
    image: {
        width: "100%",
        height: "40%",
    },
    judul: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
    keterangan: {
        fontSize: 16,
        marginBottom: 24,
    },
    reminderSection: {
        marginTop: 16,
    },
    reminderTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 9,
    },
    reminderButton: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    reminderOption: {
        fontSize: 16,
        marginLeft: 10,
    },
    reminderResult: {
        fontSize: 16,
        marginTop: 4,
        marginBottom: 8,
        marginLeft: 30,
    },
    statusSection: {
        marginVertical: 24,
    },
    statusOptions: {
        flexDirection: "column",
        justifyContent: "space-around", // Membagi ruang secara merata
        alignItems: "stretch", // Menjaga ikon dan teks tetap sejajar
        marginTop: 15,
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "stretch", // Menjaga ikon dan teks tetap sejajar
        marginLeft: 1,
    },
    statusText: {
        marginLeft: 8, // Memberikan jarak antara ikon dan teks
        marginBottom: 10,
        fontSize: 16,
        textAlign: "center", // Membuat teks tetap terlihat proporsional
    },    
    fab: {
        position: "absolute",
        right: 16,
        bottom: 16,
        backgroundColor: "#858be5",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },
});