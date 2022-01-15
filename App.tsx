import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

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

const icons = {
    Clouds: "cloudy",
    Clear: "day-sunny",
    Atmosphere: "cloudy-gusts",
    Snow: "snow",
    Rain: "rains",
    Drizzle: "rain",
    Thunderstorm: "lightning",
};

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
            {!ok ? (
                "위치 정보 동의를 하셔야 이용 가능합니다."
            ) : (
                <>
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
                            <View
                                style={{
                                    ...styles.day,
                                    alignItems: "center",
                                }}
                            >
                                <ActivityIndicator
                                    color="white"
                                    size="large"
                                    style={{ marginTop: 10 }}
                                />
                            </View>
                        ) : (
                            days.map((day: any, index) => (
                                <View style={styles.day} key={index}>
                                    <View
                                        style={{
                                            width: "100%",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={styles.temp}>
                                            {parseFloat(day.temp.day).toFixed(
                                                1
                                            )}
                                        </Text>
                                        <Fontisto
                                            name={icons[day.weather[0].main]}
                                            size={68}
                                            color="white"
                                        />
                                    </View>
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
                </>
            )}
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
        fontSize: 58,
        fontWeight: "500",
        color: "white",
    },
    weather: {},
    day: {
        width: SCREEN_WIDTH,
        alignItems: "flex-start",
        paddingHorizontal: 20,
    },
    temp: {
        marginTop: 50,
        fontWeight: "600",
        fontSize: 100,
        color: "white",
    },
    desc: {
        marginTop: -10,
        fontSize: 30,
        color: "white",
        fontWeight: "500",
    },
    tinyText: {
        marginTop: -5,
        fontSize: 25,
        color: "white",
        fontWeight: "500",
    },
});
