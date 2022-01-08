import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Vibration } from "react-native";

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello! I made a RN App!</Text>
            <Button
                title="3-3-7 진동"
                onPress={() => Vibration.vibrate([3, 3, 7], true)}
            />
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgreen",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 28,
    },
});
