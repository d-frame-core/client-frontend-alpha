import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./CreateSurvey.css";
const CreateSurvey = () => {
  const details = [
    {
      surveyName: "Amazon",
      totalQues: "10",
      totalRes: "12",
      statusCampaign: "Ongoing",
      startDate: "12/01/23",
      endDate: "6/05/23",
    },

    {
      surveyName: "Apple",
      totalQues: "110",
      totalRes: "112",
      statusCampaign: "Finished",
      startDate: "11/01/23",
      endDate: "16/02/23",
    },
    {
      surveyName: "Amazon",
      totalQues: "9",
      totalRes: "12",
      statusCampaign: "Ongoing",
      startDate: "12/01/23",
      endDate: "6/05/23",
    },
    {
      surveyName: "Amazon",
      totalQues: "10",
      totalRes: "12",
      statusCampaign: "Ongoing",
      startDate: "12/01/23",
      endDate: "6/05/23",
    },
  ];
  return (
    <div>
      <>{Sidebar(7)}</>
      <div className="createSurveyBox">
        <div className="createSurveyGreyBox">
          <div className="createSurveyHeader">
            <div className="createSurveyHeaderTitle">Create Survey</div>
            <button className="createSurveyHeaderButton">+ Create</button>
          </div>
          <div className="createSurveyBody">
            <div className="createSurveyCategoriesBox">
              <div className="surveyName">Survey Name</div>
              <div className="totalQues">Total Ques</div>
              <div className="totalRes">Total Respondants</div>
              <div className="statusCampaign">Status</div>
              <div className="startDate">Start Date</div>
              <div className="endDate">End Date</div>
            </div>
            <div className="createSurveyDetails">
              {details.map((item) => {
                return (
                  <div className="surveyDetails">
                    <div className="surveyNameDetails"> {item.surveyName} </div>
                    <div className="totalQuesDetails"> {item.totalQues} </div>
                    <div className="totalResDetails"> {item.totalRes} </div>
                    <div className="statusCampaignDetails">
                      {item.statusCampaign}
                    </div>
                    <div className="startDateDetails"> {item.startDate} </div>
                    <div className="endDateDetails"> {item.endDate} </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSurvey;
