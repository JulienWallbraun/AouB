import React from 'react';
import {StyleSheet,View,TextInput, Button,FlatList,Text,ActivityIndicator, Image} from "react-native";
import { connect, dispatch } from "react-redux";
import Toast from 'react-native-simple-toast';

  class Quizz extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          answer: "",
          picture: ""
        }
    }

    //select a picture type among choices available in settings
    _selectPictureType(){
        const nbChoices = this.props.picturesUrl.length
        const number = Math.floor(Math.random()*nbChoices)
        const result = this.props.picturesUrl[number]
        return result
    }

    _selectPictureByIndex(){
        const choicePictures = this._selectPictureType()
        const answer = choicePictures[0]
        const nbPictures = choicePictures[1].length
        const index =  Math.floor(Math.random()*nbPictures)
        const result = choicePictures[1][index].webformatURL
        this.setState({answer: answer, picture: result})
    }

    _loadPicture(){
        this._selectPictureByIndex()
    }

    _testAnswer(answer){
      if (answer==this.state.answer){
        Toast.show("C'est VRAI!")
      }
      else{
        Toast.show("C'est FAUX!")
      }
    }

    _displayChoices(){
        return(
          <FlatList
          data={this.props.picturesUrl}
          keyExtractor={(item) => item[0].toString()}
          renderItem={({ item }) => <Button style={styles.button} title={item[0]} onPress={() => {
            this._testAnswer(item[0])
            this._loadPicture()}}/>
          }
          />
        )        
   }

    render(){
    console.log("on est dans le render du quizz")
    //console.log(this.props.picturesUrl)
        return(
            <View style={styles.container}>
                <Text style={styles.question}>Qu'est-ce que c'est?</Text>                
                
                <Image style={styles.image} source={this.state.picture? {uri: this.state.picture} : null}/>            
                  
                {this._displayChoices()}        
            </View>
        )
    }

    componentDidMount(){
      console.log("on est dans le component didmount")
      console.log(this.props.picturesUrl)
      this._loadPicture()
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    choicesContainer: {
        flex: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    question: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
    choice: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 5,
      },
      button: {
        flex: 1,
      },
      image: {
        flex: 7,
        height: 200, 
        width:200,
        margin: 5 
      },
  });

  const mapStateToProps = (state) => {
    return {
      picturesUrl: state.picturesUrl,
    };
  };

  export default connect(mapStateToProps)(Quizz);