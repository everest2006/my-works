import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { visibilityModelWindow } from './actions';

const ButtonSave = styled.button`
  margin-top: 20px;
  margin-left: 64px;
`;

const ButtonCancel = styled.button`
  margin-left: 22px;
`;
const Input = styled.input`
  margin-top: 16px;
  margin-left: 12px;
  background: lightgrey;
`;

const Div = styled.div`
  position: absolute;
  top: 1%;
  left: 47%;
  width: 200px;
  height: 88px;
  border: 1px solid;
  background: #607D8B;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;  
`;


class ModalWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onChangeHandlerInput = this.onChangeHandlerInput.bind(this);
  }
  onChangeHandlerInput(event){
    this.inputValue = event.target.value;
  };
  onClickSave() {
    if((this.inputValue !== undefined) && (this.inputValue !== '')) {
      this.props.funDispatch(this.inputValue, this.props.currentCategoryId);
      this.props.OnClickHide();
    }
  }
  onClickCancel() {
    this.props.OnClickHide();
  }
  render() {
    return(
      <Wrapper>
        <Div>
          <Input onChange={this.onChangeHandlerInput} />
          <ButtonSave onClick={this.onClickSave}>save</ButtonSave>
          <ButtonCancel onClick={this.onClickCancel}>cancel</ButtonCancel>
        </Div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryList: state.storeList,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    OnClickHide: () => {
      dispatch(visibilityModelWindow('hide'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
