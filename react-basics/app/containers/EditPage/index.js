import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import createListHtmlForEditPage from '../../utils/createListHtmlForEditPage';
import { moveTask,addCurrentCategoryId, addChangeTask } from './actions';
import getTask from '../../utils/getTask';

const ButtonSave = styled.button`
  float: right;
  margin-right: 20px;
`;
const ButtonCancel = styled.button`
  float: right;
`;
const Textarea = styled.textarea`
  margin-top: 16px;
  margin-left: 12px;
  background: lightgrey;
  width: 97%;
  height: 100%;
`;
const Section = styled.section`
  displayL: flex;
`;
const Div = styled.div`
  margin-left: 12px;
  margin-top: 20px;
`;
const Input = styled.input`
  margin-top: 16px;
  margin-left: 12px;
  height: 20px;
  background: lightgrey;
`;
class EditPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.changedTask = {};
    this.handleContainerEnter = this.handleContainerEnter.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.onClickHandlerSave = this.onClickHandlerSave.bind(this);
  }
  componentDidMount() {
    this.container.addEventListener("click", this.handleContainerEnter);
  }

  componentWillUnmount() {
    this.container.removeEventListener("click", this.handleContainerEnter);
  }

  handleContainerEnter (event) {
    if (event.target.id == 'move') {
      this.newCatalogyId = event.target.parentNode.id;
      this.props.onClickMoveTask(this.props.currentCategoryId, this.newCatalogyId,  this.props.currentTaskId);
      this.props.onClickAddCurrentCategoryId(this.newCatalogyId);
    }
    event.stopImmediatePropagation();
  }
  onClickHandler(event){
    this.changedTask.done = event.target.checked;
  };
  handleChangeTextarea(event){
    this.changedTask.description = event.target.value;
  };
  handleChangeInput(event){
    this.changedTask.nameTask = event.target.value;
  };
  onClickHandlerSave(event){
    if (this.changedTask){
      this.props.onChangeTask(this.changedTask, this.props.currentCategoryId, this.props.currentTaskId);
    }
  };

  render() {
    return (
      <div>
        <h1>{window.location.search.slice(1)}</h1>
        <Section>
          <div ref={(elem) => this.container = elem} className="container-category" style={{ width: '100%' }}>
            {createListHtmlForEditPage(this.props.categoryList, this.props.currentCategoryId)}
          </div>
          <div style={{ width: '100%' }}>
            <div>
              <Link to={`/`}><ButtonCancel>Cancel</ButtonCancel></Link>
              <Link to={`/`}><ButtonSave onClick={this.onClickHandlerSave}>Save changes</ButtonSave></Link>
            </div>
            <Input type="text" onChange={this.handleChangeInput} />
            <Div>
              <input type="checkbox" onChange={this.onClickHandler} />
              <span>Done</span>
            </Div>
            <Textarea onChange={this.handleChangeTextarea} />
          </div>
        </Section>
      </div>
    );
  }
}

const getCurrentTask = (list, categoryId, taskId) => {
  var list =getTask(list, categoryId);
  var task = list.filter(t=>t.id === taskId);
  task[0];
  return task[0];
}

const mapStateToProps = (state) => {
  return {
    categoryList: state.storeList,
    currentCategoryId: state.currentCategoryId,
    currentTaskId: state.currentTaskId,
    currentTask: getCurrentTask(state.storeList, state.currentCategoryId, state.currentTaskId),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickMoveTask:(currentCategoryId, newCategoryId, currentTask)=> {
      dispatch(moveTask(currentCategoryId, newCategoryId, currentTask));
    },
    onClickAddCurrentCategoryId: (id) => {
      dispatch(addCurrentCategoryId(id));
    },
    onChangeTask: (obj, categoryId, taskId) => {
      dispatch(addChangeTask(obj, categoryId, taskId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
