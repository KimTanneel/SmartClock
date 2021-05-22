import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ScrollViewItem = props => {
  return <View style={styles.item}>{props.children}</View>;
};

export default ScrollViewItem;

let color = 'rgb(227, 237, 247)';
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color,
    height: 40,
    width: '96%',
    padding: 8,
    marginTop: 10,
    borderRadius: 10,
    // borderColor: '#000',
    // borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
