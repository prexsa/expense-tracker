import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface DatePickerProps {
  setTime: (text: string) => void;
}

export const ReactDatePicker = ({ setTime }: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleSetTime = (date: any) => {
    setTime(date);
    setStartDate(date);
  };

  return <DatePicker selected={startDate} onChange={(date: Date) => handleSetTime(date)} />;
};
