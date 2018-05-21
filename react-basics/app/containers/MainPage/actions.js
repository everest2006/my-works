export const addCategory = name => {
  return {
    type: 'ADD_CATEGORY',
    name
  }
}

export const renameCategory = (newName, id) => {
  return {
    type: 'RENAME_CATEGORY',
    newName,
    id
  }
}

export const addNestedCategory = (nestedName, id) => {
  return {
    type: 'ADD_NESTED_CATEGORY',
    nestedName,
    id
  }
}
export const removeCategory = (id) => {
  return {
    type: 'REMOVE_CATEGORY',
    id
  }
}
export const addCurrentCategoryId = (id) => {
  return {
    type: 'ADD_CURRENT_CATEGORY_ID',
    id
  }
}
export const addCurrentTaskId = (id) => {
  return {
    type: 'ADD_CURRENT_TASK_ID',
    id
  }
}
export const addTask = (name, id) => {
  return {
    type: 'ADD_TASK',
    name,
    id
  }
}
