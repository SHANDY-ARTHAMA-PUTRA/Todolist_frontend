// app/(tabs)/Users.tsx

import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import { GetUsers } from "@/api/GetUsers";
import { useState } from "react";
import Card from "@/components/Card";
import { ThemeContext } from "../_layout";

export default function Users() {

    const { darkMode } = useContext(ThemeContext);

    const [data, setData] = useState(null);
    GetUsers
        .then(result => {
            setData(result?.data.data)
        })
        
    return (
        <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Card
                    id={item.id}
                    sumberGambar={item.avatar}
                    judul={item.first_name}
                    keterangan={item.last_name}
                    isSelected={false} // Misalnya, default false
                    onLongPress={() => console.log(`Long press on ${item.id}`)} // Fungsi handler
                    onSelectChange={(selected) => console.log(`Selected: ${selected}`)} // Fungsi handler
                    showCheckbox={false} // Default false
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16},
});