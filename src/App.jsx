import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DayPicker from './DayPicker';
import StationSelect from './StationSelect';
import ConnectionPrices from './ConnectionPrices';

import stations from './stations';

function App() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [dateTime, setDateTime] = useState(moment().format('YYYY-MM-DD'));

  return (
    <div>
      <h1>Junien hinnat</h1>
      <StationSelect placeHolder="Mistä" stations={stations} onChange={setDeparture} value={departure} />
      <StationSelect placeHolder="Minne" stations={stations} onChange={setArrival} value={arrival} />
      <DayPicker value={dateTime} onDayChange={setDateTime} />
      <ConnectionPrices departure={departure} arrival={arrival} dateTime={dateTime} />
    </div>
  );
}

export default App;
