// importing required files and packages here.
import {
  Backdrop,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { MyContext } from "../../components/context/Context";
import Sidebar from "../../components/sidebar/Sidebar";
import "./CreateSurvey.css";
import SurveyModal from "../../components/Survey Modal/SurveyModal";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SurveyAnalytics from "../SurveyAnalytics/SurveyAnalytics";
import Drawer from "../../components/sidebar/Drawer";

// default function of CreateSurvey.tsx file.
const CreateSurvey = () => {
  // defining states here.
  const navigate = useNavigate();
  const [surveyInactiveToastOpen, setSurveyInactiveToastOpen] = useState(false);
  const [surveyActiveToastOpen, setSurveyActiveToastOpen] = useState(false);
  const [submitToastOpen, setSubmitToastOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const { _id, token, clientId, setClientId } = useContext(MyContext);
  const [surveyName, setSurveyName] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [surveyResource, setSurveyResource] = useState("");
  const [singleSurveyData, setSingleSurveyData] = useState<any>();
  const [editSurvey, setEditSurvey] = useState(false);
  const [editSurveyData, setEditSurveyData] = useState<any>();
  const [surveyId, setSurveyId] = useState("");
  const [surveyDeletedToaster, setSurveyDeletedToaster] = useState(false);
  const [adStartDate, setAdStartDate] = useState("");
  const [adEndDate, setAdEndDate] = useState("");
  const [dateError, setDateError] = useState("");
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

  // defining useForm here
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

  // function to handle questions data
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
    }
  }

  // function to set survey inactive
  async function setSurveyInactive(id: any) {
    // .stopPropagation();
    setSurveyInactiveToastOpen(true);
    console.log("setSurveyInactive", id);
    await axios
      .put(`http://localhost:3000/survey/${id}/status`, {
        isActive: false,
      })
      .then((res) => {
        fetchAllSurveys();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function to set survey active
  async function setSurveyActive(id: any) {
    setSurveyActiveToastOpen(true);
    await axios
      .put(`http://localhost:3000/survey/${id}/status`, {
        isActive: true,
      })
      .then((res) => {
        fetchAllSurveys();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const fields = []; // this array will contain all the fields

  // this loop will push the fields in the array
  for (let i = 0; i < parseInt(numberOfQuestionsSelected); i++) {
    fields.push(
      <div key={i} className="fieldInputDiv">
        <input
          type="text"
          placeholder={"Question " + (i + 1) + ""}
          className="fieldInputSurveyName"
          // value={surveyQuestions[i].questionName}
          onClick={() => handleData(i)}
          onFocus={() => handleData(i)}
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
            onChange={(e) => {
              setOption1(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder={"Option 2"}
            className="fieldInputSurveyNameInputField"
            onChange={(e) => {
              setOption2(e.target.value);
            }}
          />
        </div>

        <hr style={{ color: "#47b5ff" }} />
      </div>
    );
  }

  // this function will change the start date entered by the client
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = new Date(event.target.value);
    setStartDate(newDate);
  };

  // function to edit the survey data in backend
  const editSurveyInBackend = async () => {
    setEditSurvey(false);
    setOpenToast(true);
    const _tokenn = token || localStorage.getItem("token");
    const id = clientId || localStorage.getItem("clientId");
    const _surveyId = surveyId || localStorage.getItem("surveyId");

    // axios call to edit the survey
    await axios
      .put(
        `http://localhost:3000/survey/${_surveyId}`,
        {
          surveyName: editSurveyData.surveyName,
          surveyDescription: editSurveyData.surveyDescription,
          totalQues: editSurveyData.totalQues,
          startDate: editSurveyData.startDate,
          endDate: editSurveyData.endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${_tokenn}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("then called");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function to handle the end date entered by the client
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setEndDate(newDate);
  };

  // function to submit the survey created by the client
  const submitFormFunction = async () => {
    setNextpage(true);
    setFormopen(false);
    const index = parseInt(numberOfQuestionsSelected);
    var resultArray = Object.keys(totalQues).map(function (
      personNamedIndex: any
    ) {
      let person = totalQues[personNamedIndex];

      return person;
    });
    const id = clientId || localStorage.getItem("clientId");
    resultArray[index - 1].options = [option1, option2];

    const _tokenn = token || localStorage.getItem("token");

    // axios api call to post the survey in the backend
    await axios
      .post(
        "http://localhost:3000/survey",
        {
          surveyName: surveyName,
          surveyDescription: surveyDescription,
          totalQues: resultArray,
          clientId: id,
          statusCampaign: "active",
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
        setSubmitToastOpen(true);
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

  // function to get particular survey from backend
  async function getParticularSurvey(
    id: any,
    e: React.MouseEvent<HTMLDivElement>
  ) {
    e.stopPropagation();
    const _tokenn = token || localStorage.getItem("token");
    localStorage.setItem("surveyId", id);
    setSurveyId(id);

    await axios
      .get(`http://localhost:3000/survey/${id}`, {
        headers: {
          Authorization: `Bearer ${_tokenn}`,
        },
      })
      .then((res) => {
        setSingleSurveyData(res.data);
      });
    setOpen(true);
  }

  // style for the modal
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    height: 600,
    bgcolor: "white",
    boxShadow: 24,
    border: "0",
    p: 3,
    borderRadius: "1.1vh",
    overflow: "hidden",
    overflowY: "scroll",
  };

  // function to fetch all surveys from the backend
  async function fetchAllSurveys() {
    const id = clientId || localStorage.getItem("clientId");
    const _tokenn = token || localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/survey/client/", {
      headers: {
        Authorization: `Bearer ${_tokenn}`,
        clientid: id,
      },
    });

    setFetchedData(res.data);
  }

  // useEffect to fetch all surveys
  useEffect(() => {
    const tempId = localStorage.getItem("clientId");
    if (tempId) {
      setClientId(tempId);
    }
    console.log("cliendId survey page", clientId);
    fetchAllSurveys();
  }, []);

  // useeffect during data fetched
  useEffect(() => {}, [fetchedData]);

  // useeffect to set the edit survey data
  useEffect(() => {
    setEditSurveyData(singleSurveyData);
  }, [getParticularSurvey]);

  // function to handle the toast close
  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
    setSubmitToastOpen(false);
    setSurveyInactiveToastOpen(false);
    setSurveyActiveToastOpen(false);
    setSurveyDeletedToaster(false);
  };

  // function to delete particular survey
  async function deleteParticularSurvey() {
    const _tokenn = token || localStorage.getItem("token");
    setSurveyDeletedToaster(true);
    const res = await axios.delete(`http://localhost:3000/survey/${surveyId}`, {
      headers: {
        Authorization: `Bearer ${_tokenn}`,
      },
    });
    console.log("delete");
    setOpen(false);
    fetchAllSurveys();
  }

  // use effect to logout the user if wallet is disconnected
  const handleWalletDisconnect = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected
      navigate("/");
    }
  };
  useEffect(() => {
    // Listen for changes in the selected address property
    if ((window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", handleWalletDisconnect);
    }
  }, [(window as any).ethereum]);

  return (
    <div>
      <>{Sidebar(6)}</>
      <div className="smopen">{Drawer(6)}</div>
      <div className="outbox">
      <div className="createSurveyBox">
        <div className="createSurveyGreyBox">
          <div className="createSurveyHeader">
            <div className="createSurveyHeaderTitleMain">Create Survey</div>
            <button
              className="createSurveyHeaderButton"
              onClick={() => setFormopen(true)}
            >
              Create
            </button>
          </div>
          <div className="createSurveyBody">
            <div className="createSurveyCategoriesBox">
              <div className="surveyName">Survey Name</div>
              <div className="totalQues">Total Questions</div>
              <div className="totalRes">Rewards</div>
              <div className="statusCampaign">Status</div>
              <div className="editCampaign">Edit</div>
              <div className="startDate">Start Date</div>
              <div className="endDate">End Date</div>
            </div>

            <div className="createSurveyDetails">
              {
                // no data in fetched data
                fetchedData.length === 0 && (
                  <div className="noDataCreateSurvey">No Data to display</div>
                )
              }
              {fetchedData.map((item: any) => {
                return (
                  <div
                    className="surveyDetails"
                    onClick={() => {
                      navigate(`/survey-analytics/${item._id}`);
                    }}
                  >
                    <div className="surveyNameDetails"> {item.surveyName} </div>
                    <div className="totalQuesDetails">
                      {" "}
                      {item.totalQues.length}{" "}
                    </div>
                    <div className="totalResDetails"> {item.totalReward} </div>
                    <div
                      className="statusCampaignDetails"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.statusCampaign === "active" ? (
                        <FormControlLabel
                          label=""
                          className="themeSwitch"
                          onClick={(event) => setSurveyInactive(item._id)}
                          control={<Switch defaultChecked />}
                        />
                      ) : (
                        <FormControlLabel
                          label=""
                          className="themeSwitch"
                          onClick={() => setSurveyActive(item._id)}
                          control={<Switch />}
                        />
                      )}
                    </div>
                    <div
                      className="editIconCreateSurvey"
                      onClick={(e) => getParticularSurvey(item._id, e)}
                    >
                      <EditIcon />
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
              {nextpage && <div className="inputFieldOuterDiv">{fields}</div>}
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
        {singleSurveyData && (
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {!editSurvey && (
                <div
                  className={
                    singleSurveyData.surveyDescription.toString().length > 100
                      ? "modalHeader"
                      : "modalHeaderShort"
                  }
                >
                  <h1 className=" modalHeaderHeading ">
                    {singleSurveyData.surveyName}
                  </h1>
                  <button
                    className="modalCloseButton"
                    onClick={() => setOpen(false)}
                  >
                    X
                  </button>

                  <p className="modalHeaderDescription">
                    {singleSurveyData.surveyDescription.toString().length > 100
                      ? singleSurveyData.surveyDescription
                          .toString()
                          .slice(0, 100) + "..."
                      : singleSurveyData.surveyDescription}
                  </p>
                </div>
              )}
              {editSurvey && (
                <div
                  className={
                    singleSurveyData.surveyDescription.toString().length > 100
                      ? "modalHeader"
                      : "modalHeaderShort"
                  }
                >
                  <h1 className=" modalHeaderHeading ">
                    {singleSurveyData.surveyName}
                  </h1>
                  <button
                    className="modalCloseButton"
                    onClick={() => setOpen(false)}
                  >
                    X
                  </button>

                  <p className="modalHeaderDescription">
                    {singleSurveyData.surveyDescription.toString().length > 100
                      ? singleSurveyData.surveyDescription
                          .toString()
                          .slice(0, 100) + "..."
                      : singleSurveyData.surveyDescription}
                  </p>
                </div>
              )}
              <div className="modalBody">
                <p>Total Questions: {singleSurveyData.totalQues.length}</p>
                <p>Total Respondants: {"N.A"}</p>
                <p>Status: {singleSurveyData.statusCampaign}</p>
                <p>Total Rewards: {singleSurveyData.totalReward} DFT</p>
                <p>
                  Start Date:{" "}
                  {singleSurveyData.startDate.toString().slice(0, 10)}
                </p>
                <p>
                  End Date: {singleSurveyData.endDate.toString().slice(0, 10)}
                </p>
              </div>
              <div className="viewQuestions">
                <div className="questionModalHeadingDiv">
                  <h3 className="questionsModalHeadingSno">S.No</h3>
                  <h3 className="questionsModalHeadingQuestion">Question</h3>
                  <h3 className="questionsModalHeadingOption">Option 1</h3>
                  <h3 className="questionsModalHeadingOption">Option 2</h3>
                </div>

                {!editSurvey && (
                  <div className="questionsArray">
                    {singleSurveyData.totalQues.map((item: any, index: any) => {
                      return (
                        <div className="questionModalBodyDiv">
                          <div className="questionModalBodySno">
                            {index + 1}
                          </div>
                          <div className="questionModalBodyQuestion">
                            {item.title.toString().length > 44
                              ? item.title.toString().slice(0, 44) + "..."
                              : item.title}
                          </div>
                          <div className="questionModalBodyOption">
                            {item.options[0].toString().length > 11
                              ? item.options[0].toString().slice(0, 11) + "..."
                              : item.options[0]}
                          </div>
                          <div className="questionModalBodyOption">
                            {item.options[1].toString().length > 11
                              ? item.options[1].toString().slice(0, 11) + "..."
                              : item.options[1]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {editSurvey && (
                  <div className="questionsArrayInEdit">
                    {singleSurveyData.totalQues.map((item: any, index: any) => {
                      return (
                        <div className="questionModalBodyDivInEdit">
                          <div className="questionModalBodySnoInEdit">
                            {index + 1}
                          </div>
                          <div className="questionModalBodyQuestionInEdit">
                            <input
                              className="questionModalBodyQuestionInput"
                              type="textSurveyPage"
                              defaultValue={item.title}
                              onChange={(e) => {
                                setEditSurveyData({
                                  ...editSurveyData,
                                  totalQues: [
                                    ...editSurveyData.totalQues,
                                    (editSurveyData.totalQues[index].title =
                                      e.target.value),
                                  ],
                                });
                              }}
                            />
                          </div>
                          <div className="questionModalBodyOptionInEdit">
                            <input
                              className="questionModalBodyOptionInput"
                              type="textSurveyPage"
                              defaultValue={item.options[0]}
                              onChange={(e) => {
                                setEditSurveyData({
                                  ...editSurveyData,
                                  totalQues: [
                                    ...editSurveyData.totalQues,
                                    (editSurveyData.totalQues[
                                      index
                                    ].options[0] = e.target.value),
                                  ],
                                });
                              }}
                            />
                          </div>
                          <div className="questionModalBodyOptionInEdit">
                            <input
                              className="questionModalBodyOptionInput"
                              type="textSurveyPage"
                              defaultValue={item.options[1]}
                              onChange={(e) => {
                                setEditSurveyData({
                                  ...editSurveyData,
                                  totalQues: [
                                    ...editSurveyData.totalQues,
                                    (editSurveyData.totalQues[
                                      index
                                    ].options[1] = e.target.value),
                                  ],
                                });
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    <p className="infoMsgSurvey">
                      **Survey name, content, rewards and dates cannot be
                      changed**
                    </p>
                  </div>
                )}
              </div>
              {!editSurvey && (
                <div className="modalFooter">
                  <button
                    className="modalFooterButtonEdit"
                    onClick={() => {
                      setEditSurvey(true);
                      console.log(editSurveyData);
                    }}
                  >
                    Edit Survey
                  </button>
                  <button
                    className="modalFooterButtonDelete"
                    onClick={() => deleteParticularSurvey()}
                  >
                    Delete Survey
                  </button>
                </div>
              )}
              {editSurvey && (
                <div className="modalFooter">
                  <button
                    className="modalFooterButtonDelete"
                    onClick={() => setEditSurvey(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="modalFooterButtonEdit"
                    onClick={() => editSurveyInBackend()}
                  >
                    Save Edit
                  </button>
                </div>
              )}
            </Box>
          </Modal>
        )}
      </div>
      {!editSurvey && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openToast}
          autoHideDuration={6000}
          onClose={() => {
            setOpenToast(false);
          }}
        >
          <Alert
            onClose={handleToastClose}
            severity="success"
            sx={{ width: "20vw", height: "5vh" }}
          >
            Edited Survey
          </Alert>
        </Snackbar>
      )}
      {submitToastOpen && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openToast}
          autoHideDuration={6000}
          onClose={() => {
            setOpenToast(false);
          }}
        >
          <Alert
            onClose={handleToastClose}
            severity="success"
            sx={{ width: "20vw", height: "5vh", fontSize: "1rem" }}
          >
            Edited Survey
          </Alert>
        </Snackbar>
      )}
      {surveyInactiveToastOpen && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={surveyInactiveToastOpen}
          autoHideDuration={6000}
          onClose={() => {
            setSurveyInactiveToastOpen(false);
          }}
        >
          <Alert
            onClose={handleToastClose}
            severity="info"
            sx={{ width: "20vw", height: "5vh", fontSize: "1rem" }}
          >
            Survey is Inactive now
          </Alert>
        </Snackbar>
      )}
      {surveyActiveToastOpen && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={surveyActiveToastOpen}
          autoHideDuration={6000}
          onClose={() => {
            setSurveyActiveToastOpen(false);
          }}
        >
          <Alert
            onClose={handleToastClose}
            severity="info"
            sx={{ width: "20vw", height: "5vh", fontSize: "1rem" }}
          >
            Survey is Active now
          </Alert>
        </Snackbar>
      )}
      {surveyDeletedToaster && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={surveyDeletedToaster}
          autoHideDuration={6000}
          onClose={() => {
            setSurveyDeletedToaster(false);
          }}
        >
          <Alert
            onClose={handleToastClose}
            severity="error"
            sx={{ width: "20vw", height: "5vh", fontSize: "1rem" }}
          >
            Survey Deleted
          </Alert>
        </Snackbar>
      )}
    </div>
    </div>
  );
};

export default CreateSurvey;
