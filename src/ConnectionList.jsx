import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 400px;
`;

function ConnectionList({ departure, arrival, connections }) {
  return (
    <Wrapper>
      <h2>{`${departure} - ${arrival}`}</h2>
      {connections.map(conn => (
        <div key={conn.id}>
          <h3>{`${conn.departureTime} - ${conn.arrivalTime} ${conn.price}`}</h3>
        </div>
      ))}
    </Wrapper>
  );
}

export default ConnectionList;
