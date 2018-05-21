import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import editIcon from '../images/edit-icon.png';

const ButtonEdit = styled.button`
  height:20px;
  width:20px;
  margin-left: 10px;
  background-size: cover;
  background-image: url(${editIcon});
  cursor: pointer;
`;


const Ol = styled.ol`
  list-style-type: none;
`;

const Li = styled.li`  
  padding: 3px;
`;


export default function createTaskList(list, onClickAddCurrentTaskId) {
  if (list.length>0) {
    var htmlTree = <Ol> {list.map(function (value) {
      return <Li key={value.id} id={value.id}>
        <input type="checkbox" checked={value.done} />
        {value.nameTask}
        <Link to={`/editpage?${value.nameTask}`}>
          <ButtonEdit id="edit" onClick={()=>{onClickAddCurrentTaskId(value.id)}} />
        </Link>;
      </Li>
    }
    )} </Ol>;
  }
  return htmlTree || '';
}
