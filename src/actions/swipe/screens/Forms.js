import React from "react";
import { StyleSheet, Text, View,TouchableHighlight} from "react-native";
import t from "tcomb-form-native";
import Header from  '../components/Header';
import axios from 'axios';
import config from '../config/config.js';
var test = 'it works';
var Form = t.form.Form;

var Person = t.struct({
  title_english: t.String,
  kanji: t.String,
  hiragana: t.String,
  japanese_example:t.String,
  romaji_example:t.String,
  english_example:t.String,
});
var options = {};
class Forms extends React.Component {

  onPress = () =>{
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) {
      // if validation fails, value will be null
     // value here is an instance of Person
      this.saveFlashCard(value);
      this.setState({ value: null });
    }
  }

  saveFlashCard(value){
    console.log(value.title_english);
    axios
      .post(config.serverAddress, {
        insert:'insert',
        title_english:value.title_english,
        kanji:value.kanji,
        hiragana:value.hiragana,
        japanese_example:value.japanese_example,
        romaji_example:value.romaji_example,
        english_example:value.english_example
      })
      .then(response => {
        console.log(response);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form ref="form" type={Person} options={options} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPress}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 0,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});

export default Forms;
