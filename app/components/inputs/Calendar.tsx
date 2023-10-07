'use client';

import { 
  DateRange, 
  Range, 
  RangeKeyDict
} from 'react-date-range';

interface CalendarProps {
  value: Range,
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar = ({
  value,
  onChange,
  disabledDates
}: CalendarProps) => {
  return ( 
    <DateRange
      rangeColors={['#0071c2']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
   );
}
 
export default Calendar;
