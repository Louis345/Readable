import Expo from "expo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Deck from "../src/deck";
import { Card, Button } from "react-native-elements";
import axios from "axios";
import config from "../config/config.js";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      flash_cards: []
    };
  }

  componentDidMount() {
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

  renderCard(item,idx) {

    return (
      <Card key={idx} title={item.title_english} titleStyle={{ fontSize: 35 }}>
        <View style={styles.flashCardBody}>
          <Text style={styles.kanji}>
            {item.kanji}
          </Text>
          <Text style={styles.hirigana}>
          {item.hirigana}
          </Text>
          <Text style={styles.example}>
          {item.japanese_example}
          </Text>
          <Text style={styles.example}>
          {item.romaji_example}
          </Text>
          <Text>
            {item.english_example}
          </Text>
        </View>

        <Button
          icon={{ name: "code" }}
          backgroundColor="#3A9F44"
          title="View Now"
        />
      </Card>
    );
  }
  renderNoMoreCards() {
    return (
      <Card title="All Done">
        <Text style={{ marginBottom: 10 }}>
          There is no more content;
        </Text>
      </Card>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={this.state.flash_cards}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  flashCardBody: {
    justifyContent: "center",
    alignItems: "center"
  },
  hirigana: {
    fontSize: 25,
    paddingBottom: 10,
    fontWeight: "bold"
  },
  kanji: {
    fontSize: 25,
    paddingBottom: 5,
    fontWeight: "bold"
  },
  example: {
    paddingBottom: 8
  }
});

export default App;

Expo.registerRootComponent(App);
