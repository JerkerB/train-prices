import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ConnectionList from './ConnectionList';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function ConnectionPrices({ departure, arrival, dateTime }) {
  let departureConnectionList, arrivalConnectionList;
  if (departure && arrival) {
    departureConnectionList = <ConnectionList departure={departure} arrival={arrival} dateTime={dateTime} />;
    arrivalConnectionList = <ConnectionList departure={arrival} arrival={departure} dateTime={dateTime} />;
  }
  return (
    <Wrapper>
      {departureConnectionList}
      {arrivalConnectionList}
    </Wrapper>
  );
}

export default ConnectionPrices;
