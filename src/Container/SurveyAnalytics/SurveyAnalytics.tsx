import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./SurveyAnalytics.css";
import { useParams } from "react-router-dom";
const SurveyAnalytics = () => {
  const { _id } = useParams();
  console.log(_id);
  return (
    <div>
      <>{Sidebar(11)}</>
      <div className="surveyAnalyticsBox">
        <div className="surveyAnalyticsGreyBox">
          <div className="surveyAnalyticsHeader">
            <div className="surveyAnalyticsHeaderTitleMain">
              Survey Analytics
            </div>
          </div>
          <div className="surveyAnalyticsBody"></div>
        </div>
      </div>
    </div>
  );
};

export default SurveyAnalytics;
