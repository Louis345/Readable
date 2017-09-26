import React,{Component} from 'react';
import {Text, View, TouchableOpacity,StyleSheet} from 'react-native';


class Card extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      flash_cards: []
    };
  }



  render(){
    return(
      <View style={styles.container}>
        <View style={styles.card}>
         <Text style={styles.hiragana}>
           {this.props.hiragana}
         </Text>
         <Text style={styles.chinese}>
           {this.props.kanji}
         </Text>
         <Text style={styles.definition}>
           {this.props.english}
         </Text>
        </View>
      </View>
    )
  }



}


const  styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  hiragana: {
    fontSize: 25,
    padding: 3
  },
  card: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.3,
    marginBottom: 10,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    width: 290,
    height: 290
  },
  definition: {
    fontSize: 25,
    textAlign: "center",
    padding: 1
  },
  chinese: {
    fontSize: 45
  },
  pinyin: {
    flex: 1,
    fontSize: 40
  }
});

export default Card;
