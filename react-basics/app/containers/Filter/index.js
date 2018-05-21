import React from 'react';
import { connect } from 'react-redux';
import Search from 'components/Search';
import Filtercontainer from 'components/Filtercontainer';
import { filter, showDoneChecked } from './actions';




class Filter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler(event){
    this.props.OnClickCheckbox(event.target.checked);
  };

  render() {
    return(
      <Filtercontainer>
        <input type="checkbox" onChange={this.onClickHandler} />
        <span>Show done</span>
        <Search onChangeFilter={this.props.onChangeHandlerFilter} />
      </Filtercontainer>
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
    OnClickCheckbox: (value) => {
      dispatch(showDoneChecked(value));
    },
    onChangeHandlerFilter: (value) => {
      dispatch(filter(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
