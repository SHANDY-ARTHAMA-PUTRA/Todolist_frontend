// app/profile.tsx

import React, { useContext } from 'react';
import { router } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { ThemeContext } from "./_layout";

const profileImage = require('@/assets/images/john doe.jpg');

export default function Profile() {

    const { darkMode } = useContext(ThemeContext);

    return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
        {/* Profile Section */}
        <View style={[styles.profile, { backgroundColor: darkMode ? "#1e1e1e" : "#f2f2f2" }]}>
            <Image source={profileImage} style={styles.gambarProfil} />
            <View style={[styles.teksContainer]}>
                <Text style={[styles.teksTebal, { color: darkMode ? "#fff" : "#000" }]}>John Doe</Text>
                <Text style={[styles.text, { color: darkMode ? "#bbb" : "#555" }]}>john_doe@gmail.com</Text>
                <Text style={[styles.text, { color: darkMode ? "#bbb" : "#555" }]}>+1 919-404-4100</Text>
            </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: darkMode ? "#444" : "#007bff" }]}>
                <Text style={[styles.buttonText, { color: darkMode ? "#fff" : "#fff" }]}>Tambah Akun</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: darkMode ? "#444" : "#28a745" }]}>
                <Text style={[styles.buttonText, { color: darkMode ? "#fff" : "#fff" }]}>Kelola Akun</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: darkMode ? "#444" : "#dc3545" }]} 
                onPress={() => router.replace("/login")}>
                <Text style={[styles.buttonText, { color: darkMode ? "#fff" : "#fff" }]}>Logout</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    gambarProfil: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginEnd: 16,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "center",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,  // Reduced margin to bring buttons closer
    },
    teksContainer: {
        justifyContent: "center",
        flex: 1,
    },
    teksTebal: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
        marginBottom: 4,
    },
    actionContainer: {
        marginTop: 16,  // Reduced margin between profile and buttons
        flex: 1,
        justifyContent: 'flex-start',  // Adjust buttons to be more compact
    },
    button: {
        width: "100%",
        alignSelf: "center",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 22,  // Reduced margin bottom between buttons
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    }
});