import { StyleSheet, View } from "react-native";

export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
            <View style={{ flex: 7.5, backgroundColor: "teal" }}></View>
            <View style={{ flex: 3, backgroundColor: "orange" }}></View>
            <View style={{ flex: 1, backgroundColor: "brown" }}></View>
        </View>
    );
}
