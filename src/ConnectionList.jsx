import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import stations from './stations';
import fetchConnections from './fetch-connections';
import Spinner from './Spinner';

function stationName(stationShortCode) {
  const station = stations.find(station => station.stationShortCode === stationShortCode);
  return station ? station.stationName : '';
}

const Wrapper = styled.div`
  min-width: 400px;
`;

function ConnectionList({ departure, arrival, dateTime }) {
  const [connections, setConnections] = useState();

  useEffect(() => {
    (async () => {
      setConnections();
      setConnections(await fetchConnections(departure, arrival, dateTime));
    })();
  }, [departure, arrival, dateTime]);

  let connectionList = <Spinner />;

  if (connections) {
    connectionList =
      connections.map(conn => (
        <div key={conn.id}>
          <h3>{`${conn.departureTime} - ${conn.arrivalTime} ${conn.price}`}</h3>
        </div>
      ));
  }

  return (
    <Wrapper>
      <h2>{`${stationName(departure)} - ${stationName(arrival)}`}</h2>
      {connectionList}
      <a target="_blank" href={`https://uusi.vr.fi/kertalippu-menomatkan-hakutulokset?from=${departure}&to=${arrival}&outbound=${dateTime}`}>
        Siirry varaamaan liput
      </a>
    </Wrapper>
  );
}

export default ConnectionList;
