import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { format, getDay } from "date-fns-jalali";
import React from "react";

const arabicDigits = ["٠", "١", "٢", "٣", "۴", "۵", "۶", "٧", "٨", "٩"];

const convertToArabicNumerals = (numberString: string) => {
  return numberString.replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit)]);
};

export interface DayProps extends PickersDayProps {
  colors: string[];
  dayComponent?: React.ComponentType<PickersDayProps>;
}

const Day: React.FC<DayProps> = (props) => {
  const {
    dayComponent: DayComponent = PickersDay,
    colors,
    day,
    outsideCurrentMonth,
    today,
    ...other
  } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dayFarsi = convertToArabicNumerals(format(day, "d"));
  const monthName = format(day, "MMMM");
  const text = `${dayFarsi}${isSmallScreen ? "" : ` ${monthName}`}`;

  // Determine colors based on day properties
  let backgroundColor = colors[(day.getDay() + 2) % colors.length];
  let borderColor = "#d0f4de";

  if (day.getDay() === 6) { // Friday in Jalali calendar
    backgroundColor = colors[1];
  }
  if (today) {
    borderColor = "#3a86ff";
  }
  if (outsideCurrentMonth) {
    backgroundColor = "#d8d8d8";
  }
  if (isSmallScreen && (getDay(day)===4 ||getDay(day)===5)) {
    return <Box></Box>
  }

  return (
    <Box
      sx={{
        position: 'relative',
        border: { xs: `1px solid ${borderColor}`, lg: `3px solid ${borderColor}` },
        backgroundColor,
        borderRadius: "15px",
        margin: { xs: "1px", lg: "5px" },
        textAlign: "center",
        height: "20%",
        width: "15%",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          borderBottom: `3px solid ${borderColor}`,
          borderRight: `3px solid ${borderColor}`,
          borderLeft: `3px solid ${borderColor}`,
          borderRadius: "12px",
          backgroundColor: "white",
          color: outsideCurrentMonth ? "gray" : "black",
          fontSize: { xs: "1rem", lg: "1.4rem" },
          height: "30%",
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {text}
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DayComponent
          day={day}
          outsideCurrentMonth={outsideCurrentMonth}
          today={today}
          {...other}
        />
      </Box>
    </Box>
  );
};

export default Day;