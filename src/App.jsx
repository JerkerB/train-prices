import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DayPicker from './DayPicker';
import ConnectionList from './ConnectionList';
import fetchConnections from './fetch-connections';
import './style.css';

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
      <h1>Train prices</h1>
      <DayPicker value={dateTime} onDayChange={setDateTime} />
      <ConnectionList departure={departure} arrival={arrival} connections={connections.departure} />
      <ConnectionList departure={arrival} arrival={departure} connections={connections.arrival} />
    </div>
  );
}

export default App;
