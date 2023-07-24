import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./SurveyAnalytics.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../../components/context/Context";
const SurveyAnalytics = () => {
  const navigate = useNavigate();
  const [particularSurveyAnalyticsData, setParticularSurveyAnalyticsData] =
    useState<any>(null);
  const { token } = useContext(MyContext);
  const { surveyAnalyticsId } = useParams();
  // console.log(surveyAnalyticsId);
  async function getSurveyAnalytics() {
    const _tokenn = token || localStorage.getItem("token");
    await axios
      .get(`http://localhost:3000/survey/${surveyAnalyticsId}/analysis`, {
        headers: {
          Authorization: `Bearer ${_tokenn}`,
        },
      })
      .then((response) => {
        setParticularSurveyAnalyticsData(response.data);
      });
  }
  const checkMetamaskConnection = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected, redirect to root route
      navigate("/");
    }
  };
  useEffect(() => {
    checkMetamaskConnection();
    getSurveyAnalytics();
  }, []);
  useEffect(() => {
    console.log(particularSurveyAnalyticsData);
  }, [getSurveyAnalytics]);
  useEffect(() => {
    // console.log(particularSurveyAnalyticsData);
  }, [particularSurveyAnalyticsData]);
  useEffect(() => {
    setParticularSurveyAnalyticsData(particularSurveyAnalyticsData);
  }, [getSurveyAnalytics]);
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
          <div className="surveyAnalyticsBody">
            {particularSurveyAnalyticsData?.map((item: any, index: number) => {
              return (
                <div className="surveyAnalyticsBodyBox">
                  <div className="surveyAnalyticsBodyQuestionSection">
                    <div className="surveyAnalyticsBodyQuestionIndex">
                      Question {index + 1}:-{" "}
                    </div>
                    <div className="surveyAnalyticsBodyQuestionName">
                      {item.question}
                    </div>
                  </div>
                  <div className="surveyAnalyticsBodyAnswerSection">
                    {item.allAnswers.map((item: any) => {
                      return (
                        <div className="surveyAnalyticsBodyOptionsSection">
                          <div className="surveyAnalyticsBodyOptionNameTitle">
                            Option Name :
                          </div>
                          <div className="surveyAnalyticsBodyOptionName">
                            {item.option.length > 12
                              ? item.option.slice(0, 12) + "..."
                              : item.option}
                          </div>
                          <div className="surveyAnalyticsBodyOptionCountTitle">
                            Count :
                          </div>
                          <div className="surveyAnalyticsBodyOptionCount">
                            {item.count}
                          </div>
                          <div className="surveyAnalyticsBodyOptionPercentageTitle">
                            Percentage :
                          </div>
                          <div className="surveyAnalyticsBodyOptionPercentage">
                            {item.percentage}%
                          </div>
                        </div>
                      );
                    })}
                    <div className="surveyAnalyticsMostChosenAnswerSection">
                      <div className="surveyAnalyticsMostChosenAnswerStats">
                        <div className="surveyAnalyticsMostChosenAnswerTitle">
                          Most Chosen Answer :
                        </div>
                        <div className="surveyAnalyticsMostChosenAnswerName">
                          {item.mostChosenAnswers[0]}
                        </div>
                      </div>
                      <div className="surveyAnalyticsTotalRespondants">
                        <div className="surveyAnalyticsTotalRespondantsTitle">
                          Total Respondants :
                        </div>
                        <div className="surveyAnalyticsTotalRespondantsCount">
                          {item.userCount} responses
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyAnalytics;
