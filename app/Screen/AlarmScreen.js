import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlatListAlarm from '../components/FlatListAlarm'

class AlarmScreen extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <FlatListAlarm></FlatListAlarm>
            </View>
                
        )
    }
}
export default AlarmScreen;