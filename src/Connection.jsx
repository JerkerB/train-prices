
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
`

function Connection({ connection }) {
  return (
    <Wrapper>
      <h3>{`${connection.departureTime} - ${connection.arrivalTime}`}</h3>
      <h3>{connection.price}</h3>
    </Wrapper>);
}

export default Connection;