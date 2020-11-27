const initialState = {
  picturesUrl: [["LAMA",[]],["ALPAGA",[]]],
};

function togglePictures(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "ADD_PICTURES":
      nextState = {...state}
      let picturesUrlUpdated = nextState.picturesUrl
        let found = false
        let index = 0
        console.log(found+","+picturesUrlUpdated.length)
        while (!found && index<picturesUrlUpdated.length){
          console.log("comapraison entre "+picturesUrlUpdated[index][0].toUpperCase()+" et "+action.value[0].toUpperCase())
          if (picturesUrlUpdated[index][0].toUpperCase() == action.value[0].toUpperCase()){
            found = true
            picturesUrlUpdated[index] = action.value
            nextState.picturesUrl = picturesUrlUpdated
            console.log("DANS LE ADD PIC, valuer du nextstae  après ah=jout")
            console.log(nextState)
          }
          index++
        }
/*
      nextState = {
        ...state,
        picturesUrl: [...state.picturesUrl, action.value],
      };
      */
      return nextState || state;
    case "CLEAR_PICTURES":
      nextState = {...state}
      nextState.picturesUrl.forEach((element) => {
        element[1]=[]
      });

      /*
      nextState = {
          ...state,
          picturesUrl: []
          
      };*/
      return nextState || state;
    default:
      return state;
  }
}

export default togglePictures;
