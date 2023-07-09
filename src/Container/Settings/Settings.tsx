import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState, useContext } from "react";
import { Alert, Box, Modal, Snackbar } from "@mui/material";
import { MyContext } from "../../components/context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Drawer from "../../components/sidebar/Drawer";
export default function Settings() {
  const [deletingAllSurveys, setdeletingAllSurveys] = useState(false);
  const [deletingAllAds, setdeletingAllAds] = useState(false);
  const [deleteToastOpen, setDeleteToastOpen] = useState(false);
  const [deleteAdsToastOpen, setDeleteAdsToastOpen] = useState(false);
  const [themeToastOpen, setThemeToastOpen] = useState(false);
  const { _id, token } = useContext(MyContext);
  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setThemeToastOpen(false);
    setDeleteToastOpen(false);
    setDeleteAdsToastOpen(false);
  };
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
  async function clearAllSurveys() {
    setdeletingAllSurveys(true);
  }
  async function clearAllAds() {
    setdeletingAllAds(true);
  }

  async function deleteAllExpiredAds() {
    setDeleteAdsToastOpen(true);
    const clientId = _id || localStorage.getItem("id");
    const _tokenn = token || localStorage.getItem("token");
    await axios
      .delete(`http://localhost:3000/ads/expired/removeAll`, {
        headers: {
          clientid: clientId,
        },
      })
      .then((response) => {
        console.log(response);
        setdeletingAllAds(false);
        setDeleteAdsToastOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteAllExpiredSurveys() {
    setDeleteToastOpen(true);
    const clientId = _id || localStorage.getItem("id");
    const _tokenn = token || localStorage.getItem("token");
    await axios
      .delete(`http://localhost:3000/survey/expired/removeS`, {
        headers: {
          clientid: clientId,
        },
      })
      .then((response) => {
        console.log(response);
        setdeletingAllSurveys(false);
        setDeleteToastOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // use effect to logout the user if wallet is disconnected
  const navigate = useNavigate();
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
      <div className="smopen">{Drawer(8)}</div>
      <>{Sidebar(8)}</>
      <div>
        <Box className="settingsBox">
          <div>
            <p className="settingsTitle">Settings</p>
          </div>

          <table className="table">
            <tr className="">
              <td className="tableData">Theme</td>
              <td className="tableDataColon">:</td>
              <td>
                <FormControlLabel
                  label=""
                  onClick={() => setThemeToastOpen(!themeToastOpen)}
                  control={<Switch />}
                  className="tableData"
                />
              </td>
            </tr>

            <tr></tr>
            <tr>
              <td className="tableData">Clear Ads History</td>
              <td className="tableDataColon">:</td>
              <td>
                <button className="button" onClick={() => clearAllAds()}>
                  Clear Ads
                </button>
              </td>
            </tr>

            <tr></tr>
            <tr>
              <td className="tableData">Clear Survey History</td>
              <td className="tableDataColon">:</td>
              <td>
                <button className="button" onClick={() => clearAllSurveys()}>
                  Clear Surveys
                </button>
              </td>
            </tr>

            <tr></tr>
            <tr>
              <td className="tableData">Clear Notifications</td>
              <td className="tableDataColon">:</td>
              <td>
                {" "}
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                  className="tableData"
                />
              </td>
            </tr>
          </table>
          {themeToastOpen && (
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={themeToastOpen}
              autoHideDuration={6000}
              onClose={() => {
                setThemeToastOpen(false);
              }}
            >
              <Alert
                onClose={handleToastClose}
                severity="info"
                sx={{ width: "20vw", height: "5vh" }}
              >
                Theme Changed
              </Alert>
            </Snackbar>
          )}
        </Box>
        {deletingAllSurveys && (
          <Modal
            open={deletingAllSurveys}
            onClose={() => setdeletingAllSurveys(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="deleteSurveyModal">
                <div className="deleteSurveyModalHeading">
                  Do you want to delete all expired surveys ?
                </div>
                <div className="deleteSurveyModalButton">
                  <button
                    className="deleteSurveyModalButtonYes"
                    onClick={() => deleteAllExpiredSurveys()}
                  >
                    Yes
                  </button>
                  <button
                    className="deleteSurveyModalButtonNo"
                    onClick={() => setdeletingAllSurveys(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        )}
        {deletingAllAds && (
          <Modal
            open={deletingAllAds}
            onClose={() => setdeletingAllAds(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="deleteSurveyModal">
                <div className="deleteSurveyModalHeading">
                  Do you want to delete all expired ads ?
                </div>
                <div className="deleteSurveyModalButton">
                  <button
                    className="deleteSurveyModalButtonYes"
                    onClick={() => deleteAllExpiredAds()}
                  >
                    Yes
                  </button>
                  <button
                    className="deleteSurveyModalButtonNo"
                    onClick={() => setdeletingAllAds(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        )}
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
              Deleted all surveys succesfully
            </Alert>
          </Snackbar>
        )}
        {deleteAdsToastOpen && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={deleteAdsToastOpen}
            autoHideDuration={6000}
            onClose={() => {
              setDeleteAdsToastOpen(false);
            }}
          >
            <Alert
              onClose={handleToastClose}
              severity="error"
              sx={{ width: "20vw", height: "5vh" }}
            >
              Deleted all Ads succesfully
            </Alert>
          </Snackbar>
        )}
      </div>
    </div>
  );
}
