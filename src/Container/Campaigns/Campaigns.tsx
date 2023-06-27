//  importing all dependencies and required components
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
import { SubmitHandler, set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import axios from "axios";
import { MyContext } from "../../components/context/Context";
import { useNavigate } from "react-router-dom";

//  defining types of ads
const typesofads: any[] = [
  { value: "Image", label: "Image" },
  { value: "Video", label: "Video" },
];
export default function Campaigns() {
  const navigate = useNavigate();
  //  defining states
  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignType, setCampaignType] = useState<string>("");
  const [adName, setAdName] = useState<string>("");
  const [adType, setAdType] = useState<string>("");
  const [adFile, setAdFile] = useState<string | Blob>("");
  // const [adVideo, setAdVideo] = useState<string>("");
  const [adContent, setAdContent] = useState<string>("");
  const [adLink, setAdLink] = useState<string>("");
  const [adTags, setAdTags] = useState<any>([]);
  const [adLocation, setAdLocation] = useState<string>("");
  const [adBudget, setAdBudget] = useState<string>("");
  const [adStartDate, setAdStartDate] = useState("");
  const [adEndDate, setAdEndDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [immediateAdId, setImmediateAdId] = useState<any>();
  const { _id, token, clientId, setClientId } = React.useContext(MyContext);
  const [tagsExist, setTagsExist] = useState(false);
  const [allAdsDetails, setAllAdsDetails] = useState<any>([]);
  const [particularAdsDetails, setParticularAdsDetails] = useState<any>();
  const [edit, setEdit] = useState(false);
  const [editAd, setEditAd] = useState(false);
  const [editAdDetails, setEditAdDetails] = useState<any>([]);
  // const [bidAmount, setBidAmount] = useState<any>();
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
  const [deletedAdToaster, setDeletedAdToaster] = useState(false);
  const [editBidModal, setEditBidModal] = useState(false);
  const [newBidAmount, setNewBidAmount] = useState("");

  //  function to handle toast close
  const handleToastClose = () => {
    setEditedAdToaster(false);
    setCreatedAdToaster(false);
    setDeletedAdToaster(false);
  };

  //  option types for campaign type
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

  //  style for the bigger modal
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

  // style for the smaller modal
  const style2 = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 200,
    bgcolor: "white",
    boxShadow: 24,
    border: "0",
    p: 3,
    borderRadius: "1.1vh",
    overflow: "hidden",
  };

  //  useform compoenent
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

  // function to handle the start date change
  const handleStartDateChange = (event: any) => {
    const startDate = event.target.value;
    setAdStartDate(startDate);

    const currentDate = new Date().toISOString().slice(0, 10);
    if (startDate < currentDate) {
      setAdStartDate("");
      setAdEndDate("");
      setDateError("Start Date should be greater than the current date");
    } else {
      setDateError("");
    }
  };

  //  function to handle the end date change
  const handleEndDateChange = (event: any) => {
    const endDate = event.target.value;
    setAdEndDate(endDate);

    if (endDate <= adStartDate) {
      setAdEndDate("");
      setDateError("End Date should be greater than the Start Date");
    } else {
      setDateError("");
    }
  };

  // function to create a new Ad
  async function submitAdCampaign() {
    const id = clientId || localStorage.getItem("id");
    console.log("id", id);

    const formData = new FormData();
    formData.append("image", adFile);

    // const result = await axios.post("/api/images", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });

    // console.log(result.data);

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
        setCreatedAdToaster(true);
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

  // function to get particular campaign details
  async function getParticularCampaign(
    id: any,
    e: React.MouseEvent<HTMLDivElement>
  ) {
    e.stopPropagation();
    const idOfCilent = localStorage.getItem("clientId");
    await axios
      .get(`http://localhost:3000/ads/${id}`)
      .then(async (res) => {
        console.log("Particular Ad Details", res.data);
        await axios
          .get(`http://localhost:3000/bids/${idOfCilent}`)
          .then((res) => {
            console.log("Particular Bid Details", res.data);
            // setParticularBidDetails(res.data);
            const sortedBidDetails = res.data.sort(
              (a: any, b: any) => b.bidAmount - a.bidAmount
            );
            setParticularBidDetails(sortedBidDetails);
          });
        setParticularAdsDetails(res.data);
        setAdSelectedId(id);
        setEdit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  function to update a particular ad
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

  // function to handle bid amount
  const [bidAmount, setBidAmount] = useState("");
  const [bidAmountError, setBidAmountError] = useState("");

  const handleBidAmount = (event: any) => {
    const amount = event.target.value;
    setBidAmount(amount);

    if (amount < 1 || amount > 100) {
      setBidAmountError("**Bid Amount should be between 1 and 100");
    } else {
      setBidAmountError("");
    }
  };

  // useeffect to set the edited ad data
  useEffect(() => {
    const tempId = localStorage.getItem("clientId");
    if (tempId) {
      setClientId(tempId);
    }
    console.log("cliendId campaigns page", clientId);
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
        setDeletedAdToaster(true);
        getAllCampaigns();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUpdateBidAmount() {
    const id = clientId || localStorage.getItem("clientId");
    await axios
      .patch(`http://localhost:3000/bids/${id}`, {
        bidAmount: Number(newBidAmount),
      })
      .then((res) => {
        console.log("Updated Bid Details", res.data);
        setEditBidModal(false);
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
                        if (e.target.files && e.target.files.length > 0) {
                          setAdFile(e.target.files[0]);
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
                    label="Location (Will Implement In Future Release)"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("location")}
                    required
                  />
                  <TextField
                    id="start-date"
                    variant="standard"
                    label="Start Date"
                    placeholder="Start Date"
                    type="date"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    value={adStartDate}
                    onChange={handleStartDateChange}
                    required
                  />
                  <TextField
                    id="end-date"
                    label="End Date"
                    variant="standard"
                    type="date"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    value={adEndDate}
                    onChange={handleEndDateChange}
                    required
                  />
                  {dateError && <p style={{ color: "red" }}>{dateError}</p>}
                  <Divider />

                  <TextField
                    id="standard-basic"
                    label="Bid Amount per user (DFT)"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    value={bidAmount}
                    onChange={handleBidAmount}
                    required
                  />
                  {bidAmountError && (
                    <p
                      style={{
                        color: "red",
                        fontWeight: "600",
                        fontSize: "100%",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {bidAmountError}
                    </p>
                  )}
                  {/* Rest of your code */}

                  <TextField
                    id="standard-basic"
                    label="Budget Amount Per Day (DFT)"
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
                allAdsDetails.toReversed().map((item: any, index: any) => (
                  <div
                    className="adDetails"
                    key={index}
                    onClick={() => navigate("/campaign-details")}
                  >
                    <div className="campaignNameDetails">{item.adName}</div>
                    <div className="bidStrategyDetails">
                      {item.bidAmount} DFT
                    </div>
                    <div className="budgetDFTDetails">{item.perDay} DFT</div>
                    <div
                      className="editCampaignDetails"
                      onClick={(e) => getParticularCampaign(item._id, e)}
                    >
                      <EditIcon />
                    </div>
                    <div className="typeDetails">
                      {/* {item.campaignType ? item.campaignType : "N.A."} */}
                      {item.campaignType}
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
                          Ad Name:
                        </h2>

                        <h2 className="modalBodyCampaignsPageHeading">
                          {" "}
                          {particularAdsDetails.adName}
                        </h2>
                      </div>
                      <div className="modalBodyCampaignsPageMiddle">
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
                        <div className="modalBodyCampaignsPageBottomContent">
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
                            <p className="notagsadded">
                              <p>No Tags Added, so no data available</p>
                            </p>
                          )}
                        </div>

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
                                <div
                                  className={
                                    item.adId == particularAdsDetails._id
                                      ? "bidModalArrayDivActive"
                                      : "bidModalArrayDiv"
                                  }
                                  key={index}
                                >
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
                            Ad Name:-
                          </h2>
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
                              <p className="notagsadded">
                                <p>No Tags Added, so no data available</p>
                              </p>
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
                        {/* <div className="modalClientDetails">
                          <div className="bidModalHeadingDiv">
                            <h3 className="bidsModalHeadingSno">S.No</h3>
                            <h3 className="bidsModalHeadingClientName">
                              Client Name
                            </h3>
                            <h3 className="bidsModalHeadingOption">Option 1</h3>
                            <h3 className="bidsModalHeadingOption">Option 2</h3>
                          </div>
                        </div> */}
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
                      <button
                        className="modalFooterButtonBidsCampaignsPage"
                        onClick={() => {
                          setEdit(false);
                          setEditBidModal(true);
                        }}
                      >
                        Edit Bid for this Ad
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
          {editBidModal && (
            <Modal
              open={editBidModal}
              onClose={() => setEditBidModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style2}>
                <div className="editBidModalDiv">
                  <div className="editBidModalDivTop">
                    <div className="editBidModalAdName">
                      {particularAdsDetails.adName}
                    </div>
                    <div className="editBidModalAdId">
                      Ad Id: {particularAdsDetails._id}
                    </div>
                  </div>
                  <div className="editBidModalDivBody">
                    Current Bid Amount (per user) :{" "}
                    {particularAdsDetails.bidAmount} DFT
                  </div>
                  <div className="editBidModalDivEdit">
                    <div className="editBidModalDivEditLeft">
                      New Bid Amount (per user) :{" "}
                    </div>
                    <div className="editBidModalDivEditRight">
                      <input
                        type="text"
                        className="editBidModalDivEditInput"
                        value={newBidAmount}
                        onChange={(e) => setNewBidAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="modalFooterCampaignsPage2">
                    <button
                      className="modalFooterButtonDeleteCampaignsPage2"
                      onClick={() => setEditBidModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="modalFooterButtonEditCampaignsPage2"
                      onClick={handleUpdateBidAmount}
                    >
                      Update Bid
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          )}
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
        {createdAdToaster && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={createdAdToaster}
            autoHideDuration={6000}
            onClose={() => {
              setCreatedAdToaster(false);
            }}
          >
            <Alert
              onClose={handleToastClose}
              severity="success"
              sx={{ width: "20vw", height: "5vh", fontSize: "1rem" }}
            >
              New Ad Created
            </Alert>
          </Snackbar>
        )}
        {deletedAdToaster && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={deletedAdToaster}
            autoHideDuration={6000}
            onClose={() => {
              setDeletedAdToaster(false);
            }}
          >
            <Alert
              onClose={handleToastClose}
              severity="error"
              sx={{ width: "20vw", height: "5vh", fontSize: "1rem" }}
            >
              Ad Deleted Successfully
            </Alert>
          </Snackbar>
        )}
      </div>
    </>
  );
}
