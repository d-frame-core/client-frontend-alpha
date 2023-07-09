import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./SurveyHistory.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../../components/context/Context";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Modal, Snackbar } from "@mui/material";
const SurveyHistory = () => {
  const [selectedSurveyId, setSelectedSurveyId] = useState<any>(null);
  const [deletingSurvey, setDeletingSurvey] = useState(false);
  const [deleteToastOpen, setDeleteToastOpen] = useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  const navigate = useNavigate();
  const [oastSurveyExist, setPastSurveyExist] = useState(false);
  const [pastSurveyData, setPastSurveyData] = useState<any[]>([]);
  const { _id, token, clientId, setClientId } = useContext(MyContext);
  async function getAllPastSurveys() {
    const id = clientId || localStorage.getItem("clientId");
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
          setOpenToast(true);
        } else {
          console.log(error);
        }
      });
  }
  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
    setDeleteToastOpen(false);
  };
  async function deleteSurveyModal(id: any) {
    setSelectedSurveyId(id);
    setDeletingSurvey(true);
  }
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 200,
    bgcolor: "white",
    boxShadow: 24,
    border: "0",
    p: 3,
    borderRadius: "1.1vh",
  };
  async function deleteParticularSurvey(id: any) {
    setDeleteToastOpen(true);
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
        setDeletingSurvey(false);
        getAllPastSurveys();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    const tempId = localStorage.getItem("clientId");
    if (tempId) {
      setClientId(tempId);
    }
    console.log("cliendId survey history page", clientId);
    getAllPastSurveys();
  }, []);
  useEffect(() => {
    console.log(pastSurveyData);
  }, [getAllPastSurveys]);

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
              <div className="nosurveyFoundDiv">
                <h2 className="nosurveyFoundHeading">
                  No Survey History Found !!
                </h2>
                <button
                  className="nosurveyFoundButton"
                  onClick={() => navigate("/create-survey")}
                >
                  Create New Survey
                </button>
              </div>
            </div>
          )}
          {!oastSurveyExist && (
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
                severity="error"
                sx={{ width: "20vw", height: "5vh" }}
              >
                No History found for survey
              </Alert>
            </Snackbar>
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
                    onClick={() => deleteSurveyModal(data._id)}
                  >
                    <DeleteForeverIcon
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
          {deleteToastOpen && (
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={deleteToastOpen}
              autoHideDuration={6000}
              onClose={() => {
                setDeleteToastOpen(false);
              }}
            >
              <Alert
                onClose={handleToastClose}
                severity="error"
                sx={{ width: "20vw", height: "5vh" }}
              >
                Deleted the Survey Succesfully
              </Alert>
            </Snackbar>
          )}
        </div>
        {deletingSurvey && (
          <Modal
            open={deletingSurvey}
            onClose={() => setDeletingSurvey(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="deleteSurveyModal">
                <div className="deleteSurveyModalHeading">
                  Do You want to delete this survey ?
                </div>
                <div className="deleteSurveyModalButton">
                  <button
                    className="deleteSurveyModalButtonYes"
                    onClick={() => deleteParticularSurvey(selectedSurveyId)}
                  >
                    Yes
                  </button>
                  <button
                    className="deleteSurveyModalButtonNo"
                    onClick={() => setDeletingSurvey(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default SurveyHistory;
