const initialState = {
  pictures: [["LAMA",[]],["ALPAGA",[]]],
};

function togglePictures(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "ADD_PICTURES":
      nextState = {...state}
      let picturesUpdated = nextState.pictures
        let found = false
        let index = 0
        while (!found && index<picturesUpdated.length){
          if (picturesUpdated[index][0].toUpperCase() == action.value[0].toUpperCase()){
            found = true
            picturesUpdated[index] = action.value
            nextState.pictures = picturesUpdated
          }
          index++
        }
      return nextState || state;
    case "CLEAR_PICTURES":
      nextState = {...state}
      nextState.pictures.forEach((element) => {
        element[1]=[]
      });
      return nextState || state;
    default:
      return state;
  }
}

export default togglePictures;