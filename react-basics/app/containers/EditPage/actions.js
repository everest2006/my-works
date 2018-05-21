export const moveTask = (currentCategoryId, newCategoryId, currentTask) => {
  return {
    type: 'MOVE_TASK',
    currentCategoryId,
    newCategoryId,
    currentTask
  }
}

export const addCurrentCategoryId = (id) => {
  return {
    type: 'ADD_CURRENT_CATEGORY_ID',
    id
  }
}

export const addChangeTask = (obj, categoryId, taskId) => {
  return {
    type: 'ADD_CHANGE_TASK',
    obj,
    categoryId,
    taskId
  }
}

