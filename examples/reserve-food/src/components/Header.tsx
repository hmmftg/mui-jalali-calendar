import React from "react";
import {
  Select,
  MenuItem,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";
import { Stack, useMediaQuery, useTheme } from "@mui/system";
import {
  format,
  addMonths,
  setMonth,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
  getMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  getDay,
} from "date-fns-jalali";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const arabicDigits = ["٠", "١", "٢", "٣", "۴", "۵", "۶", "٧", "٨", "٩"];
const convertToArabicNumerals = (numberString: string) => {
  let result = "";
  for (const char of numberString) {
    if (char >= "0" && char <= "9") {
      result += arabicDigits[parseInt(char)];
    } else {
      result += char;
    }
  }
  return result;
};

function getMonthsOfYear() {
  const now = new Date();
  const start = startOfYear(now);
  const end = endOfYear(now);
  return eachMonthOfInterval({ start, end });
}

function getDaysOfWeek() {
  const now = new Date();
  const start = startOfWeek(now);
  const end = endOfWeek(now);
  return eachDayOfInterval({ start, end });
}

const Header: React.FC<PickersCalendarHeaderProps> = (props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const months = getMonthsOfYear();
  const days = getDaysOfWeek();

  const handleMonthChange = (
    event:
      | React.ChangeEvent<Omit<HTMLInputElement, "value"> & { value: number }>
      | (Event & { target: { value: number; name: string } })
  ) => {
    const newMonth = event.target.value; //parseInt(event.target.value, 10);
    props.onMonthChange(setMonth(props.currentMonth, newMonth));
  };

  return (
    <Grid container direction="row" sx={{ marginBottom: "10px" }}>
      <Grid
        size={50}
        direction="column"
        sx={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Stack direction={"row"} alignSelf={"canter"}>
          <Typography
            sx={{ fontSize: { xs: "1rem", lg: "1.4rem" }, paddingTop: "6px", paddingRight: "6px" }}
          >
            انتخاب ماه
          </Typography>
          <Select
            value={getMonth(props.currentMonth)}
            onChange={handleMonthChange}
            sx={{ "& .MuiSelect-select": { padding: "4px" } }}
          >
            {months.map((month, index) => (
              <MenuItem key={index} value={index}>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", lg: "1.4rem" },
                    color:
                      getMonth(month) === getMonth(new Date())
                        ? "blue"
                        : "black",
                  }}
                >
                  {convertToArabicNumerals(format(month, "MMMM yyyy"))}
                </Typography>
              </MenuItem>
            ))}
          </Select>
          {getMonth(props.currentMonth) !== getMonth(new Date()) && (
            <Button
              onClick={() => {
                props.onMonthChange(new Date());
              }}
            >
              <Typography align="right" sx={{ fontSize: { xs: "1rem", lg: "1.4rem" } }}>
                برو به ماه جاری
              </Typography>
            </Button>
          )}
        </Stack>
      </Grid>
      <Grid size={50}>
        <Stack
          direction={"row"}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <IconButton
            onClick={() =>
              props.onMonthChange(addMonths(props.currentMonth, -1))
            }
          >
            <NavigateNextIcon />
          </IconButton>
          {days.map((day) => {
            if (isSmallScreen && (getDay(day)===4 ||getDay(day)===5)) {
              return <></>
            }
            return (
              <Typography
                sx={{
                  fontSize: { xs: "1rem", lg: "1.4rem" },
                  width: "15%",
                  marginRight: "5px",
                  textAlign: "center",
                }}
                key={`${day.getDay()}`}
              >
                {format(day, "EEEE")}
              </Typography>
            );
          })}
          <IconButton
            onClick={() =>
              props.onMonthChange(addMonths(props.currentMonth, 1))
            }
          >
            <NavigateBeforeIcon />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Header;
