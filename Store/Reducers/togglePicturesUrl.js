import Choice from '../../Model/Choice'

const initialState = {
  /*
  pictures contains all data to load pictures
  each choice is represented by an map of 3 elements :
  - name : choice name
  - priority : choice probabilty weight to be selected randomly in the quizz
  - data : data of all pictures loaded for this choice
  */
  pictures: [new Choice("LAMA"), new Choice("ALPAGA")]
};

function togglePictures(state = initialState, action) {
  let nextState;
  let picturesUpdated
  let found = false
  let index = 0
  switch (action.type) {
    case "ADD_PICTURES":
      nextState = {...state}
      picturesUpdated = nextState.pictures
      found = false
      index = 0
        while (!found && index<picturesUpdated.length){
          if (picturesUpdated[index].name.toUpperCase() == action.value.name.toUpperCase()){
            found = true
            picturesUpdated[index].data = action.value.data
            nextState.pictures = picturesUpdated
          }
          index++
        }
      return nextState || state;
    case "CLEAR_PICTURES":
      nextState = {...state}
      nextState.pictures.forEach((element) => {
        element.data=[]
      });
      return nextState || state;
    default:
      return state;
  }
}

export default togglePictures;