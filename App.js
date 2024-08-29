import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Weather from "./src/components/weather";
const weatherBg = require("./assets/weatherBg.jpg");

export default function App() {
  return (
    <ImageBackground source={weatherBg} style={styles.container}>
      <Weather />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
    fontFamily: "Roboto",
  },
});
