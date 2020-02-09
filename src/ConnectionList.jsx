import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import stations from './stations';
import fetchConnections from './fetch-connections';
import Spinner from './Spinner';
import Connection from './Connection';

function stationName(stationShortCode) {
  const station = stations.find(station => station.stationShortCode === stationShortCode);
  return station ? station.stationName : '';
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
`;

const Connections = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    min-width: 360px;
  }
`

function ConnectionList({ departure, arrival, dateTime }) {
  const [connections, setConnections] = useState();

  useEffect(() => {
    (async () => {
      setConnections();
      setConnections(await fetchConnections(departure, arrival, dateTime));
    })();
  }, [departure, arrival, dateTime]);

  let connectionList = <Spinner />;
  let info = <div>Haetaan...</div>;

  if (connections) {
    connectionList = (
      <Connections>
        {connections.map(connection => (
          <Connection key={connection.id} connection={connection} />
        ))}
      </Connections>
    );
    info = <a target="_blank" href={`https://uusi.vr.fi/kertalippu-menomatkan-hakutulokset?from=${departure}&to=${arrival}&outbound=${dateTime}`}>
      Siirry varaamaan liput
    </a>
  }

  return (
    <Wrapper>
      <h2>{`${stationName(departure)} - ${stationName(arrival)}`}</h2>
      {connectionList}
      {info}
    </Wrapper>
  );
}

export default ConnectionList;
