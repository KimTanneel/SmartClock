import React, { Component } from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import FlatListAlarm from '../components/FlatListAlarm';
import {Audio} from 'expo-av';
import alarm from '../data/alarm.json'
// import BackgroundTimer from 'react-native-background-timer';

class AlarmScreen extends Component{

    async componentDidMount(){
        Audio.setAudioModeAsync({
          allowsRecordingIOS:false,
          interruptionModeAndroid:Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid:Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid:true,
          staysActiveInBackground:true,
          playThroughEarpieceAndroid:true
        });
        this.sound = new Audio.Sound();
        // this.backgroundtimer = new BackgroundTimer();
        const status={
            shouldPlay:false,
        }
        this.sound.loadAsync(require('../../assets/iphone.mp3'),status,false);
        
      };

    playSound(){
        this.sound.playAsync();
        this.sound.replayAsync();
        alert("Playyy Music");
        console.log(JSON.stringify(alarm) )
    }
    
    render(){
        return(
            <View style={{flex:1}}>
                <FlatListAlarm></FlatListAlarm>
                <Button
                    style={{flex:1}}
                    title="Play sound"
                    color="#3CBBD1" 
                    onPress={this.playSound.bind(this)}
                >
                </Button> 
            </View>
            
        )
    }
}
export default AlarmScreen;