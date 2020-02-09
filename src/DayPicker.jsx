import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/fi';
import 'react-day-picker/lib/style.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function DayPicker({ value, onDayChange, title }) {
  return (
    <Wrapper>
      <h3>{title}</h3>
      <div>
        <button onClick={() => onDayChange(moment(value).add(-1, 'days'))}>{'<'}</button>
        <DayPickerInput
          formatDate={formatDate}
          parseDate={parseDate}
          format="LL"
          value={`${formatDate(value, 'LL', 'fi')}`}
          dayPickerProps={{
            locale: 'fi',
            localeUtils: MomentLocaleUtils,
            disabledDays: { before: new Date() }
          }}
          onDayChange={day => onDayChange(moment(day).format('YYYY-MM-DD'))}
        />
        <button onClick={() => onDayChange(moment(value).add(1, 'days'))}>{'>'}</button>
      </div>
    </Wrapper>
  );
}

export default DayPicker;
