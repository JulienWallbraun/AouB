import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
} from "react-native";
import { getPictures } from "../API/PixabayAPI";
import { connect, dispatch } from "react-redux";
import Toast from "react-native-simple-toast";
import ChoiceMenu from "./ChoiceMenu";

const CHOICES_LIMIT = 6;
const NB_PICTURES_PER_CHOICE = 3;
const PATTERN = /[^A-Za-z\s]/;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: ["LAMA", "ALPAGA"],
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
          data={this.props.picturesUrl}
          renderItem={(item) => (
            <ChoiceMenu
              choiceName={item}
              remove={(item) => this._removeChoice(item)}
            />
          )}
          keyExtractor={(item) => item[0]}
        ></FlatList>
      </View>
    );
  }

  _displayChoice(item, key) {
    return [
      <Text>{item}</Text>,
      <Button title="delete" onPress={() => this._removeChoice(key)} />,
    ];
  }

  _removeChoice(key) {
    const choice = key.props.choiceName.item;
    let found = false;
    let index = 0;
    while (!found && index < this.props.picturesUrl.length) {
      if (
        this.props.picturesUrl[index][0].toUpperCase() ==
        choice[0].toUpperCase()
      ) {
        this.props.picturesUrl.splice(index, 1);
        found = true;
      }
      index++;
    }
    this.setState({ newChoice: "" });
  }

  _addChoice() {
    let found = false;
    let index = 0;
    while (!found && index < this.props.picturesUrl.length) {
      if (
        this.props.picturesUrl[index][0].toUpperCase() ==
        this.state.newChoice.toUpperCase()
      ) {
        found = true;
      }
      index++;
    }
    if (this.state.newChoice.length !== 0 && !found) {
      this.props.picturesUrl.push([this.state.newChoice.toUpperCase(), []]);
      this.setState({ newChoice: "" });
    }
  }

  _loadPictures(numberOfPicturesPerChoice) {
    //clear pictures
    this._togglePicturesClear();
    this.setState({ loadedChoices: 0 });
    //add pictures corresponding to the different choices availables
    this.props.picturesUrl.forEach((element) => {
      this._loadPicturesChoice(
        element[0].toString(),
        numberOfPicturesPerChoice
      );
    });
  }

  //load pictures corresponding to a choice
  _loadPicturesChoice(choice, numberOfPictures) {
    getPictures(choice, numberOfPictures).then((data) => {
      //the choice name and the result of the request based on the choice are stored
      const resultGet = [choice, data.hits];
      this._togglePicturesAdd(resultGet);
      this.setState({ loadedChoices: this.state.loadedChoices + 1 });

      //if pictures for every choices are loaded we can display questions
      if (this.props.picturesUrl.length == this.state.loadedChoices) {
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
            onSubmitEditing={() => this._addChoice()}
            value={this.state.newChoice}
          />
          <Button
            title="ajouter"
            onPress={() => {
              this._addChoice();
            }}
            disabled={
              this.state.newChoice.length == 0 ||
              this.props.picturesUrl.length >= CHOICES_LIMIT ||
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
          disabled={this.props.picturesUrl.length <= 1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  choicesContainer: {
    flex: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  choiceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  newChoiceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  newChoiceText: {
    //flex: 1,
    backgroundColor: "#EEEEEE",
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
    picturesUrl: state.picturesUrl,
  };
};

export default connect(mapStateToProps)(Settings);