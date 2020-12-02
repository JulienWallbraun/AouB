const initialState = {
  /*
  pictures contains all data to load pictures
  each choice is represented by an array of 3 elements :
  - index 0 : choice name
  - index 1 : choice probabilty weight to be selected randomly in the quizz
  - index 2 : data of all pictures loaded for this choice
  */
  pictures: [ ["LAMA", 1, [] ], ["ALPAGA", 1, [] ] ],
};

function togglePictures(state = initialState, action) {
  let nextState;
  let picturesUpdated
  let found = false
  let index = 0
  switch (action.type) {
    case "UPDATE_CHOICE_PROBABILITY":
      console.log("on update choice prob...")
      console.log(action.value)
      nextState = {...state}
      picturesUpdated = nextState.pictures
      found = false
      index = 0
        while (!found && index<picturesUpdated.length){
          if (picturesUpdated[index][0].toUpperCase() == action.value[0].toUpperCase()){
            found = true
            picturesUpdated[index][1] = action.value[1]
            nextState.pictures = picturesUpdated
            console.log(nextState.pictures)
          }
          index++
        }
      return nextState || state;
    case "ADD_PICTURES":
      nextState = {...state}
      picturesUpdated = nextState.pictures
      found = false
      index = 0
        while (!found && index<picturesUpdated.length){
          if (picturesUpdated[index][0].toUpperCase() == action.value[0].toUpperCase()){
            found = true
            picturesUpdated[index][2] = action.value[1]
            nextState.pictures = picturesUpdated
          }
          index++
        }
      return nextState || state;
    case "CLEAR_PICTURES":
      nextState = {...state}
      nextState.pictures.forEach((element) => {
        element[2]=[]
      });
      return nextState || state;
    default:
      return state;
  }
}

export default togglePictures;