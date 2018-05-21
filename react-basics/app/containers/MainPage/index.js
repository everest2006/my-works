import React from 'react';
import { connect } from 'react-redux';
import H1 from 'components/H1';
import InputText from 'components/InputText';
import ButtonAdd from 'components/ButtonAdd';
import ModalWindow from 'containers/ModalWindow';
import Filter from 'containers/Filter';
import { renameCategory, addNestedCategory, addCategory, removeCategory, addCurrentCategoryId, addCurrentTaskId, addTask } from './actions';
import createListHtml from '../../utils/createListHtml';
import createTaskList from '../../utils/createTaskList';
import getTask from '../../utils/getTask';
import { visibilityModelWindow } from '../ModalWindow/actions';


  class MainPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.funDispatch = '';
    this.currentCatalogyId = '';
    this.onChangeHandlerInputCategory = this.onChangeHandlerInputCategory.bind(this);
    this.onChangeHandlerInputTask = this.onChangeHandlerInputTask.bind(this);
    this.onClickHandlerCategory = this.onClickHandlerCategory.bind(this);
    this.onClickHandlerTask = this.onClickHandlerTask.bind(this);
    this.handleContainerEnter = this.handleContainerEnter.bind(this);
  }
  onChangeHandlerInputCategory(e) {
    this.inputValue = e.target.value;
    this.input = e.target;
  }
    onChangeHandlerInputTask(e) {
      this.inputValueTask = e.target.value;
      this.inputTask = e.target;
    }
  onClickHandlerCategory() {
    if((this.inputValue !== undefined) && (this.inputValue !== '')) {
      this.props.onClickAddCategory(this.inputValue);
    }
    this.inputValue = '';
    this.input.value = '';
  }
    onClickHandlerTask() {
      if((this.inputValueTask !== undefined) && (this.inputValueTask !== '') && (this.props.currentCategoryId !== '')) {
        this.props.onClickAddTask(this.inputValueTask, this.props.currentCategoryId);
      }
      this.inputValueTask = '';
      this.inputTask.value = '';
    }
   componentDidMount() {
     this.container.addEventListener("click", this.handleContainerEnter);
   }

   componentWillUnmount() {
     this.container.removeEventListener("click", this.handleContainerEnter);
   }

   handleContainerEnter (event) {
    if (event.target.id == 'edit') {
      this.funDispatch = this.props.onClickRename;
      this.currentCatalogyId = event.target.parentNode.id;
      this.props.OnClickShowModelWindow();
    }
     if (event.target.id == 'add') {
       this.funDispatch = this.props.onClickAddNestedCategory;
       this.currentCatalogyId = event.target.parentNode.id;
       this.props.OnClickShowModelWindow();
     }
     if (event.target.id == 'remove') {
       this.currentCatalogyId = event.target.parentNode.id;
       this.props.onClickRemove(this.currentCatalogyId);
     }
     if (event.target.id == 'category') {
       this.props.onClickAddCurrentCategoryId(event.target.parentNode.id);
     }
     event.stopImmediatePropagation();
   }
  render() {
    return (
      <div>
        {this.props.visibilityModelWindow === 'show'?<ModalWindow funDispatch={this.funDispatch} currentCategoryId={this.currentCatalogyId} />:''}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
          <H1 />
          <Filter />
        </div>
        <div style={{ height: '20px', border: '1px solid', margin: '30px 10px' }}>
          <div style={{ height: '100%', width: this.props.taskDone, backgroundColor: 'darkseagreen'}}></div>
        </div>
        <section style={{ display: 'flex' }}>
          <div style={{ width: '100%' }}>
            <div>
              <InputText type="text" onChange={this.onChangeHandlerInputCategory} />
              <ButtonAdd type="button" value="Add" onClick={this.onClickHandlerCategory}></ButtonAdd>
            </div>
            <div ref={(elem) => this.container = elem} className="container-category">
              {createListHtml(this.props.categoryList, this.props.currentCategoryId)}
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <div>
              <InputText type="text" onChange={this.onChangeHandlerInputTask} />
              <ButtonAdd type="button" value="Add" onClick={this.onClickHandlerTask}></ButtonAdd>
            </div>
            <div>
              {createTaskList(this.props.taskList, this.props.onClickAddCurrentTaskId)}
            </div>
          </div>

        </section>
      </div>
    );
  }
}

const getVisibleTask = (list, filter, showDone, categoryId) => {
    var list =getTask(list, categoryId);
    if (showDone) {
      list = [...list.filter(t=>t.done)];
    }
    if(filter !== ''){
      list = [...list.filter( (t) => {
        return t.nameTask.indexOf(filter)>=0 ? true : false;
      })];
    }
  return list;
}
const getTaskDone = (list, categoryId) => {
  var list =getTask(list, categoryId);
  if (list.length > 0) {
    var doneTask = list.filter(t => t.done);
    return doneTask.length * 100 / list.length + '%';
  }
  return 0;
}

const mapStateToProps = (state) => {
  return {
    categoryList: state.storeList,
    visibilityModelWindow: state.modelWindow,
    currentCategoryId: state.currentCategoryId,
    taskList: getVisibleTask(state.storeList, state.filter, state.showDone, state.currentCategoryId),
    taskDone: getTaskDone(state.storeList, state.currentCategoryId),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAddCategory: (name) => {
      dispatch(addCategory(name));
    },
    onClickAddTask: (name, id) => {
      dispatch(addTask(name, id));
    },
    onClickRename: (newName, id) => {
      dispatch(renameCategory(newName, id));
    },
    onClickRemove:(id)=> {
      dispatch(removeCategory(id));
    },
    onClickAddCurrentCategoryId: (id) => {
      dispatch(addCurrentCategoryId(id));
    },
    onClickAddCurrentTaskId: (id) => {
      dispatch(addCurrentTaskId(id));
    },
    onClickAddNestedCategory: (nestedName, id) => {
      dispatch(addNestedCategory(nestedName, id));
    },
    OnClickShowModelWindow: () => {
      dispatch(visibilityModelWindow('show'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
