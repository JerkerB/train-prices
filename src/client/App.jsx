import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [from, setFrom] = useState('TKU');
  const [to, setTo] = useState('HKI');
  const [date, setDate] = useState('20200106');
  const [prices, setPrices] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:3000/prices?from=${from}&to=${to}&date=${date}`);
      setPrices(response.data);
    })();
  }, [from, to]);

  return (
    <div>
      <h1>Train prices</h1>
    </div>
  );
}

export default App;