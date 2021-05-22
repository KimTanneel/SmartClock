import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import CustomButton from "./CustomButton";
import ScrollViewItem from "./ScrollViewItem";
import TextPoppins from "./TextPoppins";

const stopped = 0;
const started = 1;
export default class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: stopped,
      nowTime: 0,
      timer: {
        milisec: 0,
        sec: 0,
        min: 0,
        hour: 0,
      },
      lap: [],
    };
    this.interval = null;
  }
  startCounter = () => {
    this.setState({ status: started });
    const start = Date.now() - this.state.nowTime;
    console.log(start);
    this.interval = setInterval(() => {
      this.count(start);
    }, 25);
  };
  pauseCounter = () => {
    this.setState({ status: stopped }, () => {
      console.log(this.state);
    });
    clearInterval(this.interval);
  };
  resetCounter = () => {
    this.setState({
      nowTime: 0,
      timer: { milisec: 0, sec: 0, min: 0, hour: 0 },
      status: stopped,
      lap: [],
    });
  };
  lapTime = () => {
    this.setState(
      {
        lap: [
          ...this.state.lap,
          {
            id: this.state.lap.length + 1,
            time:
              (this.state.timer.hour === 0
                ? ""
                : this.pad(this.state.timer.hour, 2) + ":") +
              (this.state.timer.min === 0
                ? ""
                : this.pad(this.state.timer.min, 2) + ":") +
              this.pad(this.state.timer.sec, 2) +
              "." +
              this.pad(this.state.timer.milisec, 2),
          },
        ],
      },
      () => {
        console.log(this.state.lap);
      }
    );
  };
  count = (start) => {
    let delta = Date.now() - start;
    let ms = delta % 100;
    let s = Math.floor(delta / 1000);
    let m = Math.floor(delta / 60000);
    let h = Math.floor(m / 60);
    this.setState({
      nowTime: delta,
      timer: { milisec: ms, sec: s, min: m, hour: h },
    });
  };
  startBtn = (
    <CustomButton
      onPress={this.startCounter}
      style={styles.btnStart}
      textStyle={{ color: "rgb(59,78,114)" }}
    >
      Start
    </CustomButton>
  );
  resetBtn = (
    <CustomButton
      onPress={this.resetCounter}
      style={styles.btnReset}
      textStyle={{ color: "red" }}
    >
      Reset
    </CustomButton>
  );
  pauseBtn = (
    <CustomButton
      onPress={this.pauseCounter}
      style={styles.btnStart}
      textStyle={{ color: "rgb(59,78,114)" }}
    >
      Pause
    </CustomButton>
  );
  lapBtn = (
    <CustomButton
      onPress={this.lapTime}
      style={styles.btnStart}
      textStyle={{ color: "rgb(59,78,114)" }}
    >
      Lap
    </CustomButton>
  );
  renderItem = ({ item }) => {
    return (
      <ScrollViewItem>
        <TextPoppins>Lap {item.id}</TextPoppins>
        <TextPoppins>{item.time}</TextPoppins>
      </ScrollViewItem>
    );
  };
  btnSwitcher = (status) => {
    switch (status) {
      case 0:
        return (
          <>
            {this.startBtn}
            {this.resetBtn}
          </>
        );
      case 1:
        return (
          <>
            {this.pauseBtn}
            {this.lapBtn}
          </>
        );

      default:
        return (
          <>
            {this.startBtn}
            {this.resetBtn}
          </>
        );
    }
  };
  pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  render() {
    return (
      <SafeAreaView style={styles.stopWatchContainer}>
        <View style={styles.stopWatch}>
          <TextPoppins>
            {this.state.timer.hour === 0
              ? ""
              : this.pad(this.state.timer.hour, 2) + ":"}
            {this.state.timer.min === 0
              ? ""
              : this.pad(this.state.timer.min, 2) + ":"}
            {this.pad(this.state.timer.sec, 2)}.
            {this.pad(this.state.timer.milisec, 2)}
          </TextPoppins>
        </View>
        <View style={styles.controller}>
          {this.btnSwitcher(this.state.status)}
          {/* {this.startBtn}
          {this.resetBtn} */}
        </View>
        <View style={styles.lapList}>
          <FlatList
            data={this.state.lap}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}

let clockSize = 200;
let color = "rgb(227, 237, 247)";

const styles = StyleSheet.create({
  stopWatchContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
  },
  stopWatch: {
    alignItems: "center",
    justifyContent: "center",
    width: clockSize,
    height: clockSize,
    borderRadius: clockSize / 2,
    backgroundColor: color,
    // Shadow
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 22,
  },
  controller: {
    marginTop: 20,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnStart: {
    backgroundColor: color,
  },
  btnReset: {
    backgroundColor: color,
  },
  lapList: {
    width: "100%",
    marginTop: 10,
    marginBottom: 270,
    // alignItems: 'center',
  },
});
