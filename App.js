import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AlarmScreen from './app/Screen/AlarmScreen'
export default function App() {
  return (
    <View style={styles.container}>
        <AlarmScreen></AlarmScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    backgroundColor: '#fff',
   
  },
});
