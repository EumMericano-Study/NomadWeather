import React from "react";
import { ScrollView, View, StyleSheet, Text, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>Seoul</Text>
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.weather}
            >
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.desc}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.desc}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.desc}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.desc}>Sunny</Text>
                </View>
            </ScrollView>
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
    weather: {},
    day: {
        width: SCREEN_WIDTH,
        alignItems: "center",
    },
    temp: {
        fontSize: 178,
        fontWeight: "600",
    },
    desc: {
        fontSize: 60,
        marginTop: 30,
    },
});
