import CreateCategoryObject from '../../utils/createCategoryObject';
import RenameCategory from '../../utils/renameCategory';
import addNestedCategory from '../../utils/addNestedCategory';
import removeCategory from '../../utils/removeCategory';
import addTask from '../../utils/addTask';
import moveTask from '../../utils/moveTask';
import addChangeTask from '../../utils/addChangeTask';


export function mainReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [new CreateCategoryObject(action.name), ...state];
    case 'RENAME_CATEGORY':
      return RenameCategory(state, action.newName, action.id);
    case 'ADD_NESTED_CATEGORY':
      return addNestedCategory(state, action.nestedName, action.id);
    case 'REMOVE_CATEGORY':
      return removeCategory(state, action.id);
    case 'ADD_TASK':
      return addTask(state, action.name, action.id);
    case 'MOVE_TASK':
      return moveTask(state, action.currentCategoryId, action.newCategoryId, action.currentTask);
    case 'ADD_CHANGE_TASK':
      return addChangeTask(state, action.obj, action.categoryId, action.taskId);
    default:
      return state;
  }
}

export function currentCategoryIdReducer(state = '', action) {
  switch (action.type) {
    case 'ADD_CURRENT_CATEGORY_ID':
      return action.id
    default:
      return state
  }
}

export function currentTaskIdReducer(state = '', action) {
  switch (action.type) {
    case 'ADD_CURRENT_TASK_ID':
      return action.id
    default:
      return state
  }
}

