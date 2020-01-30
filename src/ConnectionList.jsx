import React from 'react';

function ConnectionList({ departure, arrival, connections }) {
  return (
    <div>
      <h2>{`${departure} - ${arrival}`}</h2>
      {connections.map(conn => (
        <div key={conn.id}>
          <h3>{`${conn.departureTime} - ${conn.arrivalTime} ${conn.price}`}</h3>
        </div>
      ))}
    </div>
  );
}

export default ConnectionList;
