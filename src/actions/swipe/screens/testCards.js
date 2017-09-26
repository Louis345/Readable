import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import axios from "axios";
import config from "../config/config";
import Card from "../components/Card";
import Button from "apsl-react-native-button";
import { simulte } from "sm2-plus";
import api from "../config/fetchData";

import { WORST, BEST, CORRECT, calculate, getPercentOverdue } from "sm2-plus";

class testCards extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    reveal: false,
    counter: 0
  };
  componentWillMount() {
    let promise = api.getData();
    promise.then(response => {
      console.log(response.data);
    });
  }
  practice() {
    //   let data :{
    //     word:'hello',
    //     dueDate:0,
    //     grade:3,
    //     oldEF:2,
    //     index:3,
    //     question:'right',
    //     questionAskedDay:'2017-08-14T00:00:00.000Z',
    //     nextDay:'2017-08-16T00:00:00.000Z'
    //
    //   }
    //
    //
    //
    //   if (data.question === "right") {
    //      data.index += 1;
    //   } else {
    //     data.index = 1
    //   }
    //
    // data.grade = (-0.8 + 0.28 * data.index + 0.02 * Math.pow(data.index,2));
    //   console.log(data.grade);
    //   if (data.question === "right") {
    //     console.log(6* Math.pow(data.grade,data.index-1));
    //     data.dueDate = (6 * (Math.pow(data.grade,data.index-1)));
    //   } else {
    //   data.dueDate = 1;
    //   }
    //
    //   console.log(
    //     `this is index ${data.index} and the next value is grade ${data.grade} and do date ${data.dueDate}`
    //   );
    //   data.nextDay = data.questionAskedDay + data.dueDate;
    const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
    const getDaysSinceEpoch = () =>
      Math.round(new Date().getTime() / DAY_IN_MINISECONDS);

    const TODAY = getDaysSinceEpoch();

    const testWord = {
      word: "test",
      update: TODAY - 50,
      dueDate: TODAY,
      difficulty: 0.08,
      interval: 1
    };

    console.info(calculate(testWord, WORST, TODAY));
    console.log(fetchData());
  }
  revealDefinition() {
    let counter = this.state.counter;
    counter++;
    this.setState({
      reveal: !this.state.reveal
    });
  }
  incrementCard() {
    let counter = this.state.counter;
    console.log(this.props.navigation.state.params);
    counter++;
    if (counter >= this.props.navigation.state.params.length) {
      counter = 0;
    }
    this.setState({
      counter,
      reveal: !this.state.reveal
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.reveal === false &&
          <View style={styles.container}>
            <Card
              kanji={
                this.props.navigation.state.params[this.state.counter].kanji
              }
            />
            <View style={styles.container}>
              <Button
                style={styles.buttonStyle}
                textStyle={styles.textStyle}
                onPress={() => this.revealDefinition()}
              >
                Reveal Me
              </Button>
            </View>
          </View>}
        {this.state.reveal === true &&
          <View style={styles.container}>
            <Card
              hiragana={
                this.props.navigation.state.params[this.state.counter].hiragana
              }
              kanji={
                this.props.navigation.state.params[this.state.counter].kanji
              }
              english={
                this.props.navigation.state.params[this.state.counter]
                  .title_english
              }
            />
            <View style={styles.buttonContainer}>
              <Button
                style={styles.buttonTwoStyle}
                textStyle={styles.textStyle}
                onPress={() => this.practice()}
              >
                Not Yet
              </Button>
              <Button
                style={styles.buttonThreeStyle}
                textStyle={styles.textStyle}
                onPress={() => this.incrementCard()}
              >
                I got It.
              </Button>
            </View>
          </View>}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    borderColor: "#2980b9",
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    width: 280
  },
  buttonTwoStyle: {
    borderColor: "#2980b9",
    backgroundColor: "green",
    justifyContent: "space-between",
    width: "45%"
  },
  buttonThreeStyle: {
    borderColor: "#2980b9",
    backgroundColor: "purple",
    justifyContent: "space-between",
    width: "45%"
  },
  textStyle: {
    color: "white"
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 1
  }
});

export default testCards;
