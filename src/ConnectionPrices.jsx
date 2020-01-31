import React from 'react';
import styled from 'styled-components';
import ConnectionList from './ConnectionList';
import stations from './stations';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function ConnectionPrices({ departureStationName, arrivalStationName, connections }) {
  return (
    <Wrapper>
      <ConnectionList departure={departureStationName} arrival={arrivalStationName} connections={connections.departure} />
      <ConnectionList departure={arrivalStationName} arrival={departureStationName} connections={connections.arrival} />
    </Wrapper>
  );
}

export default ConnectionPrices;
