import React, { useState } from "react";
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  ListItemButton,
  ListItemIcon,
  AppBar,
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Stack,
  useTheme,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import SaladAnimation from "../assets/images/salad-animation.gif";
import { useMediaQuery } from "@mui/system";

interface MenuItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon: React.JSX.Element;
}

interface DrawerProps {
  menuItems: MenuItem[];
  defaultItemId: string;
}

const Drawer: React.FC<DrawerProps> = ({ menuItems, defaultItemId }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(0);
  const [selectedItemId, setSelectedItemId] = useState(defaultItemId);

  const handleMenuItemClick = (id: string) => {
    setSelectedItemId(id);
  };

  const selectedMenuItem = menuItems.find((item) => item.id === selectedItemId);

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid
            direction="row"
            spacing={3}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                color="error"
                textAlign={"center"}
                fontSize={"2.5rem"}
              >
                سامانه رزرو کافه پویا
              </Typography>
              <Box
                sx={{
                  backgroundImage: `url(${"https://pooya.ir/wp-content/uploads/2024/06/pooyaCo-logo-white.webp"})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "75px",
                  height: "55px",
                }}
              ></Box>
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
      <MuiDrawer
        variant="permanent"
        //open={open}
        sx={{
          width: "10%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "10%",
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8px",
            marginTop: "10%",
            marginLeft: "20%",
            backgroundImage: `url(${SaladAnimation})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            width: { xs: "30px", lg: "75px" },
            height: { xs: "30px", lg: "75px" },
          }}
        ></Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                padding: { xs: "0px", lg: "15px" },
              }}
            >
              <ListItemButton
                selected={item.id === selectedItemId}
                onClick={() => handleMenuItemClick(item.id)}
                sx={{
                  padding: { xs: "5px", lg: "10px" },
                }}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                {!isSmallScreen && 
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: "1.6rem" }}>
                        {item.label}
                      </Typography>
                    }
                  />
                }
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </MuiDrawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingRight: { xs: "1px", lg: "24px" },
          paddingLeft: { xs: "1px", lg: "24px" },
          marginTop: "65px",
          width: "90%",
          height: "95%",
        }}
      >
        <Box sx={{ flexGrow: 1, width: "100%", height: "90%" }}>
          {selectedMenuItem ? (
            selectedMenuItem.content
          ) : (
            <Typography>No content selected</Typography>
          )}
        </Box>
        <Box sx={{ width: "100%", height: "10%" }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={{ backgroundColor: "lightblue" }}
          >
            <BottomNavigationAction label="گزارش" icon={<RestoreIcon />} />
            <BottomNavigationAction label="پیشنهادات" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="رزرو غذا" icon={<ArchiveIcon />} />
          </BottomNavigation>
        </Box>
      </Box>
    </Box>
  );
};

export default Drawer;
