import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangeProps {
  onDatesChange: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker: React.FC<DateRangeProps> = ({ onDatesChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDatesChange = () => {
    if (startDate && endDate) {
      onDatesChange(startDate, endDate);
    }
  };

  return (
    <div className="date-picker-range">

      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        dateFormat="yyyy-MM-dd"
        className="date-picker start"
        onCalendarClose={handleDatesChange}
      />

      <DatePicker
        selectsEnd
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        dateFormat="yyyy-MM-dd"
        className="date-picker end"
        onCalendarClose={handleDatesChange}
      />
    </div>
  );
};

export default DateRangePicker;
