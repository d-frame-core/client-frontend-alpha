import { Backdrop, Divider, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MyContext } from "../../components/context/Context";
import Sidebar from "../../components/sidebar/Sidebar";
import "./CreateSurvey.css";
import SurveyModal from "../../components/Survey Modal/SurveyModal";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
const CreateSurvey = () => {
  const { _id, token } = useContext(MyContext);
  const [surveyName, setSurveyName] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [surveyResource, setSurveyResource] = useState("");
  let surveyQuestions = [
    {
      questionName: "",
      questionOption1: "",
      questionOption2: "",
    },
  ];
  const [fetchedData, setFetchedData] = useState([]);
  const [open, setOpen] = useState(false);
  const [totalQues, setTotalQues] = useState([
    {
      questionNumber: 0,
      title: "",
      options: [] as any,
      optionGroups: [],
    },
  ]);
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
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
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
  function handleData(i: any) {
    if (option1 && option2) {
      if (i === parseInt(numberOfQuestionsSelected) - 1) {
        console.log("last");
      }
      setTotalQues((prev) => {
        return {
          ...prev,
          [i - 1]: {
            ...prev[i - 1],
            options: [option1, option2],
          },
        };
      });
      // console.log('option1',option1)
      // console.log('option2',option2)
      // console.log('i',i)
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
          onClick={() => handleData(i)}
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
              setOption1(e.target.value);
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
  // async function fetchAllSurveys() {
  //   const id = _id || localStorage.getItem("id");
  //   const _tokenn = token || localStorage.getItem("token");
  //   const res = await axios.get("http://localhost:3000/survey/client/", {
  //     headers: {
  //       Authorization: `Bearer ${_tokenn}`,
  //       clientid: id,
  //     },
  //   });
  //   console.log("res.data");
  //   setFetchedData(res.data);
  //   console.log(fetchedData);
  // }
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
    const index = parseInt(numberOfQuestionsSelected);
    // console.log("index",index);
    //   setTotalQues((prev) => {
    //     return {
    //       ...prev,
    //       [index-1]: {
    //         ...prev[index-1],
    //         options: [option1,option2],
    //       },
    //     };
    // });
    var resultArray = Object.keys(totalQues).map(function (
      personNamedIndex: any
    ) {
      let person = totalQues[personNamedIndex];
      // do something with person
      return person;
    });
    const cliendId = _id || localStorage.getItem("id");
    resultArray[index - 1].options = [option1, option2];
    // console.log( resultArray);

    // await axios.post("http://localhost:3000/survey", {
    //   surveyName: surveyName,
    //   surveyDescription: surveyDescription,
    //   totalQues: resultArray,
    //   clientId: cliendId,
    //   statusCampaign: "Active",
    //   totalReward: parseInt(surveyResource),
    //   startDate: startDate,
    //   endDate: endDate,
    // })
    //   .then((res) => {
    //     console.log(res.data.data)
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     console.error(err);
    //   });
    const _tokenn = token || localStorage.getItem("token");
    await axios
      .post(
        "http://localhost:3000/survey",
        {
          surveyName: surveyName,
          surveyDescription: surveyDescription,
          totalQues: resultArray,
          clientId: cliendId,
          statusCampaign: "Active",
          totalReward: parseInt(surveyResource),
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${_tokenn}`,
          },
        }
      )
      .then((res) => {
        console.log("THEN CALLED");
        console.log("res", res);
        fetchAllSurveys();
        surveyQuestions = [
          {
            questionName: "",
            questionOption1: "",
            questionOption2: "",
          },
        ];
      })
      .catch((err) => {
        console.log("err", err);
        console.error(err);
      });
  };
  async function getParticularSurvey(id: any) {
    setOpen(true);
    const _tokenn = token || localStorage.getItem("token");
    const clientId = _id || localStorage.getItem("id");
    await axios
      .get(`http://localhost:3000/survey/${id}`, {
        headers: {
          Authorization: `Bearer ${_tokenn}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    border: "0",
    p: 4,
    borderRadius: "1.1vh",
  };
  async function fetchAllSurveys() {
    const id = _id || localStorage.getItem("id");
    const _tokenn = token || localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/survey/client/", {
      headers: {
        Authorization: `Bearer ${_tokenn}`,
        clientid: id,
      },
    });
    console.log("res.data");
    console.log(res);
    setFetchedData(res.data);
  }

  useEffect(() => {
    fetchAllSurveys();
  }, []);

  useEffect(() => {
    console.log(fetchedData);
  }, [fetchedData]);

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
              <div className="totalQues">Total Questions</div>
              <div className="totalRes">Rewards(DFT)</div>
              <div className="statusCampaign">Status</div>
              <div className="startDate">Start Date</div>
              <div className="endDate">End Date</div>
            </div>

            <div className="createSurveyDetails">
              {fetchedData.map((item: any) => {
                return (
                  <div
                    className="surveyDetails"
                    onClick={() => getParticularSurvey(item._id)}
                  >
                    <div className="surveyNameDetails"> {item.surveyName} </div>
                    <div className="totalQuesDetails">
                      {" "}
                      {item.totalQues.length}{" "}
                    </div>
                    <div className="totalResDetails"> {item.totalReward} </div>
                    <div className="statusCampaignDetails">
                      {item.statusCampaign}
                    </div>
                    <div className="startDateDetails">
                      {" "}
                      {item.startDate.toString().slice(0, 10)}{" "}
                    </div>
                    <div className="endDateDetails">
                      {" "}
                      {item.endDate.toString().slice(0, 10)}{" "}
                    </div>
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
                label="Rewards (DFT)"
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
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modalHeader">
              <h1 className=" modalHeaderHeading ">Survey Name</h1>
              <p className="modalHeaderDescription">
                Survey Description. consectetur adipiscing elit. lorem ipsum
                dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="modalBody">
              <p>Total Questions: {2}</p>
              <p>Total Respondants: {2}</p>
              <p>Status: {"Active"}</p>
              <p>Total Rewards: {12} DFT</p>
              <p>Start Date: {"2021-10-10"}</p>
              <p>End Date: {"2021-10-10"}</p>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CreateSurvey;
