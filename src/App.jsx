import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/fi';
import 'react-day-picker/lib/style.css';
import './style.css';

function fetchConnections(departure, arrival, dateTime) {
  return axios.post('https://backend-v3-prod.vrfi.prodvrfi.vrpublic.fi/', {
    operationName: 'getConnections',
    variables: { outbound: { departure, arrival, dateTime, showDepartedJourneys: false }, passengers: [{ type: 'ADULT' }] },
    query:
      'query getConnections($outbound: ConnectionInput!, $passengers: [PassengerInput!]!) {\n  connections(input: $outbound) {\n    ... on NoConnections {\n      noConnectionsReason\n      __typename\n    }\n    ... on ConnectionList {\n      items {\n        id\n        duration\n        transferCount\n        departure {\n          station\n          time\n          __typename\n        }\n        services\n        arrival {\n          station\n          time\n          __typename\n        }\n        legs {\n          id\n          services\n          departure {\n            station\n            time\n            __typename\n          }\n          arrival {\n            station\n            time\n            __typename\n          }\n          duration\n          train {\n            id\n            type\n            label\n            __typename\n          }\n          __typename\n        }\n        offer(passengers: $passengers) {\n          ... on Offer {\n            id\n            price\n            __typename\n          }\n          ... on NoOffer {\n            noOfferReason\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n'
  });
}

function parseConnectionsFromResponse(response) {
  return response.data.data.connections.items.map(conn => ({
    id: conn.id,
    duration: conn.duration,
    departureTime: moment(conn.departure.time).format('HH:mm'),
    arrivalTime: moment(conn.arrival.time).format('HH:mm'),
    price: (conn.offer.price / 100).toLocaleString('fi-FI', { style: 'currency', currency: 'EUR' })
  }));
}

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
      const departureConnections = await fetchConnections(departure, arrival, dateTime);
      const arrivalConnections = await fetchConnections(arrival, departure, dateTime);
      setConnections({
        departure: parseConnectionsFromResponse(departureConnections),
        arrival: parseConnectionsFromResponse(arrivalConnections)
      });
    })();
  }, [departure, arrival, dateTime]);

  return (
    <div>
      <h1>Train prices</h1>
      <div>
        <p>Valitse päivä:</p>
        <button onClick={() => setDateTime(moment(dateTime).add(-1, 'days'))}>{'<'}</button>
        <DayPickerInput
          formatDate={formatDate}
          parseDate={parseDate}
          format='LL'
          value={`${formatDate(dateTime, 'LL', 'fi')}`}
          dayPickerProps={{
            locale: 'fi',
            localeUtils: MomentLocaleUtils,
            disabledDays: { before: new Date() }
          }}
          onDayChange={day => setDateTime(moment(day).format('YYYY-MM-DD'))}
        />
        <button onClick={() => setDateTime(moment(dateTime).add(1, 'days'))}>{'>'}</button>
      </div>
      <div>
        <h2>{`${departure} - ${arrival}`}</h2>
        {connections.departure.map(conn => (
          <div key={conn.id}>
            <h3>{`${conn.departureTime} - ${conn.arrivalTime} ${conn.price}`}</h3>
          </div>
        ))}
      </div>
      <div>
        <h2>{`${arrival} - ${departure}`}</h2>
        {connections.arrival.map(conn => (
          <div key={conn.id}>
            <h3>{`${conn.departureTime} - ${conn.arrivalTime} ${conn.price}`}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
