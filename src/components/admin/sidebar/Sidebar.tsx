// import { Box, Divider } from "@mui/material";
// import { useState } from "react";
// import "./sidebar.css";
// import { NavLink } from "react-router-dom";
// import df from "../../../assets/dframe.png";
// import PortraitIcon from "@mui/icons-material/Portrait";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
// import SearchIcon from "@mui/icons-material/Search";
// import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
// import PollIcon from "@mui/icons-material/Poll";
// import AddchartIcon from "@mui/icons-material/Addchart";
// export default function Sidebar(index: any) {
//   const [toggleState, setToggleState] = useState(index);

//   const toggleTab = (index: any) => {
//     setToggleState(index);
//   };

//   return (
//     <>
//       <div>
//         <img src={df} className="dframe" alt="" />

//         <Box className="side">
//           <div className="item">
//             <NavLink
//               to="/profile"
//               style={{ textDecoration: "none" }}
//               onClick={() => (index = 1)}
//             >
//               <div className={toggleState === 1 ? "act1" : "notActive"}>
//                 <PortraitIcon className="ic" />
//                 Profile
//               </div>
//             </NavLink>

//             <NavLink
//               to="/wallet"
//               style={{ textDecoration: "none", color: "white", width: "18vw" }}
//               onClick={() => (index = 2)}
//             >
//               <div className={toggleState === 2 ? "act1" : "notActive"}>
//                 <AccountBalanceWalletOutlinedIcon className="ic" />
//                 Wallet
//               </div>
//             </NavLink>
//             <NavLink
//               to="/datapool"
//               style={{ textDecoration: "none", color: "white", width: "18vw" }}
//               onClick={() => (index = 2)}
//             >
//               <div className={toggleState === 3 ? "act1" : "notActive"}>
//                 <CalendarTodayIcon className="ic" />
//                 Data Pool
//               </div>
//             </NavLink>
//             <NavLink
//               to="/campaigns"
//               style={{ textDecoration: "none", color: "white", width: "18vw" }}
//               onClick={() => (index = 2)}
//             >
//               <div className={toggleState === 4 ? "act1" : "notActive"}>
//                 <SearchIcon className="ic" />
//                 Campaigns
//               </div>
//             </NavLink>
//             <NavLink
//               to="/ads"
//               style={{ textDecoration: "none", color: "white", width: "18vw" }}
//               onClick={() => (index = 2)}
//             >
//               <div className={toggleState === 5 ? "act1" : "notActive"}>
//                 <InsertChartOutlinedOutlinedIcon className="ic" />
//                 Ads History
//               </div>
//             </NavLink>
//             <NavLink
//               to="/create-survey"
//               style={{ textDecoration: "none", color: "white", width: "18vw" }}
//               onClick={() => (index = 2)}
//             >
//               <div className={toggleState === 6 ? "act1" : "notActive"}>
//                 <AddchartIcon className="ic" />
//                 Create Survey
//               </div>
//             </NavLink>
//             <NavLink
//               to="/survey-history"
//               style={{ textDecoration: "none", color: "white", width: "18vw" }}
//               onClick={() => (index = 2)}
//             >
//               <div className={toggleState === 7 ? "act1" : "notActive"}>
//                 <PollIcon className="ic" />
//                 Survey History
//               </div>
//             </NavLink>
//             <NavLink
//               to="/settings"
//               style={{ textDecoration: "none", color: "white", width: "18vw" }}
//               onClick={() => (index = 2)}
//             >
//               <div className={toggleState === 8 ? "act1" : "notActive"}>
//                 <SettingsOutlinedIcon className="ic" />
//                 Settings
//               </div>
//             </NavLink>
//           </div>
//         </Box>
//       </div>
//     </>
//   );
// }
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import GradingIcon from '@mui/icons-material/Grading';
import HelpIcon from '@mui/icons-material/Help';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import df from "../../../assets/dframe.png";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader >
          {
            open?
            <IconButton onClick={handleDrawerClose}>
              <img src={df} width={55} alt="dframe" />
              <h5 style={{marginLeft:"25px",marginRight:"25px"}}>D Frame</h5>
            </IconButton>:
            <IconButton onClick={handleDrawerOpen} >
              <img src={df} width={45} alt="dframe"/>
              
            </IconButton>
          }
        </DrawerHeader>

        <Divider />

        <List sx={{background:"black",color:"white",borderRadius:"10px"}}>
          <Box
          sx={{
            justifyContent: open ? 'initial' : 'center',
            marginLeft:"10px",
            fontSize:"20px",
          }}
          >User</Box>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AccountCircleIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="User Info" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <GradingIcon  sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="User KYC" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AutoGraphIcon sx={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText primary="Analytics" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HelpIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Edit Help" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LocalLibraryIcon sx={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText primary="Edit Learn" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          
        </List>

        <Divider />

        <List sx={{background:"black",borderRadius:"10px",color:"white"}}>
          <Box
          sx={{
            justifyContent: open ? 'initial' : 'center',
            marginLeft:"5px",
            fontSize:"20px",
          }}
          >Client</Box>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AccountCircleIcon sx={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText primary="Client Info" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <GradingIcon sx={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText primary="Verification" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AutoGraphIcon sx={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText primary="Analytics" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HelpIcon sx={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText primary="Edit Help" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LocalLibraryIcon sx={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText primary="Edit Learn" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          
        </List>

      </Drawer>
    </Box>
  );
}
