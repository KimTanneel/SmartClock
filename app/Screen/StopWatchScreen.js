import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StopWatch from "../components/StopWatch";

const StopWatchScreen = () => {
  return (
    <View style={styles.activityContainer}>
      <StopWatch />
    </View>
  );
};

export default StopWatchScreen;

const bgColor = "rgb(227, 237, 247)";
const styles = StyleSheet.create({
  activityContainer: {
    fontFamily: "Poppins",
    backgroundColor: bgColor,
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 15,
  },
});
