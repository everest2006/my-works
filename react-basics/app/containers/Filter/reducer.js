export function filterReducer(state = '', action) {
  switch (action.type) {
    case 'FILTER':
      return action.value
    default:
      return state;
  }
}

export function showDoneReducer(state = false, action) {
  switch (action.type) {
    case 'CHECKED':
      return action.value
    default:
      return state
  }
}
