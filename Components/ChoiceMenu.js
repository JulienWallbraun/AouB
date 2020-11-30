import React from "react";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import { connect, dispatch } from "react-redux";
import NumericInput from "react-native-numeric-input"

class ChoiceMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: true,
      value: 0.2
    };
  }
  render() {
    const { choiceName } = this.props;
    return (
      <View style={styles.choiceMenucontainer}>
        <Text style={styles.choiceText}>{choiceName.item[0]}</Text>
        <Button style={styles.choiceDeleteButton} color="red" title="Supprimer" onPress={() => this.props.remove(this)} />
        <NumericInput defaultValue={1} minValue={1} maxValue={10}/>
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
const mapStateToProps = (state) => {
  return {
    pictures: state.pictures,
  };
};

export default connect(mapStateToProps)(ChoiceMenu);
