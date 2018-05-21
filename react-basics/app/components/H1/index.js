import React from 'react';
import styled from 'styled-components';

import h1Styles from './h1Styles';

const StyledH1 = styled.h1`${h1Styles}`;

function H1() {
  return(
    <StyledH1>To-Do List</StyledH1>
  );
}

export default H1;
