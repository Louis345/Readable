import Expo from "expo";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import config from "../config/config";
import Header from "../components/Header";

const menuItems = [
  "Create Flash Cards",
  "Flash Cards",
  "Test Card",
  "Time",
  "focused learning"
];

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flash_cards: []
    };
  }

  componentWillMount() {
    console.log("componentDidMount was called in Login");
    axios
      .post(config.serverAddress, {
        select: "select"
      })
      .then(response => {
        var result = Object.keys(response.data).map(function(key) {
          return response;
        });
        this.setState({
          flash_cards: response.data
        });
      });
  }

  onNavigate(idx) {
    let route = menuItems[idx];
    route = route.replace(/\s+/g, "");

    this.props.navigation.navigate(route, this.state.flash_cards);
  }

  displayMenu() {
    return menuItems.map((menuItem, idx) => {
      return (
        <TouchableOpacity
          style={styles.seperator}
          key={idx}
          onPress={() => this.onNavigate(idx)}
        >
          <Text style={styles.menu}>{menuItem}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View>
        <Header headerText={"let's get Started"} japaneseText={"始めましょう"} />

        {this.displayMenu()}

      </View>
    );
  }
}
const styles = StyleSheet.create({
  seperator: {
    height: 55,
    borderBottomWidth: 3,
    borderColor: "#e6e6e6"
  },
  menu: {
    paddingTop: 15,
    marginLeft: 10,
    fontWeight: "bold"
  }
});
export default Login;
