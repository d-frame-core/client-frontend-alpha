import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./sidebar.css";
import df from "../../assets/dframe.png";
import Header from "../../components/header/Header";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";

export default function Sidebar() {
  return (
    <div>
      <Header />
      <div className="re1"></div>
      <img src={df} className="dframe" alt="dframe" />
      <div className="t1">D Frame</div>
      <div className="t2"></div>
      <div className="re2"></div>
      <div className="el1"></div>

      <div className="i4">
        <CalendarMonthOutlinedIcon />
      </div>
      <div className="i5">
        <AssessmentOutlinedIcon />
      </div>
      <div className="i6">
        <SettingsOutlinedIcon />
      </div>
      <div className="i7">
        <QuestionMarkOutlinedIcon />
      </div>
      <div>
        <NavLink to="/Profile">
          <div className="p1">Profile</div>
          <div className="i2">
            <AccountBoxOutlinedIcon />
          </div>
        </NavLink>
        <NavLink to="/Wallet">
          <div className="w1">Wallet</div>
          <div className="i3">
            <AccountBalanceWalletOutlinedIcon />
          </div>
        </NavLink>

        <NavLink to="/Datapool">
          <div className="d1">Data Pool</div>
        </NavLink>
        <NavLink to="/Campaigns">
          <div className="r1">Campaigns</div>
          <div className="ie1">
            <SearchTwoToneIcon />
          </div>
        </NavLink>
        <NavLink to="/Ads">
          <div className="a1">Ads History</div>
        </NavLink>
        <NavLink to="/Settings">
          <div className="pe1">Settings</div>
          <div className="i6">
            <SettingsOutlinedIcon />
          </div>
        </NavLink>
        <div className="n1">Need Help with D Frame?</div>
        <NavLink to="/Help">
          <div>
            <div className="n2">Go to help center</div>
            <div className="re3"></div>
          </div>
        </NavLink>
        <NavLink to="/LearnMore">
          <div className="n3">Learn More</div>
          <div className="n4"></div>
        </NavLink>
        <div className="n5"></div>
        <div className="n6"></div>
      </div>
    </div>
  );
}
