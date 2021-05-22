import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AlarmScreen from "./app/Screen/AlarmScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StopWatchScreen from "./app/Screen/StopWatchScreen";
import * as Font from "expo-font";
import QRScanner from "./app/components/QRScanner";
const Tab = createBottomTabNavigator();
export default function App() {
  const [fontsLoaded] = useState(0);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        // Load a font `Montserrat` from a static resource
        "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),

        // Any string can be used as the fontFamily name. Here we use an object to provide more control
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
      });
      this.setState({ fontsLoaded: true });
    }
    // Update the document title using the browser API
    loadFonts();
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-outline" : "home-outline";
            } else if (route.name === "StopWatch") {
              iconName = focused ? "stopwatch-outline" : "stopwatch-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={AlarmScreen} />
        <Tab.Screen name="StopWatch" component={StopWatchScreen} />
        <Tab.Screen name="QR Scan" component={QRScanner} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#fff",
  },
});
