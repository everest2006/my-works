export const filter = (value) => {
  return {
    type: 'FILTER',
    value
  }
}

export const showDoneChecked = (value) => {
  return {
    type: 'CHECKED',
    value
  }
}

