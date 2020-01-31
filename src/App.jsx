import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DayPicker from './DayPicker';
import StationSelect from './StationSelect';
import ConnectionList from './ConnectionList';
import fetchConnections from './fetch-connections';
import stations from './stations';

const ConnectionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function stationName(stationShortCode) {
  const station = stations.find(station => station.stationShortCode === stationShortCode);
  return station ? station.stationName : '';
}

function App() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [dateTime, setDateTime] = useState(moment().format('YYYY-MM-DD'));
  const [connections, setConnections] = useState({
    departure: [],
    arrival: []
  });

  useEffect(() => {
    (async () => {
      if (departure && arrival) {
        setConnections({
          departure: await fetchConnections(departure, arrival, dateTime),
          arrival: await fetchConnections(arrival, departure, dateTime)
        });
      }
    })();
  }, [departure, arrival, dateTime]);

  return (
    <div>
      <h1>Junien hinnat</h1>
      <StationSelect placeHolder="Mistä" stations={stations} onChange={setDeparture} value={departure} />
      <StationSelect placeHolder="Minne" stations={stations} onChange={setArrival} value={arrival} />
      <DayPicker value={dateTime} onDayChange={setDateTime} />
      <ConnectionsWrapper>
        <ConnectionList departure={stationName(departure)} arrival={stationName(arrival)} connections={connections.departure} />
        <ConnectionList departure={stationName(arrival)} arrival={stationName(departure)} connections={connections.arrival} />
      </ConnectionsWrapper>
    </div>
  );
}

export default App;
