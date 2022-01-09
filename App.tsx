import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>Seoul</Text>
            </View>
            <View style={styles.weather}>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.desc}>Sunny</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#69abce",
    },
    city: {
        flex: 1.2,
        justifyContent: "center",
        alignItems: "center",
    },
    cityName: {
        fontSize: 68,
        fontWeight: "600",
    },
    weather: {
        flex: 3,
    },
    day: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    temp: {
        fontSize: 178,
        fontWeight: "600",
    },
    desc: {
        fontSize: 60,
        marginTop: 50,
    },
});
