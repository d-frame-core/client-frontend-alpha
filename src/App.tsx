import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Help from "./Container/Help/Help";
import LearnMore from "./Container/LearnMore/LearnMore";
import Profile from "./Container/Profile/Profile";
import Wallet from "./Container/Wallet/Wallet";
import Settings from "./Container/Settings/Settings";
import Campaigns from "./Container/Campaigns/Campaigns";
import Ads from "./Container/Ads/Ads";
import DataPool from "./Container/Data Pool/DataPool";
import Registration from "./Container/Registration/Registration";
import Verify from "./Container/Verify/Verify";
import CreateSurvey from "./Container/CreateSurvey/CreateSurvey";
import SurveyHistory from "./Container/SurveyHistory/SurveyHistory";
import Connect from "./Container/Connect Wallet/Connect";
import SurveyAnalytics from "./Container/SurveyAnalytics/SurveyAnalytics";
import Dashboard from "./Container/admin/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="" element={<Connect />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/help" element={<Help />} />
          <Route path="/learnmore" element={<LearnMore />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/datapool" element={<DataPool />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/verify-email" element={<Verify />} />
          <Route path="/create-survey" element={<CreateSurvey />} />
          <Route path="/survey-history" element={<SurveyHistory />} />
          <Route path="/survey-analytics/*" element={<SurveyAnalytics />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
