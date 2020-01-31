import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DayPicker from './DayPicker';
import StationSelect from './StationSelect';
import ConnectionPrices from './ConnectionPrices';
import fetchConnections from './fetch-connections';
import stations from './stations';

function stationName(stationShortCode) {
  const station = stations.find(station => station.stationShortCode === stationShortCode);
  return station ? station.stationName : '';
}

function App() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [dateTime, setDateTime] = useState(moment().format('YYYY-MM-DD'));
  const [connections, setConnections] = useState();

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

  let priceContent;

  if (connections) {
    priceContent = <ConnectionPrices departureStationName={stationName(departure)} arrivalStationName={stationName(arrival)} connections={connections} />;
  }

  return (
    <div>
      <h1>Junien hinnat</h1>
      <StationSelect placeHolder="Mistä" stations={stations} onChange={setDeparture} value={departure} />
      <StationSelect placeHolder="Minne" stations={stations} onChange={setArrival} value={arrival} />
      <DayPicker value={dateTime} onDayChange={setDateTime} />
      {priceContent}
    </div>
  );
}

export default App;
