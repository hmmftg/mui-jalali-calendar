import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { isAfter, getDay } from "date-fns-jalali";
import DoneIcon from "@mui/icons-material/Done";
import React, { useState } from "react";
import { ReserveDialog } from "./ReserveDialog";

const absent="-";
const weekDays = [
  {
    breakfast: "نیمرو",
    salad: "سالاد فصل",
    breakfastPrice: "۲۴ هزار تومان",
    saladPrice: "۸۰ هزار توامن",
  },
  {
    breakfast: "املت",
    salad: absent,
    breakfastPrice: "۳۰ هزار تومان",
    saladPrice: "۸۰ هزار توامن",
  },
  {
    breakfast: "سالامی",
    salad: "سالاد فصل",
    breakfastPrice: "۴۵ هزار تومان",
    saladPrice: "۸۰ هزار توامن",
  },
  {
    breakfast: "نان و پنیر",
    salad: absent,
    breakfastPrice: "۱۸ هزار تومان",
    saladPrice: "۸۰ هزار توامن",
  },
  { breakfast: absent, salad: absent, breakfastPrice: null, saladPrice: null },
  { breakfast: absent, salad: absent, breakfastPrice: null, saladPrice: null },
  {
    breakfast: "پنینی",
    salad: absent,
    breakfastPrice: "۴۰ هزار تومان",
    saladPrice: "۸۰ هزار توامن",
  },
];

const breakfastTitle= "صبحانه";
const saladTitle = "سالاد";

const ReserveButton: React.FC<PickersDayProps> = ({
  day,
  today,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const upComing = isAfter(day, new Date()) || today;
  const min1 = 0;
  const min2 = 10;
  const max1 = 25;
  const max2 = 30;
  const max3 = 1;
  let rand1 = min1 + Math.round(Math.random() * (max1 - min1));
  let rand2 = min1 + Math.round(Math.random() * (max1 - min1));
  let rand3 = min2 + Math.round(Math.random() * (max2 - min2));
  let rand4 = min2 + Math.round(Math.random() * (max2 - min2));
  const rand5 = min1 + Math.round(Math.random() * (max3 - min1));
  const rand6 = min1 + Math.round(Math.random() * (max3 - min1));
  if (weekDays[getDay(day)].breakfast === absent) {
    rand1 = 0;
    rand3 = 0;
  }
  if (weekDays[getDay(day)].salad === absent) {
    rand2 = 0;
    rand4 = 0;
  }

  const [countBreakfast, setCountBreakfast] = useState(
    upComing ? rand1 : rand3
  );
  const [countSalad, setCountSalad] = useState(upComing ? rand2 : rand4);
  const [hasBreakFast, setHasBreakfast] = useState(
    rand5 === 1 && weekDays[getDay(day)].breakfast !== absent
  );
  const [hasSalad, setHasSalad] = useState(
    rand6 === 1 && weekDays[getDay(day)].salad !== absent
  );
  const [reservedBreakfast, setReservedBreakfast] = useState(
    hasBreakFast ? 1 + ((rand1 + rand3) % 2) : 0
  );
  const [reservedSalad, setReservedSalad] = useState(
    hasSalad ? 1 + ((rand2 + rand4) % 2) : 0
  );
  const [openBreakfast, setOpenBreakfast] = React.useState(false);
  const [openSalad, setOpenSalad] = React.useState(false);
  const handleClickBreakfast = () => {
    setOpenBreakfast(true);
  };
  const handleClickSalad = () => {
    setOpenSalad(true);
  };
  if (isSmallScreen && (getDay(day)===4 ||getDay(day)===5)) {
    return <Box></Box>
  }

  const handleCloseBreakfast = (value: number) => {
    setOpenBreakfast(false);
    if (hasBreakFast) {
      setCountBreakfast(countBreakfast - reservedBreakfast + value);
    } else if (value > 0) {
      setCountBreakfast(countBreakfast + value);
    }
    setHasBreakfast(value > 0);
    setReservedBreakfast(value);
  };
  const handleCloseSalad = (value: number) => {
    setOpenSalad(false);
    if (hasSalad) {
      setCountSalad(countSalad - reservedSalad + value);
    } else if (value > 0) {
      setCountSalad(countSalad + value);
    }
    setHasSalad(value > 0);
    setReservedSalad(value);
  };
  return (
    <Box sx={{width:"100%"}}>
      <ButtonGroup variant="text" orientation={isSmallScreen?"vertical":"horizontal"} fullWidth disabled={!upComing}>
        <Tooltip
          title={
            <Stack>
              <Typography>
                قیمت هر وعده {weekDays[getDay(day)].breakfastPrice}
              </Typography>
              <Typography>تعداد رزرو های شما {reservedBreakfast}</Typography>
            </Stack>
          }
        >
          <Box sx={{width:{xs:"20%",lg:"50%"}}}>
            <Button
              disabled={weekDays[getDay(day)].breakfast === absent}
              onClick={handleClickBreakfast}
            >
              <Badge
                badgeContent={countBreakfast}
                color={upComing ? "success" : "info"}
                sx={{ fontSize: { xs: "0.8rem", lg: "2rem" } }}
              >
                {hasBreakFast && <DoneIcon  sx={{fontSize:{xs:"1rem",lg:"2rem"}}} />}
                <Stack direction={"column"}>
                  {!isSmallScreen && <Typography>{breakfastTitle}</Typography>}
                  <Typography sx={{fontSize: { xs: "0.8rem", lg: "1.4rem" }}}>{weekDays[getDay(day)].breakfast}</Typography>
                </Stack>
              </Badge>
            </Button>
          </Box>
        </Tooltip>
        <Tooltip
          title={
            <Stack>
              <Typography>
                قیمت هر وعده {weekDays[getDay(day)].saladPrice}
              </Typography>
              <Typography>تعداد رزرو های شما {reservedSalad}</Typography>
            </Stack>
          }
        >
          <Box sx={{width:{xs:"20%",lg:"50%"}}}>
            <Button
              disabled={weekDays[getDay(day)].salad === absent}
              onClick={handleClickSalad}
            >
              <Badge
                badgeContent={countSalad}
                color={upComing ? "success" : "info"}
                sx={{ fontSize: { xs: "0.8rem", lg: "2rem" } }}
              >
                {hasSalad && <DoneIcon sx={{fontSize:{xs:"1rem",lg:"2rem"}}} />}
                <Stack direction={"column"}>
                  {!isSmallScreen && <Typography>{saladTitle}</Typography>}
                  <Typography sx={{fontSize: { xs: "0.8rem", lg: "1.4rem" }}}>{weekDays[getDay(day)].salad}</Typography>
                </Stack>
              </Badge>
            </Button>
          </Box>
        </Tooltip>
      </ButtonGroup>
      <ReserveDialog
        open={openBreakfast}
        price={weekDays[getDay(day)].breakfastPrice}
        selectedValue={reservedBreakfast}
        onClose={handleCloseBreakfast}
        title={breakfastTitle}
        name={weekDays[getDay(day)].breakfast}
        date={day}
        type="breakfast"
      />
      <ReserveDialog
        open={openSalad}
        price={weekDays[getDay(day)].saladPrice}
        selectedValue={reservedSalad}
        onClose={handleCloseSalad}
        title={saladTitle}
        name={weekDays[getDay(day)].salad}
        date={day}
        type="salad"
      />
    </Box>
  );
};

export default ReserveButton;
