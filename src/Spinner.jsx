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
  border: 10px solid #f2f2f2;
  border-top: 10px solid #cccccc;
  border-radius: 50%;
  width: ${props => props.width || "50px"};
  height: ${props => props.height || "50px"};
  animation: ${rotate} 2s linear infinite;
`;

export default Spinner;
