import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

const TextPoppins = (props) => {
  const [loaded] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  });
  return (
    <View>
      <Text style={styles.container}>{props.children}</Text>
    </View>
  );
};

export default TextPoppins;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Poppins-Black",
    fontSize: 20,
    fontWeight: "500",
    color: "rgb(59,78,114)",
  },
});
