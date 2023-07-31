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
import KycUser from "./Container/admin/Kyc";
import UserHelp from "./Container/admin/userHelp";
import UserLearn from "./Container/admin/userLearn";
import ClientHelp from "./Container/admin/clientHelp";
import ClientLearn from "./Container/admin/clientLearn";
import UserAnalytics from "./Container/admin/userAnalytics";
import ClientAnalytics from "./Container/admin/clientAnalytics";
import ClientInfo from "./Container/admin/clientInfo";
import ClientVerification from "./Container/admin/clientVerification";
import SingleUser from "./Container/admin/singleUser";
import SingleClient from "./Container/admin/singleClient";
import SingleCampaign from "./Container/admin/singleCampaign";
import CampaignInfo from "./Container/admin/campaignInfo";
import Register1 from "./Container/Registration/Register";
import ClientCampaignVerify from "./Container/admin/clientCampaignVerify";
import ClientSurveyVerify from "./Container/admin/clientSurveyVerification";
import Reverification from "./Container/admin/reverification";
import AdminWallet from "./Container/admin/adminWallet";
import CampaignDetails from "./Container/CampaignDetails/Details";
import AdminLogin from "./Container/Authentication/login";

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
          <Route path="/campaign-details" element={<CampaignDetails />} />
          <Route path="/create-survey" element={<CreateSurvey />} />
          <Route path="/survey-history" element={<SurveyHistory />} />
          <Route path="/survey-analytics/*" element={<SurveyAnalytics />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/userKyc" element={<KycUser />} />
          <Route path="/admin/userHelp" element={<UserHelp />} />
          <Route path="/admin/userLearn" element={<UserLearn />} />
          <Route path="/admin/clientHelp" element={<ClientHelp />} />
          <Route path="/admin/clientLearn" element={<ClientLearn />} />
          <Route path="/admin/userAnalytics" element={<UserAnalytics />} />
          <Route path="/admin/clientAnalytics" element={<ClientAnalytics />} />
          <Route path="/admin/clientInfo" element={<ClientInfo />} />
          <Route
            path="/admin/clientVerification"
            element={<ClientVerification />}
          />
          <Route path="/admin/singleUser" element={<SingleUser />} />
          <Route path="/admin/singleClient" element={<SingleClient />} />
          <Route path="/admin/singleCampaign" element={<SingleCampaign />} />
          <Route path="/admin/campaignInfo" element={<CampaignInfo />} />
          <Route
            path="/admin/ClientCampaignVerify"
            element={<ClientCampaignVerify />}
          />
          <Route
            path="/admin/ClientSurveyVerify"
            element={<ClientSurveyVerify />}
          />
          <Route path="/register1" element={<Register1 />} />
          <Route path="/admin/reverification" element={<Reverification />} />
          <Route path="/admin/adminWallet" element={<AdminWallet />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminWallet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
