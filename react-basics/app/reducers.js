import { combineReducers } from 'redux';
import { mainReducer, currentCategoryIdReducer, currentTaskIdReducer} from 'containers/MainPage/reducer';
import visibilityModelWindow from 'containers/ModalWindow/reducer';
import { filterReducer, showDoneReducer } from 'containers/Filter/reducer';



export default combineReducers(
  {
    storeList: mainReducer,
    modelWindow: visibilityModelWindow,
    currentCategoryId: currentCategoryIdReducer,
    currentTaskId: currentTaskIdReducer,
    filter: filterReducer,
    showDone: showDoneReducer,
}
);
