import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './style.css';

function App() {
  const [departure, setDeparture] = useState('TKU');
  const [arrival, setArrival] = useState('VMO');
  const [dateTime, setDateTime] = useState('2020-01-29');
  const [prices, setPrices] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.post('https://backend-v3-prod.vrfi.prodvrfi.vrpublic.fi/', {
        operationName: 'getConnections',
        variables: { outbound: { departure, arrival, dateTime, showDepartedJourneys: false }, passengers: [{ type: 'ADULT' }] },
        query:
          'query getConnections($outbound: ConnectionInput!, $passengers: [PassengerInput!]!) {\n  connections(input: $outbound) {\n    ... on NoConnections {\n      noConnectionsReason\n      __typename\n    }\n    ... on ConnectionList {\n      items {\n        id\n        duration\n        transferCount\n        departure {\n          station\n          time\n          __typename\n        }\n        services\n        arrival {\n          station\n          time\n          __typename\n        }\n        legs {\n          id\n          services\n          departure {\n            station\n            time\n            __typename\n          }\n          arrival {\n            station\n            time\n            __typename\n          }\n          duration\n          train {\n            id\n            type\n            label\n            __typename\n          }\n          __typename\n        }\n        offer(passengers: $passengers) {\n          ... on Offer {\n            id\n            price\n            __typename\n          }\n          ... on NoOffer {\n            noOfferReason\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n'
      });
      console.log(response);
    })();
  }, [departure, arrival]);

  const renderPrices = () => {
    return (
      <div className="price-grid">
        {Object.keys(prices).map(key => (
          <div>
            <h2>{key}</h2>
            {prices[key].map(day => (
              <div>{`${day.time} ${day.price}`}</div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Train prices</h1>
      {renderPrices()}
    </div>
  );
}

export default App;
