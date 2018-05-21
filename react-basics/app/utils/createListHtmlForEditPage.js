import React from 'react';
import styled from 'styled-components';

import moveIcon from '../images/move.png';



const ButtonMove = styled.button`
  height:20px;
  width:20px;
  background-size: cover;
  background-image: url(${moveIcon});
  float: right;
  cursor: pointer;
`;
const Span = styled.span`  
  
`;

const Ol = styled.ol`
  list-style-type: none;
`;

const Li = styled.li`  
  padding: 3px;
`;
const styles = { textDecoration: 'underline' };


export default function createListHtmlForEditPage(store, currentId) {
  if (store.length>0) {
    var htmlTree = <Ol> {store.map(function (value) {
      return <Li key={value.id} id={value.id}>
                <Span
                  style={value.id === +currentId ? styles : {}}
                  id="category"
                >
                  {value.nameCategory}
                </Span>
        {value.id !== +currentId ? <ButtonMove id="move" /> : ''}
        {createListHtmlForEditPage(value.nestedCategory, currentId)}
      </Li>;
    })} </Ol>;
  }
  return htmlTree || '';
}

