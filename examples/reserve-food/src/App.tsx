import React from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type {} from "@mui/x-date-pickers/themeAugmentation";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import Drawer from "./components/Drawer";
import { Calendar, Day } from '@hmmftg/mui-jalali-calendar';
import Header from "./components/Header";
import ReserveButton from "./components/ReserveButton";

const theme = createTheme({
  direction: "rtl"
});

const neon = [
  "#fbf8cc",
  "#fde4cf",
  "#ffcfd2",
  "#f1c0e8",
  "#cfbaf0",
  "#a3c4f3",
  "#90dbf4",
  "#8eecf5",
  "#98f5e1",
  "#b9fbc0",
];

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function Rtl(props: { children?: React.ReactNode | undefined }) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

const App: React.FC = () => {
  const date = new Date();
  const minDate = new Date(new Date(date).setMonth(date.getMonth() - 3));
  const maxDate = new Date(new Date(date).setMonth(date.getMonth() + 1));
  const menuItems = [
    {
      id: "calendar",
      label: "رزرو غذا",
      content: (
        <Calendar
          dayComponent={(props) => (
            <Day 
              {...props} 
              colors={neon} 
              dayComponent={ReserveButton}
            />
          )}
          headerComponent={Header}
          minDate={minDate}
          maxDate={maxDate}
        />
      ),
      icon: <CalendarMonthIcon />,
    },
    {
      id: "login",
      label: "ورود",
      content: <Typography>خوش آمدید</Typography>,
      icon: <LoginIcon />,
    },
    {
      id: "logout",
      label: "خروج",
      content: <Typography>شما خارج شدید</Typography>,
      icon: <LogoutIcon />,
    },
  ];

  return (
    <Rtl>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Drawer menuItems={menuItems} defaultItemId="calendar" />
        </ThemeProvider>
      </CacheProvider>
    </Rtl>
  );
};

export default App;
