import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { Box } from "@mui/material";
import df from "../../assets/dframe.png";
import Header from "../../components/header/Header";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
// import Header from '../Header/Header';
import PortraitIcon from "@mui/icons-material/Portrait";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

export default function Sidebar() {
  const [actvieState, setActiveState] = useState(1);
  const handleButtonClick = (index: any) => {
    setActiveState(index);
  };
  return (
    <>
      <div>
        <Header />
        <img src={df} className="dframe" alt="dframe profile" />
        <div className="dftext">DFrame</div>

        <Box className="sidebar">
          <div className="item">
            <NavLink to="/profile" style={{ textDecoration: "none" }}>
              <div className={actvieState === 5 ? "active" : "notActive"}>
                <PortraitIcon className="ic" />
                Profile
              </div>
            </NavLink>
            <NavLink to="/Wallet" style={{ textDecoration: "none" }}>
              <div className={actvieState === 2 ? "active" : "notActive"}>
                <AccountBalanceWalletIcon className="ic" />
                Wallet
              </div>
            </NavLink>
            <NavLink to="/Campaigns" style={{ textDecoration: "none" }}>
              <div className={actvieState === 3 ? "active" : "notActive"}>
                <SearchOutlinedIcon className="ic" />
                Campaigns
              </div>
            </NavLink>
            <NavLink to="/data-pool" style={{ textDecoration: "none" }}>
              <div className={actvieState === 4 ? "active" : "notActive"}>
                <CalendarMonthOutlinedIcon className="ic" />
                Data Pool
              </div>
            </NavLink>
            <NavLink to="/ads" style={{ textDecoration: "none" }}>
              <div className={actvieState === 5 ? "active" : "notActive"}>
                <AssessmentOutlinedIcon className="ic" />
                Ads History
              </div>
            </NavLink>
            <NavLink to="/settings" style={{ textDecoration: "none" }}>
              <div className={actvieState === 6 ? "active" : "notActive"}>
                <SettingsIcon className="ic" />
                Settings
              </div>
            </NavLink>
          </div>
        </Box>
        <div className="rectangle">
          <img src="" alt="" />
          <div className="help">Need help with Dframe?</div>
          <NavLink to="/help">
            <button className="helpButton">Go to Help</button>
          </NavLink>
        </div>

        <NavLink to="/learnmore" className="">
          <div className="learnMore">Learn More</div>
        </NavLink>
      </div>
    </>
  );
}
