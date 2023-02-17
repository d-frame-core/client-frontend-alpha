import { Box, Divider } from "@mui/material";
import { useState } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import df from "../../assets/dframe.png";
import Header from "../header/Header";
import PortraitIcon from "@mui/icons-material/Portrait";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SearchIcon from "@mui/icons-material/Search";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import PollIcon from "@mui/icons-material/Poll";
import AddchartIcon from "@mui/icons-material/Addchart";
export default function Sidebar(index: any) {
  const [toggleState, setToggleState] = useState(index);

  const toggleTab = (index: any) => {
    setToggleState(index);
  };

  return (
    <>
      <div>
        <Header />
        <img src={df} className="dframe" alt="" />

        <div className="dftext">D FRAME</div>

        <Box className="side">
          <div className="item">
            <NavLink
              to="/profile"
              style={{ textDecoration: "none" }}
              onClick={() => (index = 1)}
            >
              <div className={toggleState === 1 ? "act1" : "notActive"}>
                <PortraitIcon className="ic" />
                Profile
              </div>
            </NavLink>

            <NavLink
              to="/wallet"
              style={{ textDecoration: "none", color: "white", width: "18vw" }}
              onClick={() => (index = 2)}
            >
              <div className={toggleState === 2 ? "act1" : "notActive"}>
                <AccountBalanceWalletOutlinedIcon className="ic" />
                Wallet
              </div>
            </NavLink>
            <NavLink
              to="/datapool"
              style={{ textDecoration: "none", color: "white", width: "18vw" }}
              onClick={() => (index = 2)}
            >
              <div className={toggleState === 3 ? "act1" : "notActive"}>
                <CalendarTodayIcon className="ic" />
                Data Pool
              </div>
            </NavLink>
            <NavLink
              to="/campaigns"
              style={{ textDecoration: "none", color: "white", width: "18vw" }}
              onClick={() => (index = 2)}
            >
              <div className={toggleState === 4 ? "act1" : "notActive"}>
                <SearchIcon className="ic" />
                Campaigns
              </div>
            </NavLink>
            <NavLink
              to="/ads"
              style={{ textDecoration: "none", color: "white", width: "18vw" }}
              onClick={() => (index = 2)}
            >
              <div className={toggleState === 5 ? "act1" : "notActive"}>
                <InsertChartOutlinedOutlinedIcon className="ic" />
                Ads History
              </div>
            </NavLink>
            <NavLink
              to="/create-survey"
              style={{ textDecoration: "none", color: "white", width: "18vw" }}
              onClick={() => (index = 2)}
            >
              <div className={toggleState === 6 ? "act1" : "notActive"}>
                <AddchartIcon className="ic" />
                Create Survey
              </div>
            </NavLink>
            <NavLink
              to="/survey-history"
              style={{ textDecoration: "none", color: "white", width: "18vw" }}
              onClick={() => (index = 2)}
            >
              <div className={toggleState === 7 ? "act1" : "notActive"}>
                <PollIcon className="ic" />
                Survey History
              </div>
            </NavLink>
            <NavLink
              to="/settings"
              style={{ textDecoration: "none", color: "white", width: "18vw" }}
              onClick={() => (index = 2)}
            >
              <div className={toggleState === 8 ? "act1" : "notActive"}>
                <SettingsOutlinedIcon className="ic" />
                Settings
              </div>
            </NavLink>
          </div>
        </Box>
      </div>
      <div>
        <div className="circle1"></div>
        <div className="circle2">
          <QuestionMarkIcon />
        </div>

        <div className="rectangle">
          <div className="rect3">
            <div className="text6">Need help with D Frame?</div>
            <NavLink to="/help">
              {" "}
              <button className="rect1">Go to Help Center</button>{" "}
            </NavLink>
          </div>
        </div>

        <NavLink to="/learnmore" className="">
          <div className="text9">Learn More</div>
        </NavLink>
      </div>
    </>
  );
}
