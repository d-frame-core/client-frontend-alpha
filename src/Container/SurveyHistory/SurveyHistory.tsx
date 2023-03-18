import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./SurveyHistory.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../../components/context/Context";
const SurveyHistory = () => {
  const { _id, token } = useContext(MyContext);
  async function getAllPastSurveys() {
    const id = _id || localStorage.getItem("id");
    const _tokenn = token || localStorage.getItem("token");
    console.log(id, _tokenn);
    await axios
      .get("http://localhost:3000/survey/expired/client/c", {
        headers: {
          Authorization: `Bearer ${_tokenn}`,
          clientId: "6402e7d78851d6105b175bd2",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <>{Sidebar(7)}</>
      <div className="surveyHistoryOuterBox">
        <div className="surveyBoxFlex">
          <div className="surveyTitle">Survey</div>
          <div className="surveyIconsBox">
            <button className="editIconSurveyPage">
              <EditIcon /> Edit
            </button>

            <DeleteForeverOutlinedIcon
              className="deleteSurveyPage"
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
