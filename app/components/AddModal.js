import React, { Component, useDebugValue } from "react";
import {
  AppRegistry,
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  Switch,
  Alert,
  TouchableHighlight,
  Dimensions,
  TextInput,
} from "react-native";

import Modal from "react-native-modalbox";
import Button from "react-native-button";
// import fs from 'react-native-fs';
import flatListData from "../data/FlatListData";
import alarmJson from "../data/alarm.json";
var screen = Dimensions.get("window");
export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.myModal = React.createRef();
    this.showAddModal = this.showAddModal.bind(this);
    this.state = {
      hours: "",
      minutes: "",
      note: "",
    };
  }
  showAddModal = () => {
    this.myModal.current.open();
  };
  render() {
    return (
      <Modal
        ref={this.myModal}
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: Platform.OS === "ios" ? 30 : 0,
          shadowRadius: 10,
          padding: 10,
          width: screen.width - 80,
          height: 280,
        }}
        position="center"
        backdrop={true}
        onClosed={() => {}}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "blue",
            alignContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Add Alarm{" "}
          </Text>
          <View style={styles.row}>
            <Text style={styles.text}>Time:</Text>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "orange",
                alignItems: "center",
              }}
            >
              <TextInput
                keyboardType={"numeric"}
                style={styles.timer}
                onChangeText={(text) => {
                  this.setState({ hours: text });
                }}
                value={this.state.hours}
              ></TextInput>
              <Text>:</Text>
              <TextInput
                keyboardType={"numeric"}
                style={styles.timer}
                onChangeText={(text) => {
                  this.setState({ minutes: text });
                }}
                value={this.state.minutes}
              ></TextInput>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.text]}>Note:</Text>
            <TextInput
              style={[styles.note]}
              placeholder={"Enter the note"}
              onChangeText={(text) => {
                this.setState({ note: text });
              }}
              value={this.state.note}
            ></TextInput>
          </View>
          <Button
            style={{ fontSize: 18, color: "white" }}
            containerStyle={{
              padding: 8,
              marginHorizontal: 70,
              height: 40,
              borderRadius: 6,
              backgroundColor: "mediumseagreen",
            }}
            onPress={() => {
              if (
                this.state.hours.length == 0 ||
                this.state.minutes.length == 0 ||
                this.state.note.length == 0
              ) {
                alert("You must fill all infomation");
                return;
              }
              if (this.state.hours.length > 2 || this.state.hours > 24) {
                alert("Hour error!");
                return;
              }
              if (this.state.minutes.length > 2 || this.state.minutes > 60) {
                alert("Minutes error!");
                return;
              }
              const newAlarm = {
                key: flatListData.length + 1,
                time: this.state.hours + ":" + this.state.minutes,
                note: this.state.note,
              };
              flatListData.push(newAlarm);
              // writefile json

              // fs.writeFile('../data/alarm.json', json, 'utf8', callback);
              // flatListData.push(newAlarm);

              this.props.parentFlatList.refreshFlatList(newAlarm.key);
              // alert(newAlarm.key)
              this.myModal.current.close();
            }}
          >
            Save
          </Button>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  btnSave: {},
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "red",
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: 10,
  },
  timer: {
    width: 32,
    fontSize: 24,
    borderColor: "#312e35",
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    marginHorizontal: 5,
    color: "#0D0D0D",
  },
  note: {
    width: 180,
    height: 24,
    fontSize: 20,
    borderBottomColor: "grey",
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    textAlign: "center",
  },
});
