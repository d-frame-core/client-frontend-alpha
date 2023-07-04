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
import Drawer from "../../components/sidebar/Drawer";
const SurveyHistory = () => {
  const [selectedSurveyId, setSelectedSurveyId] = useState<any>(null);
  const [deletingSurvey, setDeletingSurvey] = useState(false);
  const [deleteToastOpen, setDeleteToastOpen] = useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  const navigate = useNavigate();
  const [oastSurveyExist, setPastSurveyExist] = useState(false);
  const [pastSurveyData, setPastSurveyData] = useState<any[]>([]);
  const { _id, token } = useContext(MyContext);

  // getting all past ads
  async function getAllPastSurveys() {
    const id = _id || localStorage.getItem("id");
    const _tokenn = token || localStorage.getItem("token");
    console.log(id, _tokenn);
    await axios
      .get("http://localhost:3000/ads/client/expireddetail", {
        headers: {
          id: id,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setPastSurveyExist(true);
          setPastSurveyData(response.data);
        } else if (response.data.length === 0) {
          setPastSurveyExist(false);
          setOpenToast(true);
        }
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
    await axios
      .delete(`http://localhost:3000/ads/${id}`)
      .then((res) => {
        console.log("Deleted Ad Details", res.data);
        // window.location.reload();
        setDeletingSurvey(false);
        getAllPastSurveys();
      })
      .catch((err) => {
        console.log(err);
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
      <>{Sidebar(5)}</>
      <div className="smopen">{Drawer(5)}</div>
      <div className="outbox">
      <div className="surveyHistoryOuterBox">
        <div className="surveyBoxFlex">
          <div className="surveyTitle">Ad History</div>
        </div>
        <div className="surveyHistoryContent">
          <div className="surveyHistoryContentTitle">
            <div className="surveyHistorySelector">Delete</div>
            <div className="surveyHistorySno">S.No</div>
            <div className="surveyHistorySurveyName">Ad Name</div>
            <div className="surveyHistoryTotalQues">Ad Type</div>
            <div className="surveyHistoryTotalRes">Total Spent (DFT)</div>
            <div className="surveyHistoryTotalReward">Users Reached</div>
            <div className="surveyHistoryTimePeriod">Time Period</div>
          </div>
          {!oastSurveyExist && (
            <div className="noSurveyFound">
              <div className="nosurveyFoundDiv">
                <h2 className="nosurveyFoundHeading">No Ad History Found !!</h2>
                <button
                  className="nosurveyFoundButton"
                  onClick={() => navigate("/campaigns")}
                >
                  Create New Ad
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
                No History found for Ads
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
                    {data.adName}
                  </div>
                  <div className="surveyHistoryTotalQuesData">
                    {data.campaignType}
                  </div>
                  <div className="surveyHistoryTotalResData">34 DFT (S)</div>
                  <div className="surveyHistoryTotalRewardData">5000(s)</div>
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
                  Do You want to delete this Ad ?
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
    </div>
  );
};

export default SurveyHistory;
