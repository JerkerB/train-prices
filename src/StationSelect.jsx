import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  height: 40px;
  padding: 5px;
  font-size: 16px;
  border: 2px solid grey;
  border-radius: 5px;
`;

function StationSelect({ placeHolder, stations, onChange, value }) {
  return (
    <StyledSelect onChange={e => onChange(e.target.value)} value={value}>
      <option value="" disabled hidden>
        {placeHolder}
      </option>
      {stations.map(station => (
        <option key={station.stationShortCode} value={station.stationShortCode}>
          {station.stationName}
        </option>
      ))}
    </StyledSelect>
  );
}

export default StationSelect;
