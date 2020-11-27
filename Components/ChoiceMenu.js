import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { connect, dispatch } from "react-redux";

class ChoiceMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: true,
    };
  }
  render() {
    const { choiceName } = this.props;
    return (
      <View style={styles.choiceMenucontainer}>
        <Text>{choiceName.item[0]}</Text>
        <Button title="Supprimer" onPress={() => this.props.remove(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  choiceMenucontainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
const mapStateToProps = (state) => {
  return {
    picturesUrl: state.picturesUrl,
  };
};

export default connect(mapStateToProps)(ChoiceMenu);
