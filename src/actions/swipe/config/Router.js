import { DrawerNavigator, StackNavigator } from "react-navigation";
import welcome from "../screens/Login";
import flashcards from "../screens/flashcards";
import Forms from "../screens/Forms";
import testCards from "../screens/testCards";

const MainNavigator = StackNavigator({
  Home: {
    screen: welcome,
    navigationOptions: ({ navigation }) => ({
      title: "Flash Cards"
    })
  },
  FlashCards: {
    screen: flashcards,
    navigationOptions: ({ navigation }) => ({
      title: "Review"
    })
  },
  CreateFlashCards: {
    screen: Forms,
    navigationOptions: ({ navigation }) => ({
      title: "Create Flash-Cards"
    })
  },
  TestCard: {
    screen: testCards,
    navigationOptions: ({ navigation }) => ({
      title: "Descriptions"
    })
  }
});

export default MainNavigator;
