import React from 'react';
import styled from 'styled-components';
import StyledInput from './StyledInput';
import StyledButton from './StyledButton';


import divStyles from './divStyles';

const Div = styled.div`${divStyles}`;

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChangeHandlerInput = this.onChangeHandlerInput.bind(this);
  }
  onChangeHandlerInput(e) {
    this.inputValue = e.target.value;
    this.input = e.target;
    this.props.onChangeFilter(this.inputValue);
  }
  render(){
    return (
      <Div>
        <StyledInput type="text" onChange={this.onChangeHandlerInput} placeholder="Search" />
        <StyledButton onClick={() => {this.input.value = ''; this.props.onChangeFilter(''); }}>x</StyledButton>
      </Div>
    );
  }

}

export default Search;
