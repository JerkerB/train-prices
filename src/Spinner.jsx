import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div`
  border: 16px solid #f2f2f2;
  border-top: 16px solid #cccccc;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${rotate} 2s linear infinite;
`;

export default Spinner;
