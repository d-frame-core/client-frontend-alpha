import { Box } from "@mui/system";
import Sidebar from "../../components/sidebar/Sidebar";
import "./campaigns.css";
import Divider from "@mui/material/Divider";
import {
  Backdrop,
  Button,
  FormControlLabel,
  Modal,
  Switch,
  TextField,
} from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import axios from "axios";
import { MyContext } from "../../components/context/Context";

const typesofads: any[] = [
  { value: "Image", label: "Image" },
  { value: "Video", label: "Video" },
];
export default function Campaigns() {
  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignType, setCampaignType] = useState<string>("");
  const [adName, setAdName] = useState<string>("");
  const [adType, setAdType] = useState<string>("");
  const [adImage, setAdImage] = useState<string>("");
  const [adVideo, setAdVideo] = useState<string>("");
  const [adContent, setAdContent] = useState<string>("");
  const [adLink, setAdLink] = useState<string>("");
  const [adTags, setAdTags] = useState<any>([]);
  const [adLocation, setAdLocation] = useState<string>("");
  const [adBudget, setAdBudget] = useState<string>("");
  const [adStartDate, setAdStartDate] = useState<string>("");
  const [adEndDate, setAdEndDate] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [immediateAdId, setImmediateAdId] = useState<any>();
  const { _id, token, clientId } = React.useContext(MyContext);
  const [tagsExist, setTagsExist] = useState(false);
  const [allAdsDetails, setAllAdsDetails] = useState<any>([]);
  const [particularAdsDetails, setParticularAdsDetails] = useState<any>();
  const [edit, setEdit] = useState(false);
  const [editAd, setEditAd] = useState(false);
  const [editAdDetails, setEditAdDetails] = useState<any>([]);
  const [bidAmount, setBidAmount] = useState<any>();
  const [perDayBudget, setPerDayBudget] = useState<any>();
  const [totalDaysToRun, setTotalDaysToRun] = useState<any>();
  const [adSelectedId, setAdSelectedId] = useState<any>();
  const [editedAdData, setEditedAdData] = useState<any>();
  const [files, setFiles] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();
  const [image, setImage] = useState<any>();
  const [particularBidDetails, setParticularBidDetails] = useState<any>();
  const [editedAdToaster, setEditedAdToaster] = useState(false);
  const [createdAdToaster, setCreatedAdToaster] = useState(false);

  const handleToastClose = () => {
    setEditedAdToaster(false);
  };

  const optionsType: any[] = [
    {
      value: "Awareness",
      label: "Awareness",
    },
    {
      value: "Engagement",
      label: "Engagement",
    },
    {
      value: "Traffic",
      label: "Traffic",
    },
    {
      value: "Sales",
      label: "Sales",
    },
  ];

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    height: 500,
    bgcolor: "white",
    boxShadow: 24,
    border: "0",
    p: 3,
    borderRadius: "1.1vh",
    overflow: "hidden",
    overflowY: "scroll",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    setNextpage(true);
    console.log(data);
  };
  const [formopen, setFormopen] = useState(false);
  const [nextpage, setNextpage] = useState(false);

  // function to create a new Ad
  async function submitAdCampaign() {
    const id = clientId || localStorage.getItem("id");
    console.log("id", id);
    await axios
      .post("http://localhost:3000/ads", {
        clientId: id,
        campaignName: campaignName,
        campaignType: campaignType,
        adName: adName,
        adType: "Image",
        startDate: adStartDate,
        endDate: adEndDate,
        adUrl: adLink,
        adContent: adContent,
        tags: adTags,
      })
      .then(async (res) => {
        console.log("Posted Ad Details", res.data);
        console.log("Immediate Ad Id", res.data.data._id);
        await axios.post("http://localhost:3000/bids", {
          adId: res.data.data._id,
          bidAmount: Number(bidAmount),
          perDay: Number(perDayBudget),
          totalDays: Number(totalDaysToRun),
        });
        getAllCampaigns();
      })
      .catch((err) => {
        console.log(err);
      });
    setFormopen(false);
  }
  const removeTag = (indexToRemove: number) => {
    setAdTags(adTags.filter((_: any, index: any) => index !== indexToRemove));
  };

  // function to get all campaigns of a particular client
  async function getAllCampaigns() {
    const id = clientId || localStorage.getItem("clientId");
    console.log("id", id);
    await axios
      .get(`http://localhost:3000/ads/client/detail`, {
        headers: {
          id: id,
        },
      })
      // ""
      .then((res) => {
        console.log("All Ads Details", res.data);
        setAllAdsDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getParticularCampaign(id: any) {
    const idOfCilent = localStorage.getItem("clientId");
    await axios
      .get(`http://localhost:3000/ads/${id}`)
      .then(async (res) => {
        console.log("Particular Ad Details", res.data);
        await axios
          .get(`http://localhost:3000/bids/${idOfCilent}`)
          .then((res) => {
            // console.log("Particular Bid Details", res.data);
            setParticularBidDetails(res.data);
          });
        setParticularAdsDetails(res.data);
        setAdSelectedId(id);
        setEdit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateParticularAd(id: any) {
    await axios
      .patch(`http://localhost:3000/ads/${id}`, {
        adName: editedAdData.adName,
        adContent: editedAdData.adContent,
      })
      .then((res) => {
        // console.log("Updated Ad Details", res.data);
        setEdit(false);
        setEditAd(false);
        setEditedAdToaster(true);
        getAllCampaigns();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setEditedAdData(particularAdsDetails);
  }, [particularAdsDetails]);

  useEffect(() => {
    getAllCampaigns();
  }, []);

  // function to delete a particular Ad
  async function deleteParticularAd(id: any) {
    await axios
      .delete(`http://localhost:3000/ads/${id}`)
      .then((res) => {
        // console.log("Deleted Ad Details", res.data);
        // window.location.reload();
        setEdit(false);
        getAllCampaigns();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <>{Sidebar(4)}</>
      <div className="campaignsBox">
        <div className="campaignsGreyBox">
          <div className="campaignsHeader">
            <div className="campaignsHeaderTitleMain">Create Campaign</div>
            <button
              className="campaignsHeaderButton"
              onClick={() => {
                setFormopen(true);
                setNextpage(false);
              }}
            >
              + Create
            </button>
          </div>
          <Backdrop
            open={formopen}
            className="backdrop"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <div className="campaignsForm">
              <div className="campaignsFormHeader">
                <div className="campaignsHeaderTitle">Create Campaign</div>
                <button
                  className="closeButtoncampaignsPage"
                  onClick={() => setFormopen(false)}
                >
                  X
                </button>{" "}
              </div>
              <Divider />
              {!nextpage && (
                <div className="campaignsFormBody">
                  <TextField
                    id="standard-basic"
                    label="Campaign Name"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%" }}
                    {...register("campaignName")}
                    onChange={(e) => setCampaignName(e.target.value)}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="Campaign Type"
                    select
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select the Tags"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("Campaign Type")}
                    onChange={(e) => setCampaignType(e.target.value)}
                    required
                    onClick={() => console.log(campaignType)}
                  >
                    {optionsType.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    id="standard-basic"
                    label="Ad Name"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("Ad Name")}
                    onChange={(e) => setAdName(e.target.value)}
                    required
                  />
                  <TextField
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    select
                    label="Ad Type"
                    defaultValue={false}
                    {...register("Ad Type")}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select the ad type"
                    variant="standard"
                    onChange={(e) => setAdType(e.target.value)}
                  >
                    {typesofads.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <div className="addImage">
                    <label className="editIcon" htmlFor="files">
                      Add File
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      id="files"
                      onChange={(e: any) => {
                        if (e.target.files) {
                          setAdImage(e.target.files[0]);
                          console.log(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                  <TextField
                    id="standard-basic"
                    label="Ad Url"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%" }}
                    {...register("Ad URL")}
                    onChange={(e) => setAdLink(e.target.value)}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="Ad Content"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("Ad Content")}
                    onChange={(e) => setAdContent(e.target.value)}
                    required
                  />
                </div>
              )}
              {nextpage && (
                <div className="campaignsFormBody">
                  <div
                    className={`${
                      tagsExist ? "tagsOuterDivv" : "tagsOuterDivvSmall"
                    }`}
                  >
                    <div
                      className={`${
                        tagsExist ? "tagsBoxx" : "tagsBoxVisibilityHidden"
                      }`}
                    >
                      {adTags.map((tag: any, index: any) => (
                        <div key={index} className="tagAddedDiv">
                          <span>{tag}</span>
                          <button onClick={() => removeTag(index)}>
                            &#10006;
                          </button>
                        </div>
                      ))}
                    </div>

                    <TextField
                      id="standard-basic"
                      label="Ad Tags"
                      variant="standard"
                      sx={{ left: "0", width: "90%", marginTop: "1.5vh" }}
                      value={inputValue}
                      {...register("Ad Tags")}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const tagText = inputValue.trim();
                          if (tagText) {
                            setAdTags([...adTags, tagText]);
                            setInputValue("");
                            setTagsExist(true);
                          }
                          e.preventDefault();
                        }
                        if (e.key === "Backspace" && inputValue === "") {
                          setAdTags(adTags.slice(0, adTags.length - 1));
                        }
                      }}
                      required
                    />
                  </div>
                  <TextField
                    id="standard-basic"
                    label="Location"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("location")}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    label="Start Date"
                    placeholder="Start Date"
                    type={"date"}
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("startDate")}
                    onChange={(e) => setAdStartDate(e.target.value)}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="End Date"
                    variant="standard"
                    type={"date"}
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("endDate")}
                    onChange={(e) => setAdEndDate(e.target.value)}
                    required
                  />
                  <Divider />
                  <TextField
                    id="standard-basic"
                    label="Bid Amount per user"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("bidAmount")}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="Budget Amount Per Day"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("budgetAmountPerDay")}
                    onChange={(e) => setPerDayBudget(e.target.value)}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="Total Days of Campaign"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("totalDays")}
                    onChange={(e) => setTotalDaysToRun(e.target.value)}
                    required
                  />
                </div>
              )}
              <Divider />
              {!nextpage && (
                <button
                  className="nextCampaignButton"
                  type="submit"
                  onClick={() => setNextpage(true)}
                >
                  Next
                </button>
              )}
              {nextpage && (
                <button
                  className="nextCampaignButton"
                  type="submit"
                  onClick={() => submitAdCampaign()}
                >
                  Submit
                </button>
              )}
            </div>
          </Backdrop>
          <div className="campaignsBody">
            <div className="campaignsCategoriesBox">
              <div className="campaignNameHeading">Ad Name</div>
              <div className="bidStrategy">Bid Amount</div>
              <div className="budgetDFT">Budget / Day</div>
              <div className="editCampaignHeading">Edit</div>
              <div className="typeHeading">Type</div>
              <div className="reachHeading">Users Assigned</div>
              <div className="startDateCampaign">Start Date</div>
              <div className="endDateCampgin">End Date</div>
            </div>

            <div className="campaignsDetails">
              {allAdsDetails &&
                allAdsDetails.map((item: any, index: any) => (
                  <div className="adDetails" key={index}>
                    <div className="campaignNameDetails">{item.adName}</div>
                    <div className="bidStrategyDetails">
                      {item.bidAmount} DFT
                    </div>
                    <div className="budgetDFTDetails">{item.perDay}</div>
                    <div
                      className="editCampaignDetails"
                      onClick={(e) => getParticularCampaign(item._id)}
                    >
                      <EditIcon />
                    </div>
                    <div className="typeDetails">
                      {item.type ? item.type : "N.A."}
                    </div>
                    <div className="reachDetails">
                      {item.assignedUsers ? item.assignedUsers : "5000"}
                    </div>
                    <div className="startDateCampaignDetails">
                      {item.startDate.slice(0, 10)}
                    </div>
                    <div className="endDateCampginDetails">
                      {item.endDate.slice(0, 10)}
                    </div>
                  </div>
                ))}
              {
                // when all ads is empty show No DATA TO DISPLAY AT THE CENTER OF THE campaignDetails
                allAdsDetails.length === 0 && (
                  <div className="noDataToDisplay">
                    <p className="noDataToDisplayText">No Data to Display</p>
                  </div>
                )
              }
            </div>

            {particularAdsDetails && (
              <Modal
                open={edit}
                onClose={() => {
                  setEdit(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="modalHeaderCampaignsPage">
                    <h1 className=" modalHeaderCampaignName ">
                      {particularAdsDetails.campaignName}
                    </h1>
                    <p className="modalHeaderCampaignType">
                      {particularAdsDetails.campaignType}
                    </p>
                    <button
                      className="modalCloseButtonCampaignsPage"
                      onClick={() => setEdit(false)}
                    >
                      X
                    </button>
                  </div>
                  {!editAd && (
                    <div className="modalBodyCampaignsPage">
                      <div className="modalBodyCampaignsPageTop">
                        <h2 className="modalBodyCampaignsPageHeadingTitle">
                          Ad Name:-{" "}
                        </h2>
                        <h2> </h2>
                        <h2 className="modalBodyCampaignsPageHeading">
                          {" "}
                          {particularAdsDetails.adName}
                        </h2>
                      </div>
                      <div className="modalBodyCampaignsPageMiddle">
                        <p className="modalBodyCampaignsPageContentTitle">
                          Ad Content:-{" "}
                        </p>
                        <p> </p>
                        <p className="modalBodyCampaignsPageContent">
                          {particularAdsDetails.adContent.length > 100
                            ? particularAdsDetails.adContent.slice(0, 100) +
                              "..."
                            : particularAdsDetails.adContent}
                        </p>
                      </div>
                      <div
                        className="modalBodyCampaignsPageBottom"
                        title={
                          particularAdsDetails.tags.length > 0
                            ? "Ad Tags:- " + particularAdsDetails.tags.join(",")
                            : ""
                        }
                      >
                        <p className="modalBodyCampaignsPageBottomContent">
                          {particularAdsDetails.tags.length > 0 ? (
                            // display total tags less than or equal to 10, else show ... after 10 tags
                            particularAdsDetails.tags
                              .slice(0, 10)
                              .map((tag: any, index: any) => (
                                <>
                                  <div key={index} className="individualTag">
                                    {tag}
                                  </div>
                                  <div>{index === 9 && <span>....</span>}</div>
                                </>
                              ))
                          ) : (
                            <div className="notagsadded">
                              <p>No Tags Added, so no data available</p>
                            </div>
                          )}
                        </p>

                        {/* users reached */}
                      </div>
                      <div className="modalBodyCampaignsPageBottomDateSection">
                        <div className="startDateCampaignsPage">
                          <p className="startDateCampaignsPageTitle">
                            Start Date:-{" "}
                          </p>
                          <p className="startDateCampaignsPageContent">
                            {particularAdsDetails.startDate.slice(0, 10)}
                          </p>
                        </div>
                        <div className="endDateCampaignsPage">
                          <p className="endDateCampaignsPageTitle">
                            End Date:-{" "}
                          </p>
                          <p className="endDateCampaignsPageContent">
                            {particularAdsDetails.endDate.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                      <div className="modalClientDetails">
                        <div className="bidModalHeadingDiv">
                          <h3 className="bidsModalHeadingSno">S.No</h3>
                          <h3 className="bidsModalHeadingClientName">Ad Id</h3>
                          <h3 className="bidsModalHeadingOption">Bid Amount</h3>
                          <h3 className="bidsModalHeadingOption">
                            Users Reached
                          </h3>
                        </div>
                        <div className="bidModalDiv">
                          {particularBidDetails &&
                            particularBidDetails.map(
                              (item: any, index: any) => (
                                console.log("particularBidDetails", item),
                                (
                                  <div className="bidModalArrayDiv" key={index}>
                                    <p className="bidsModalHeadingSno">
                                      {index + 1}
                                    </p>
                                    <p className="bidsModalHeadingClientName">
                                      {item.adId ? item.adId : "NA"}
                                    </p>
                                    <p className="bidsModalHeadingOption">
                                      {item.bidAmount ? item.bidAmount : "NA"}
                                    </p>
                                    <p className="bidsModalHeadingOption">NA</p>
                                  </div>
                                )
                              )
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                  {
                    // edit ad section
                    editAd && (
                      <div className="modalBodyCampaignsPage">
                        <div className="modalBodyCampaignsPageTop">
                          <h2 className="modalBodyCampaignsPageHeadingTitle">
                            Ad Name:-{" "}
                          </h2>
                          <h2> </h2>
                          <input
                            type="text"
                            className="modalBodyCampaignsPageHeadingEdit"
                            value={editedAdData.adName}
                            onChange={(e) =>
                              setEditedAdData({
                                ...editedAdData,
                                adName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="modalBodyCampaignsPageMiddle">
                          <p className="modalBodyCampaignsPageContentTitle">
                            Ad Content:-{" "}
                          </p>
                          <p> </p>
                          <input
                            type="text"
                            className="modalBodyCampaignsPageContentEdit"
                            value={editedAdData.adContent}
                            onChange={(e) =>
                              setEditedAdData({
                                ...editedAdData,
                                adContent: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="modalBodyCampaignsPageBottom">
                          <p className="modalBodyCampaignsPageBottomTitle">
                            Ad Tags:-{" "}
                          </p>
                          <p className="modalBodyCampaignsPageBottomContent">
                            {particularAdsDetails.tags.length > 0 ? (
                              // display total tags less than 80 characters, else show ... after 80 characters
                              particularAdsDetails.tags.map(
                                (tag: any, index: any) => (
                                  <span key={index} className="individualTag">
                                    {tag}
                                    {index !==
                                      particularAdsDetails.tags.length - 1 && (
                                      <span>&nbsp;&nbsp;</span>
                                    )}
                                  </span>
                                )
                              )
                            ) : (
                              <div className="notagsadded">
                                <p>No Tags Added, so no data available</p>
                              </div>
                            )}
                          </p>
                        </div>
                        <div className="modalBodyCampaignsPageBottomDateSection">
                          <div className="startDateCampaignsPage">
                            <p className="startDateCampaignsPageTitle">
                              Start Date:-{" "}
                            </p>
                            <p className="startDateCampaignsPageContent">
                              {particularAdsDetails.startDate.slice(0, 10)}
                            </p>
                          </div>
                          <div className="endDateCampaignsPage">
                            <p className="endDateCampaignsPageTitle">
                              End Date:-{" "}
                            </p>
                            <p className="endDateCampaignsPageContent">
                              {particularAdsDetails.endDate.slice(0, 10)}
                            </p>
                          </div>
                        </div>
                        <div className="modalClientDetails">
                          <div className="bidModalHeadingDiv">
                            <h3 className="bidsModalHeadingSno">S.No</h3>
                            <h3 className="bidsModalHeadingClientName">
                              Client Name
                            </h3>
                            <h3 className="bidsModalHeadingOption">Option 1</h3>
                            <h3 className="bidsModalHeadingOption">Option 2</h3>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  {!editAd && (
                    <div className="modalFooterCampaignsPage">
                      <button
                        className="modalFooterButtonEditCampaignsPage"
                        onClick={() => setEditAd(true)}
                      >
                        Edit Ad
                      </button>
                      <button
                        className="modalFooterButtonDeleteCampaignsPage"
                        onClick={() =>
                          deleteParticularAd(particularAdsDetails._id)
                        }
                      >
                        Delete Ad
                      </button>
                      <button className="modalFooterButtonBidsCampaignsPage">
                        Edit Bids
                      </button>
                    </div>
                  )}
                  {editAd && (
                    <div className="modalFooterCampaignsPage">
                      <button
                        className="modalFooterButtonDeleteCampaignsPage"
                        onClick={() => setEditAd(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="modalFooterButtonEditCampaignsPage"
                        onClick={() => updateParticularAd(adSelectedId)}
                      >
                        Save Edit
                      </button>
                    </div>
                  )}
                </Box>
              </Modal>
            )}
          </div>
        </div>
        {editedAdToaster && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={editedAdToaster}
            autoHideDuration={6000}
            onClose={() => {
              setEditedAdToaster(false);
            }}
          >
            <Alert
              onClose={handleToastClose}
              severity="info"
              sx={{ width: "20vw", height: "5vh", fontSize: "1rem" }}
            >
              Ad Edited
            </Alert>
          </Snackbar>
        )}
      </div>
    </>
  );
}
