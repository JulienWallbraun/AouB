import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { getPictures } from "../API/PixabayAPI";
import { connect, dispatch } from "react-redux";
const NB_CHOICES_TO_LOAD = 2;

class Settings extends React.Component {

  constructor(props) {
    super(props);
  }

  _displayQuestion() {
    this.props.navigation.navigate("Quizz");
  }

  _loadPictures(numberOfPicturesPerChoice) {
    //clear pictures    
    this._togglePicturesClear()
    //add pictures corresponding to the different choices availables
    this._loadPicturesChoice("lama", numberOfPicturesPerChoice)
    this._loadPicturesChoice("alpaga", numberOfPicturesPerChoice)
  }

  //load pictures corresponding to a choice
  _loadPicturesChoice(choice, numberOfPictures){
    getPictures(choice, numberOfPictures).then((data) => {
      //the choice name and the result of the request based on the choice are stored
      const resultGet = [choice, data.hits]
      this._togglePicturesAdd(resultGet)

      //if pictures for every choices are loaded we can display questions
      if (this.props.picturesUrl.length == NB_CHOICES_TO_LOAD){
        this._displayQuestion();
      }
    })
  }

  _togglePicturesAdd(val) {
    const action = { type: "ADD_PICTURES", value: val };
    this.props.dispatch(action)
  }

  _togglePicturesClear() {
    const action = { type: "CLEAR_PICTURES", value: "" };
    this.props.dispatch(action)
  }

  render() {
    /*
    console.log("props du component settings au moment du render: ");
    console.log(this.props);
    */
    return (
      <View style={styles.container}>
        <Text style={styles.question}>Que souhaites-tu comparer?</Text>
        <View style={styles.choicesContainer}>
          <TextInput style={styles.choice}>Lama</TextInput>
          <TextInput style={styles.choice}>Alpaga</TextInput>
        </View>
        <Button
          style={styles.button}
          title="C'est parti!"
          onPress={() => {
            this._loadPictures(3);
          }}
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
  question: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  choice: {
    flex: 1,
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