import { Backdrop, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/sidebar/Sidebar";
import "./CreateSurvey.css";
const CreateSurvey = () => {
  const [surveyName, setSurveyName] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [surveyResource, setSurveyResource] = useState("");
  const surveyQuestions = [
    {
      questionName: "",
      questionOption1: "",
      questionOption2: "",
    },
  ];
  const inputFields = [];
  const numberOfQuestions: any[] = [
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [formopen, setFormopen] = useState(false);
  const [nextpage, setNextpage] = useState(false);
  const questionsData = [{}];
  const [numberOfQuestionsSelected, setNumberOfQuestionsSelected] =
    useState("");
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
    {
      surveyName: "Amazon",
      totalQues: "10",
      totalRes: "12",
      statusCampaign: "Ongoing",
      startDate: "12/01/23",
      endDate: "6/05/23",
    },
  ];
  // console.log(surveyQuestions);
  const fields = [];
  for (let i = 0; i < parseInt(numberOfQuestionsSelected); i++) {
    fields.push(
      <div key={i} className="fieldInputDiv">
        <input
          type="text"
          placeholder={"Question " + (i + 1) + ""}
          className="fieldInputSurveyName"
          // value={surveyQuestions[i].questionName}
          onChange={(e) => {
            surveyQuestions[i].questionName = e.target.value;
          }}
        />
        <div className="fieldInputSurveyInputBlock">
          <input
            type="text"
            placeholder={"Option 1"}
            className="fieldInputSurveyNameInputField"
            // value={surveyQuestions[i].questionOption1}
            onChange={(e) => {
              surveyQuestions[i].questionOption1 = e.target.value;
            }}
          />
          <input
            type="text"
            placeholder={"Option 2"}
            className="fieldInputSurveyNameInputField"
            // value={surveyQuestions[i].questionOption2}
            onChange={(e) => {
              surveyQuestions[i].questionOption2 = e.target.value;
            }}
          />
        </div>
        <hr />
      </div>
    );
  }

  const submitFormFunction = () => {
    setNextpage(true);
    setFormopen(false);
    console.log(
      surveyName,
      surveyDescription,
      startDate,
      endDate,
      surveyResource
    );
    console.log(surveyQuestions);
  };
  return (
    <div>
      <>{Sidebar(7)}</>
      <div className="createSurveyBox">
        <div className="createSurveyGreyBox">
          <div className="createSurveyHeader">
            <div className="createSurveyHeaderTitleMain">Create Survey</div>
            <button
              className="createSurveyHeaderButton"
              onClick={() => setFormopen(true)}
            >
              + Create
            </button>
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
        <Backdrop
          open={formopen}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          className="backdrop"
        >
          <div className="createSurveyForm">
            <div className="createSurveyFormHeader">
              <div className="createSurveyHeaderTitle">Create Survey</div>
              <button
                className="closeButtonCreateSurveyPage"
                onClick={() => setFormopen(false)}
              >
                X
              </button>
            </div>
            <Divider />
            <form className="createSurveyFormBody">
              <TextField
                id="standard-basic"
                label="Survey Name"
                variant="standard"
                sx={{ left: "2vw", width: "90%" }}
                {...register("surveyName")}
                onChange={(e) => setSurveyName(e.target.value)}
                required
              />
              <TextField
                id="standard-basic"
                label="Survey Description"
                variant="standard"
                sx={{ left: "2vw", width: "90%" }}
                {...register("surveyDescription")}
                onChange={(e) => setSurveyDescription(e.target.value)}
                required
              />
              <TextField
                id="standard-basic"
                label="Survey Resource DFT"
                variant="standard"
                type={"number"}
                sx={{ left: "2vw", width: "90%" }}
                {...register("surveyResource")}
                onChange={(e) => setSurveyResource(e.target.value)}
                required
              />
              <TextField
                id="standard-basic"
                variant="standard"
                label="Start Date"
                placeholder="Start Date"
                type={"date"}
                sx={{ left: "2vw", width: "90%" }}
                {...register("startDate")}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <TextField
                id="standard-basic"
                label="End Date"
                variant="standard"
                type={"date"}
                sx={{ left: "2vw", width: "90%" }}
                {...register("endDate")}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
              <TextField
                sx={{ left: "2vw", width: "90%" }}
                select
                label="Total Survey Questions"
                defaultValue={false}
                {...register("Ad Type")}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select the Number of Questions"
                variant="standard"
                onChange={(e) => {
                  setNumberOfQuestionsSelected(e.target.value);
                }}
                onClick={() => {
                  setNextpage(true);
                  for (
                    let i = 0;
                    i < parseInt(numberOfQuestionsSelected) - 1;
                    i++
                  ) {
                    surveyQuestions.push({
                      questionName: "",
                      questionOption1: "",
                      questionOption2: "",
                    });
                  }
                }}
              >
                {numberOfQuestions.map((option) => (
                  <option
                    className="optionsInNumberOfQuestion"
                    key={option.label}
                    value={option.value}
                  >
                    {option.label} Questions
                  </option>
                ))}
              </TextField>
              {nextpage && (
                // <div>
                //   {[...Array(numberOfQuestionsSelected)].map((e, i) => (
                //     <div>{i}</div>
                //   ))}
                <div className="inputFieldOuterDiv">{fields}</div>
                // </div>
              )}
            </form>
            <Divider />
            <button
              className="submitSurveyButton"
              type="submit"
              onClick={submitFormFunction}
            >
              Submit
            </button>
          </div>
        </Backdrop>
      </div>
    </div>
  );
};

export default CreateSurvey;
