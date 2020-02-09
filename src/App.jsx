import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import DayPicker from './DayPicker';
import StationSelect from './StationSelect';
import ConnectionList from './ConnectionList';
import stations from './stations';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: strech;
  justify-content: space-between;
  margin: auto;
  max-width: 800px;
`
const Title = styled.h1`
  align-self: center;
`
const ConnectionLists = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

function App() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureDate, setDepartureDate] = useState(moment().format('YYYY-MM-DD'));
  const [arrivalDate, setArrivalDate] = useState(moment().format('YYYY-MM-DD'));

  let departureConnectionList, arrivalConnectionList;
  if (departure && arrival) {
    departureConnectionList = <ConnectionList departure={departure} arrival={arrival} date={departureDate} />;
    arrivalConnectionList = <ConnectionList departure={arrival} arrival={departure} date={arrivalDate} />;
  }

  return (
    <Wrapper>
      <Title>Junien hinnat</Title>
      <FlexWrapper>
        <StationSelect placeHolder="Mistä" stations={stations} onChange={setDeparture} value={departure} />
        <StationSelect placeHolder="Minne" stations={stations} onChange={setArrival} value={arrival} />
      </FlexWrapper>
      <FlexWrapper>
        <ConnectionLists>
          <DayPicker title="Meno" value={departureDate} onDayChange={setDepartureDate} />
          {departureConnectionList}
        </ConnectionLists>
        <ConnectionLists>
          <DayPicker title="Paluu" value={arrivalDate} onDayChange={setArrivalDate} />
          {arrivalConnectionList}
        </ConnectionLists>
      </FlexWrapper>
    </Wrapper>
  );
}

export default App;
