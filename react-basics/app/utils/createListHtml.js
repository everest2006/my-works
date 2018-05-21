import React from 'react';
import styled from 'styled-components';

import addIcon from '../images/add-icon.png';
import removeIcon from '../images/remove-icon.png';
import editIcon from '../images/edit-icon.png';

const ButtonAdd = styled.button`
  height:20px;
  width:20px;
  background-size: cover;
  background-image: url(${addIcon});
  float: right;
  cursor: pointer;
`;
const ButtonEdit = styled.button`
  height:20px;
  width:20px;
  margin-left: 10px;
  background-size: cover;
  background-image: url(${editIcon});
  cursor: pointer;
`;
const ButtonRemove = styled.button`
  height:20px;
  width:20px;
  background-size: cover;
  background-image: url(${removeIcon});
  float: right;
  cursor: pointer;
`;
const Span = styled.span`  
  cursor: pointer;
  :hover{
    color: red;
  }
`;

const Ol = styled.ol`
  list-style-type: none;
`;

const Li = styled.li`  
  padding: 3px;
`;
const styles = { textDecoration: 'underline' };


export default function createListHtml(store, currentId) {
  if (store.length>0) {
    var htmlTree = <Ol> {store.map(function (value) {
      return <Li key={value.id} id={value.id}>
                <Span
                  style={value.id === +currentId ? styles : {}}
                  id="category"
                >
                  {value.nameCategory}
                </Span>
                <ButtonEdit id="edit" />
                <ButtonAdd id="add" />
                <ButtonRemove id="remove" />
                {createListHtml(value.nestedCategory, currentId)}
            </Li>;
    })} </Ol>;
  }
  return htmlTree || '';
}
