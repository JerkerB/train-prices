import React from 'react';
import styled from 'styled-components';
import stations from './stations';

function stationName(stationShortCode) {
  const station = stations.find(station => station.stationShortCode === stationShortCode);
  return station ? station.stationName : '';
}

const Wrapper = styled.div`
  min-width: 400px;
`;

function ConnectionList({ departure, arrival, connections, date }) {
  return (
    <Wrapper>
      <h2>{`${stationName(departure)} - ${stationName(arrival)}`}</h2>
      {connections.map(conn => (
        <div key={conn.id}>
          <h3>{`${conn.departureTime} - ${conn.arrivalTime} ${conn.price}`}</h3>
        </div>
      ))}
      <a target="_blank" href={`https://uusi.vr.fi/kertalippu-menomatkan-hakutulokset?from=${departure}&to=${arrival}&outbound=${date}`}>
        Siirry varaamaan liput
      </a>
    </Wrapper>
  );
}

export default ConnectionList;
