import React from 'react';
import styled from 'styled-components';
import ConnectionList from './ConnectionList';
import stations from './stations';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function ConnectionPrices({ departure, arrival, connections, date }) {
  return (
    <Wrapper>
      <ConnectionList departure={departure} arrival={arrival} connections={connections.departure} date={date} />
      <ConnectionList departure={arrival} arrival={departure} connections={connections.arrival} date={date} />
    </Wrapper>
  );
}

export default ConnectionPrices;
