import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DayPicker from './DayPicker';
import ConnectionList from './ConnectionList';
import fetchConnections from './fetch-connections';

const ConnectionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function App() {
  const [departure, setDeparture] = useState('TKU');
  const [arrival, setArrival] = useState('VMO');
  const [dateTime, setDateTime] = useState(moment().format('YYYY-MM-DD'));
  const [connections, setConnections] = useState({
    departure: [],
    arrival: []
  });

  useEffect(() => {
    (async () => {
      setConnections({
        departure: await fetchConnections(departure, arrival, dateTime),
        arrival: await fetchConnections(arrival, departure, dateTime)
      });
    })();
  }, [departure, arrival, dateTime]);

  return (
    <div>
      <h1>Junien hinnat</h1>
      <DayPicker value={dateTime} onDayChange={setDateTime} />
      <ConnectionsWrapper>
        <ConnectionList departure={departure} arrival={arrival} connections={connections.departure} />
        <ConnectionList departure={arrival} arrival={departure} connections={connections.arrival} />
      </ConnectionsWrapper>
    </div>
  );
}

export default App;
