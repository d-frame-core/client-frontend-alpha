import { Backdrop, Divider, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MyContext } from "../../components/context/Context";
import Sidebar from "../../components/sidebar/Sidebar";
import "./CreateSurvey.css";
const CreateSurvey = () => {
  const { _id } = useContext(MyContext);
  const [surveyName, setSurveyName] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [surveyResource, setSurveyResource] = useState("");
  const surveyQuestions = [
    {
      questionName: "",
      questionOption1: "",
      questionOption2: "",
    },
  ];
  const [totalQues, setTotalQues] = useState([
    {
      questionNumber: 0,
      title: "",
      options: [] as any,
      optionGroups: [],
    },
  ]);
  const [option, setOption] = useState("");
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
  const [option1,setOption1] = useState("")
  const [option2,setOption2] = useState("")
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
  function handleData(i:any){
    if (option1 && option2) {
      if (i===parseInt(numberOfQuestionsSelected)-1) {
        console.log('last')
      }
      setTotalQues((prev) => {
        return {
          ...prev,
          [i-1]: {
            ...prev[i-1],
            options: [option1,option2],
          },
        };
      });
      console.log('option1',option1)
      console.log('option2',option2)
      console.log('i',i)
    }
  }
  const fields = [];
  for (let i = 0; i < parseInt(numberOfQuestionsSelected); i++) {
    fields.push(
      <div key={i} className="fieldInputDiv">
           <input
          type="text"
          placeholder={"Question " + (i + 1) + ""}
          className="fieldInputSurveyName"
     
          // value={surveyQuestions[i].questionName}
          onClick={()=>handleData(i)}
          onChange={(e) => {
            setTotalQues((prev) => {
              return {
                ...prev,
                [i]: {
                  ...prev[i],
                  title: e.target.value,
                  questionNumber: i + 1,
                  optionGroups: [],
                },

              };

            });
          }}
          />
        <div className="fieldInputSurveyInputBlock">
          <input
            type="text"
            placeholder={"Option 1"}
            className="fieldInputSurveyNameInputField"
           
            // value={surveyQuestions[i].questionOption1}
            onChange={(e) => {
              // setTotalQues((prev) => {
              //   return {
              //     ...prev,
              //     [i]: {
              //       ...prev[i],
              //       options: [e.target.value],
              //     },
              //   };
              // });
              setOption1(e.target.value)
            }}
          />
          <input
            type="text"
            placeholder={"Option 2"}
            className="fieldInputSurveyNameInputField"
         
            // value={surveyQuestions[i].questionOption2}
            // onChange={(e) => {
            //   const input = e.target.value;
            //   setTotalQues((prev) => {
            //     return {
            //       ...prev,
            //       [i]: {
            //         ...prev[i],
            //         options: [...prev[i].options, input],
            //       },
            //     };
            //   });
            //   console.log(input);
            // }}
            onChange={(e) => {
              setOption2(e.target.value);
            }}
            
            
          />
        </div>
  
        <hr />
      </div>
    );
  }

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = new Date(event.target.value);
    setStartDate(newDate);
  };
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setEndDate(newDate);
  };
  const submitFormFunction = async () => {
    setNextpage(true);
    setFormopen(false);
    const index=parseInt(numberOfQuestionsSelected)
    console.log("index",index);
  //   setTotalQues((prev) => {
  //     return {
  //       ...prev,
  //       [index-1]: {
  //         ...prev[index-1],
  //         options: [option1,option2],
  //       },
  //     };
  // });
    var resultArray = Object.keys(totalQues).map(function(personNamedIndex:any){
      let person = totalQues[personNamedIndex];
      // do something with person
      return person;
  });
    const cliendId = _id || localStorage.getItem("id");
    resultArray[index-1].options=[option1,option2]
    console.log( resultArray);
    
    await axios.post("http://localhost:3000/survey", {
      surveyName: surveyName,
      surveyDescription: surveyDescription,
      totalQues: resultArray,
      clientId: cliendId,
      statusCampaign: "Active",
      totalReward: parseInt(surveyResource),
      startDate: startDate,
      endDate: endDate,
    })
      .then((res) => {
        console.log("THEN CALLED");
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
        console.error(err);
      });
  };
  return (
    <div>
      <>{Sidebar(6)}</>
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
              <div className="lastEntry"></div>
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
                onChange={handleStartDateChange}
                required
              />
              <TextField
                id="standard-basic"
                label="End Date"
                variant="standard"
                type={"date"}
                sx={{ left: "2vw", width: "90%" }}
                {...register("endDate")}
                onChange={handleEndDateChange}
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
