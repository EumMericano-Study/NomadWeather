import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import { WEATHER_API_KEY } from "@env";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
    const [city, setCity] = useState<string>("Loading...");
    const [days, setDays] = useState([]);
    const [ok, setOk] = useState<boolean>(true);

    const getWeather = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
            accuracy: 5,
        });
        const location = await Location.reverseGeocodeAsync(
            { latitude, longitude },
            { useGoogleMaps: false }
        );
        setCity(location[0].city || "");
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${WEATHER_API_KEY}&units=metric`
        );
        const json = await response.json();
        setDays(json.daily);
    };

    useEffect(() => {
        getWeather();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>{city}</Text>
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.weather}
            >
                {days.length === 0 ? (
                    <View style={styles.day}>
                        <ActivityIndicator
                            color="white"
                            size="large"
                            style={{ marginTop: 10 }}
                        />
                    </View>
                ) : (
                    days.map((day: any, index) => (
                        <View style={styles.day} key={index}>
                            <Text style={styles.temp}>
                                {parseFloat(day.temp.day).toFixed(1)}
                            </Text>
                            <Text style={styles.desc}>
                                {day.weather[0].main}
                            </Text>
                            <Text style={styles.tinyText}>
                                {day.weather[0].description}
                            </Text>
                        </View>
                    ))
                )}
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
        fontSize: 50,
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
    tinyText: {
        fontSize: 20,
    },
});
