const visibilityModelWindow = (state = 'hide', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_MODEL_WINDOW':
      return action.status
    default:
      return state
  }
}

export default visibilityModelWindow;
