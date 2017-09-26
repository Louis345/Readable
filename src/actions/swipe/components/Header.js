import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Header = ({ headerText, japaneseText, onPress }) => {
  return (
    <View style={styles.viewStyle}>
      <View>
        <Text style={styles.textStyle}>{headerText}</Text>
        <Text style={styles.textStyle}>{japaneseText}</Text>
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: "#00C796",
    justifyContent: "center",
    alignItems: "center",
    height: 85,
    elevation: 13,
    borderBottomWidth: 2,
    borderColor: "#00C796",
    flexDirection: "row"
  },
  textStyle: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center"
  }
};

export default Header;
