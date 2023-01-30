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

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/help" element={<Help />} />
          <Route path="/learnmore" element={<LearnMore />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/datapool" element={<DataPool />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
