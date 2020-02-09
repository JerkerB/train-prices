import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import stations from './stations';
import fetchConnections from './fetch-connections';

function stationName(stationShortCode) {
  const station = stations.find(station => station.stationShortCode === stationShortCode);
  return station ? station.stationName : '';
}

const Wrapper = styled.div`
  min-width: 400px;
`;

function ConnectionList({ departure, arrival, dateTime }) {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    (async () => {
      setConnections(await fetchConnections(departure, arrival, dateTime));
    })();
  }, [departure, arrival, dateTime]);

  return (
    <Wrapper>
      <h2>{`${stationName(departure)} - ${stationName(arrival)}`}</h2>
      {connections.map(conn => (
        <div key={conn.id}>
          <h3>{`${conn.departureTime} - ${conn.arrivalTime} ${conn.price}`}</h3>
        </div>
      ))}
      <a target="_blank" href={`https://uusi.vr.fi/kertalippu-menomatkan-hakutulokset?from=${departure}&to=${arrival}&outbound=${dateTime}`}>
        Siirry varaamaan liput
      </a>
    </Wrapper>
  );
}

export default ConnectionList;
