import React from 'react';
import {StyleSheet,View, Button,FlatList,Text, Image} from "react-native";
import { connect, dispatch } from "react-redux";
import Toast from 'react-native-simple-toast';

  class Quizz extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          answer: "",
          picture: "",
          nbCorrectAnswer: 0,
          nbFalseAnswers: 0
        }
    }

    /*
    select a picture type among choices available in settings based on choice probabilty
    Exemple : pictures = [[choice1, 5, ...], [choice1, 3, ...], [choice1, 2, ...], [choice1, 8, ...]]
    the total number of choices is 5+3+2+8=18
    If the number picked is 9, the choice selected is choice3 because 5+3<9<=5+3+2
    */
    _selectPictureType(){
        let nbChoices = 0
        this.props.pictures.forEach(element => {
          nbChoices = nbChoices + element[1]
        });
        const number = Math.floor(Math.random()*nbChoices)
        let index = 0
        let incrementedNumber = 0
        let found = false
        while (found==false && index <= this.props.pictures.length){
          incrementedNumber = incrementedNumber + this.props.pictures[index][1]
          if (incrementedNumber>=number){
            found = true
          }
          else{
            index++
          }
        }
        const result = this.props.pictures[index]
        return result
    }

    _selectPictureByIndex(){
        const choicePictures = this._selectPictureType()
        const answer = choicePictures[0]
        const nbPictures = choicePictures[2].length
        const index =  Math.floor(Math.random()*nbPictures)
        const result = choicePictures[2][index].webformatURL
        this.setState({answer: answer, picture: result})
    }

    _loadPicture(){
        this._selectPictureByIndex()
    }

    _testAnswer(answer){
      if (answer==this.state.answer){
        Toast.show("C'est VRAI!")
        this.setState({nbCorrectAnswer: this.state.nbCorrectAnswer+1})
      }
      else{
        Toast.show("C'est FAUX!")
        this.setState({nbFalseAnswers: this.state.nbFalseAnswers+1})
      }
    }

    _displayChoices(){
        return(
          <FlatList
          data={this.props.pictures}
          keyExtractor={(item) => item[0].toString()}
          renderItem={({ item }) => <Button style={styles.button} title={item[0]} onPress={() => {
            this._testAnswer(item[0])
            this._loadPicture()}}/>
          }
          />
        )        
   }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.question}>Qu'est-ce que c'est?</Text>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreCorrect}>Nb réponses justes : {this.state.nbCorrectAnswer}</Text>
                  <Text style={styles.scoreFalse}>Nb réponses fausses : {this.state.nbFalseAnswers}</Text>
                </View>              
                
                <Image style={styles.image} source={this.state.picture? {uri: this.state.picture} : null} resizeMode="contain"/>            
                  
                {this._displayChoices()}        
            </View>
        )
    }

    componentDidMount(){
      this._loadPicture()
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    choicesContainer: {
        flex: 4,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
    question: {
        flex: 1,
        fontSize: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      scoreContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      scoreCorrect: {
        flex: 1,
        color: '#00DD00',
        alignItems: 'center',
        justifyContent: 'center',
      },
      scoreFalse: {
        flex: 1,
        color: '#FF0000',
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
        width:400,
        margin: 5 
      },
  });

  const mapStateToProps = (state) => {
    return {
      pictures: state.pictures,
    };
  };

  export default connect(mapStateToProps)(Quizz);