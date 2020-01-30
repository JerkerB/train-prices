import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DayPicker from './DayPicker';
import ConnectionList from './ConnectionList';
import fetchConnections from './fetch-connections';
import stations from './stations';

const ConnectionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledSelect = styled.select`
  height: 40px;
  padding: 5px;
  font-size: 16px;
  border: 2px solid grey;
  border-radius: 5px;
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
      <StyledSelect onChange={e => setDeparture(e.target.value)} value={departure}>
        <option value="" disabled hidden>Mistä</option>
        {stations.map(station => <option key={station.stationShortCode} value={station.stationShortCode}>{station.stationName}</option>)}
      </StyledSelect>
      <StyledSelect onChange={e => setArrival(e.target.value)} value={arrival}>
        <option value="" disabled hidden>Minne</option>
        {stations.map(station => <option key={station.stationShortCode} value={station.stationShortCode}>{station.stationName}</option>)}
      </StyledSelect>
      <DayPicker value={dateTime} onDayChange={setDateTime} />
      <ConnectionsWrapper>
        <ConnectionList departure={stationName(departure)} arrival={stationName(arrival)} connections={connections.departure} />
        <ConnectionList departure={stationName(arrival)} arrival={stationName(departure)} connections={connections.arrival} />
      </ConnectionsWrapper>
    </div>
  );
}

export default App;
