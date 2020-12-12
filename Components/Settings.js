import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  AppRegistry,
} from "react-native";
import { getPictures } from "../API/PixabayAPI";
import { connect, dispatch } from "react-redux";
import Toast from "react-native-simple-toast";
import ChoiceMenu from "./ChoiceMenu";
import Choice from '../Model/Choice';

const CHOICES_LIMIT = 6;
const NB_PICTURES_PER_CHOICE = 100;
const PATTERN = /[^A-Za-z\s]/;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newChoice: "",
      loadedChoices: 0,
    };
  }

  _displayQuizz() {
    this.props.navigation.navigate("Quizz");
  }

  _displayChoices() {
    return (
      <View style={styles.choicesContainer}>
        <FlatList
          data={this.props.pictures}
          renderItem={(item) => (
            <ChoiceMenu
              choiceName={item}
              remove={(item) => this._removeChoice(item)}
              updateChoiceProbability={(item) => this._updateChoiceProbability(item)}
            />
          )}
          keyExtractor={(item) => item.name}
        ></FlatList>
      </View>
    );
  }

  _removeChoice(key) {
    const choice = key.props.choiceName.item;
    let found = false;
    let index = 0;
    while (!found && index < this.props.pictures.length) {
      if (
        this.props.pictures[index].name.toUpperCase() == choice.name.toUpperCase()
      ) {
        this.props.pictures.splice(index, 1);
        found = true;
      }
      index++;
    }
    this.setState({ newChoice: "" });
  }

  _updateChoiceProbability(key, probability) {
    console.log("update priority")
    key.props.choiceName.item.priority = probability
    console.log(this.props.pictures)
    this.setState({ newChoice: "" });
  }

  _addChoice() {
    let found = false;
    let index = 0;
    while (!found && index < this.props.pictures.length) {
      if (
        this.props.pictures[index].name.toUpperCase() ==
        this.state.newChoice.toUpperCase()
      ) {
        found = true;
      }
      index++;
    }
    if (this.state.newChoice.length !== 0 && !found) {
      this.props.pictures.push(new Choice(this.state.newChoice.toUpperCase()));
      this.setState({ newChoice: "" });
    }
  }

  _loadPictures(numberOfPicturesPerChoice) {
    //clear pictures
    this._togglePicturesClear();
    this.setState({ loadedChoices: 0 });
    //add pictures corresponding to the different choices availables
    this.props.pictures.forEach((element) => {
      this._loadPicturesChoice(
        element.name.toString(),
        numberOfPicturesPerChoice
      );
    });
  }

  //load pictures corresponding to a choice
  _loadPicturesChoice(choice, numberOfPictures) {
    getPictures(choice, numberOfPictures).then((data) => {
      //the choice name and the result of the request based on the choice are stored
      const resultGet = {
        name: choice, 
        data: data.hits
      };
      this._togglePicturesAdd(resultGet);
      this.setState({ loadedChoices: this.state.loadedChoices + 1 });

      //if pictures for every choices are loaded we can display questions
      if (this.props.pictures.length == this.state.loadedChoices) {
        this._displayQuizz();
      }
    });
  }

  _testErrorInNewChoicePattern() {
    if (this.state.newChoice.length == 0) {
      Toast.show("Mot trop court!");
      return true;
    } else if (this.state.newChoice.match(PATTERN)) {
      Toast.show("Caractère non autorisé!");
      return true;
    } else return false;
  }

  _togglePicturesUpdateProbability(val){
    const action = { type: "UPDATE_CHOICE_PROBABILITY", value: val };
    this.props.dispatch(action);
  }

  _togglePicturesAdd(val) {
    const action = { type: "ADD_PICTURES", value: val };
    this.props.dispatch(action);
  }

  _togglePicturesClear() {
    const action = { type: "CLEAR_PICTURES", value: "" };
    this.props.dispatch(action);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>Que souhaites-tu comparer?</Text>

        <View style={styles.newChoiceContainer}>
          <TextInput
            style={styles.newChoiceText}
            placeholder="nouveau choix"
            onChangeText={(text) => this.setState({ newChoice: text })}
            onSubmitEditing={(text) => {
              if(this.state.newChoice.length > 0 && this.props.pictures.length < CHOICES_LIMIT && this.state.newChoice.match(PATTERN)==null)
              {
                this._addChoice();
              }
            }}
            value={this.state.newChoice}
          />
          <Button
            color="green"
            title="ajouter"
            onPress={() => this._addChoice()}
            disabled={
              this.state.newChoice.length == 0 ||
              this.props.pictures.length >= CHOICES_LIMIT ||
              this.state.newChoice.match(PATTERN)
            }
          />
        </View>

        {this._displayChoices()}

        <Button
          style={styles.button}
          title="C'est parti!"
          onPress={() => {
            this._loadPictures(NB_PICTURES_PER_CHOICE);
          }}
          disabled={this.props.pictures.length <= 1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  choicesContainer: {
    flex: 4,
    backgroundColor: "#FFFFFF",
  },
  question: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },
  newChoiceContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  newChoiceText: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 1,
    padding: 5,
  },
  button: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    pictures: state.pictures,
  };
};

AppRegistry.registerComponent("Settings", () => Settings);

export default connect(mapStateToProps)(Settings);
