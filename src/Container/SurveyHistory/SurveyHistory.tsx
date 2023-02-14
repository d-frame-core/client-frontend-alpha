import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./SurveyHistory.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
const SurveyHistory = () => {
  return (
    <div>
      <>{Sidebar(5)}</>
      <div className="surveyHistoryOuterBox">
        <div className="surveyHistoryHeader">
          <div className="surveyHistoryTitle">Survey History</div>
          <div className="surveyHistoryHeaderButtons">
            <button className="surveyHistoryEditButton">
              <EditIcon /> Edit
            </button>

            <DeleteForeverOutlinedIcon
              className="surveyHistoryDeleteButton"
              sx={{ fontSize: "6vh" }}
            />
          </div>
        </div>
        <div className="surveyHistoryContent">
          <div className="surveyHistoryContentTitle">
            <div className="surveyHistorySno">S.NO</div>
            <div className="surveyHistorySurveyName">Survey Name</div>
            <div className="surveyHistoryTotalQues">Total Ques</div>
            <div className="surveyHistoryTotalRes">Total Res</div>
            <div className="surveyHistoryTotalReward">Total Reward</div>
            <div className="surveyHistoryTimePeriod">Time Period</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyHistory;
