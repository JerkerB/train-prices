import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './style.css';

function App() {
  const [from, setFrom] = useState('TKU');
  const [to, setTo] = useState('HKI');
  const [date, setDate] = useState('20200106');
  const [prices, setPrices] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:3000/prices?from=${from}&to=${to}&date=${date}`);
      const journeys = response.data.data.journeys;
      const pricesTemp = {};
      journeys.forEach(journey => {
        const journeyDate = moment(journey.depDate).format('YYYY-DD-MM');
        if (!pricesTemp[journeyDate]) {
          pricesTemp[journeyDate] = [];
        }
        const lowestPrice = journey.products.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
        pricesTemp[journeyDate].push({ time: moment(journey.depDate).format('HH:mm'), price: lowestPrice.priceStr });
      });

      setPrices(pricesTemp);
    })();
  }, [from, to]);

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
