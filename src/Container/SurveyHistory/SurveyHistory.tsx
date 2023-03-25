import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./SurveyHistory.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../../components/context/Context";
const SurveyHistory = () => {
  const [oastSurveyExist, setPastSurveyExist] = useState(false);
  const { _id, token } = useContext(MyContext);
  async function getAllPastSurveys() {
    const id = _id || localStorage.getItem("id");
    const _tokenn = token || localStorage.getItem("token");
    console.log(id, _tokenn);
    await axios
      .get("http://localhost:3000/survey/expired/client/c", {
        headers: {
          Authorization: `Bearer ${_tokenn}`,
          clientid: id,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPastSurveyExist(true);
      })
      .catch((error) => {
        if (
          error.response.data.message ===
          "No expired surveys found for this client."
        ) {
          setPastSurveyExist(false);
        } else {
          console.log(error);
        }
      });
  }

  useEffect(() => {
    getAllPastSurveys();
  }, []);
  return (
    <div>
      <>{Sidebar(7)}</>
      <div className="surveyHistoryOuterBox">
        <div className="surveyBoxFlex">
          <div className="surveyTitle">Survey History</div>
        </div>
        <div className="surveyHistoryContent">
          <div className="surveyHistoryContentTitle">
            <div className="surveyHistorySno">S.No</div>
            <div className="surveyHistorySurveyName">Survey Name</div>
            <div className="surveyHistoryTotalQues">Total Questions</div>
            <div className="surveyHistoryTotalRes">Total Respondants</div>
            <div className="surveyHistoryTotalReward">Total Rewards</div>
            <div className="surveyHistoryTimePeriod">Time Period</div>
          </div>
          {!oastSurveyExist && (
            <div className="noSurveyFound">
              <h2>No Survey History Found !!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyHistory;
