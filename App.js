import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Weather from "./src/components/weather";
import AboutUs from "./src/components/AboutUs";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  const Tabs = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "weather") {
              iconName = "sun-o";
            } else if (route.name === "about") {
              iconName = "info-circle";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tabs.Screen name="weather" component={Weather} />
        <Tabs.Screen name="about" component={AboutUs} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
