import React from "react";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import NumericInput from "react-native-numeric-input"

class ChoiceMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      probability: 1
    };
  }

  render() {
    const { choiceName } = this.props;
    return (
      <View style={styles.choiceMenucontainer}>
        <Text style={styles.choiceText}>{choiceName.item.name}</Text>
        <Button style={styles.choiceDeleteButton} color="red" title="Supprimer" onPress={() => this.props.remove(this)} />
        <NumericInput
          value={this.state.probability}
          onChange={(value) => {            
            choiceName.item.priority = value
            this.setState({probability: value})}}
            minValue={1}
            maxValue={10}/>
      </View>
          );
  }
}

const styles = StyleSheet.create({
  choiceMenucontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  choiceText: {
    flex: 4,
  },
  choiceDeleteButton: {
    flex: 1,
  },
  choiceRatio: {
    flex: 1,
  },
});

export default ChoiceMenu