import React, { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersCalendarHeaderProps, PickersDayProps } from "@mui/x-date-pickers";
import { faIR } from "date-fns-jalali/locale";

export interface CalendarProps {
  dayComponent?: React.ElementType<PickersDayProps>;
  headerComponent?: React.ElementType<PickersCalendarHeaderProps>;
  minDate?: Date;
  maxDate?: Date;
  value?: Date;
  onChange?: (date: Date | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  dayComponent,
  headerComponent,
  minDate,
  maxDate,
  value: propValue,
  onChange: propOnChange,
}) => {
  const [internalValue, setInternalValue] = useState<Date>(new Date());
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : internalValue;

  const handleChange = (newValue: Date | null) => {
    if (!isControlled) {
      setInternalValue(newValue || new Date());
    }
    if (propOnChange) {
      propOnChange(newValue);
    }
  };

  return (
    <div
      className="calendar"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <LocalizationProvider
        dateAdapter={AdapterDateFnsJalali}
        adapterLocale={faIR}
      >
        <DateCalendar
          sx={{
            flexGrow: 1,
            width: "100%",
            maxHeight: "none",
            overflow: "visible",
            "& .MuiDayCalendar-header": {
              display: "none",
            },
            "& .MuiPickersSlideTransition-root": {
              flexGrow: 1,
              overflowX: "visible",
            },
          }}
          showDaysOutsideCurrentMonth
          minDate={minDate}
          maxDate={maxDate}
          value={value}
          onChange={handleChange}
          slots={{
            day: dayComponent,
            calendarHeader: headerComponent,
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Calendar;