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
  const [pastSurveyData, setPastSurveyData] = useState<any[]>([]);
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
        setPastSurveyExist(true);
        setPastSurveyData(response.data);
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
  async function deleteParticularSurvey(id: any) {
    const clientId = _id || localStorage.getItem("id");
    const _tokenn = token || localStorage.getItem("token");
    const surveyId = id || localStorage.getItem("surveyId");
    await axios
      .delete(`http://localhost:3000/survey/${surveyId}`, {
        headers: {
          Authorization: `Bearer ${_tokenn}`,
        },
      })
      .then((response) => {
        console.log(response);
        getAllPastSurveys();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllPastSurveys();
  }, []);
  useEffect(() => {
    console.log(pastSurveyData);
  }, [getAllPastSurveys]);
  return (
    <div>
      <>{Sidebar(7)}</>
      <div className="surveyHistoryOuterBox">
        <div className="surveyBoxFlex">
          <div className="surveyTitle">Survey History</div>
        </div>
        <div className="surveyHistoryContent">
          <div className="surveyHistoryContentTitle">
            <div className="surveyHistorySelector">Delete</div>
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
          {oastSurveyExist &&
            pastSurveyData.map((data, index) => {
              const dateDiff = Math.ceil(
                Math.abs(
                  new Date(data.endDate).getTime() -
                    new Date(data.startDate).getTime()
                ) /
                  (1000 * 3600 * 24)
              );

              return (
                <div className="surveyHistoryContentData">
                  <div
                    className="surveyHistorySelectorIcon"
                    onClick={() => deleteParticularSurvey(data._id)}
                  >
                    <DeleteForeverOutlinedIcon
                      className="deleteIconPerSurvey"
                      sx={{
                        color: "red",
                        fontSize: "2.5rem",
                        cursor: "pointer",
                        height: "2.5rem",
                      }}
                    />
                  </div>
                  <div className="surveyHistorySnoData">{index + 1}</div>
                  <div className="surveyHistorySurveyNameData">
                    {data.surveyName}
                  </div>
                  <div className="surveyHistoryTotalQuesData">
                    {data.totalQues.length}
                  </div>
                  <div className="surveyHistoryTotalResData">0</div>
                  <div className="surveyHistoryTotalRewardData">
                    {data.totalReward}
                  </div>
                  <div className="surveyHistoryTimePeriod">
                    {dateDiff === 1 ? dateDiff + " Day" : dateDiff + " Days"}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SurveyHistory;
