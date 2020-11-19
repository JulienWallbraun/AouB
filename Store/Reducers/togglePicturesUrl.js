const initialState = {
  picturesUrl: [],
};

function togglePictures(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "ADD_PICTURES":
      nextState = {
        ...state,
        picturesUrl: [...state.picturesUrl, action.value],
      };
      return nextState || state;
    case "CLEAR_PICTURES":
      nextState = {
          ...state,
          picturesUrl: []
      };
      return nextState || state;
    default:
      return state;
  }
}

export default togglePictures;
