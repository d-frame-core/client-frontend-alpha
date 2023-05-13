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
  const { _id, token } = React.useContext(MyContext);
  const [tagsExist, setTagsExist] = useState(false);
  const [allAdsDetails, setAllAdsDetails] = useState<any>([]);
  const [particularAdsDetails, setParticularAdsDetails] = useState<any>();
  const [edit, setEdit] = useState(false);
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
  async function submitAdCampaign() {
    const clientId = _id || localStorage.getItem("id");
    console.log("id", clientId);
    await axios
      .post("http://localhost:3000/ads", {
        clientId: clientId,
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
      .then((res) => {
        console.log(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("Ads tags are", adTags);
    // "643d60b5f70acc7cd413b405"
    setFormopen(false);
  }
  const removeTag = (indexToRemove: number) => {
    setAdTags(adTags.filter((_: any, index: any) => index !== indexToRemove));
  };

  async function getAllCampaigns() {
    const id = _id || localStorage.getItem("id");
    await axios
      .get(`http://localhost:3000/ads/client/${id}`)
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
    await axios
      .get(`http://localhost:3000/ads/${id}`)
      .then((res) => {
        console.log("Particular Ad Details", res.data);
        setParticularAdsDetails(res.data);
        setEdit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllCampaigns();
  }, []);

  useEffect(() => {
    // console.log("Particular Ads Details", allAdsDetails);
  }, [getAllCampaigns]);

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
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("campaignType")}
                    onChange={(e) => setCampaignType(e.target.value)}
                    required
                  />
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
                    <input type="file" className="hidden" id="files" />
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
              <div className="campaignNameHeading">Campaign Name</div>
              <div className="bidStrategy">Bid Strategy</div>
              <div className="budgetDFT">Budget (DFT)</div>
              <div className="editCampaignHeading">Edit</div>
              <div className="typeHeading">Type</div>
              <div className="reachHeading">Reach</div>
              <div className="startDateCampaign">Start Date</div>
              <div className="endDateCampgin">End Date</div>
            </div>

            <div className="campaignsDetails">
              {allAdsDetails &&
                allAdsDetails.map((item: any, index: any) => (
                  <div className="adDetails" key={index}>
                    <div className="campaignNameDetails">{item.adName}</div>
                    <div className="bidStrategyDetails">Normal(S)</div>
                    <div className="budgetDFTDetails">34(S)</div>
                    <div
                      className="editCampaignDetails"
                      onClick={(e) => getParticularCampaign(item._id)}
                    >
                      <EditIcon />
                    </div>
                    <div className="typeDetails">Active(S)</div>
                    <div className="reachDetails">5000(S)</div>
                    <div className="startDateCampaignDetails">
                      {item.startDate}
                    </div>
                    <div className="endDateCampginDetails">{item.endDate}</div>
                  </div>
                ))}
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
                        {particularAdsDetails.adContent}
                      </p>
                    </div>
                    <div className="modalBodyCampaignsPageBottom">
                      <div className="modalBodyCampaignsPageBottomLeft">
                        <p className="modalBodyCampaignsPageBottomTitle">
                          Ad Tags:-{" "}
                        </p>

                        <p className="modalBodyCampaignsPageBottomContent">
                          {particularAdsDetails.tags.length > 0 ? (
                            // if tags length more than 4, display 4 tags and show .... after that
                            particularAdsDetails.tags.length > 4 ? (
                              particularAdsDetails.tags
                                .slice(0, 4)
                                .map((tag: any, index: any) => (
                                  <div
                                    key={index}
                                    className="tagAddedDivCampaignsPage"
                                  >
                                    <p>{tag}</p>
                                    {
                                      // add comma to all tags without last tag
                                      index !== 3 && (
                                        <p className="tagAddedDivCampaignsPageComma">
                                          ,
                                        </p>
                                      )
                                    }
                                    {/* now add ..... at last after adding 4 tags */}
                                    {index === 3 && (
                                      <p className="tagAddedDivCampaignsPageComma">
                                        {" "}
                                        ......
                                      </p>
                                    )}
                                  </div>
                                ))
                            ) : (
                              particularAdsDetails.tags.map(
                                (tag: any, index: any) => (
                                  <div
                                    key={index}
                                    className="tagAddedDivCampaignsPage"
                                  >
                                    <p>{tag}</p>
                                    {
                                      // add comma to all tags without last tag
                                      index !==
                                        particularAdsDetails.tags.length -
                                          1 && (
                                        <p className="tagAddedDivCampaignsPageComma">
                                          ,
                                        </p>
                                      )
                                    }
                                  </div>
                                )
                              )
                            )
                          ) : (
                            <div className="notagsadded">
                              <p>No Tags Added so no data available</p>
                            </div>
                          )}
                        </p>
                      </div>
                      {/* users reached */}
                      <div className="modalBodyCampaignsPageBottomRight">
                        <p className="modalBodyCampaignsPageBottomTitle2">
                          Users Reached:-{" "}
                        </p>

                        <p className="modalBodyCampaignsPageBottomContent">
                          {particularAdsDetails.users.length > 0 ? (
                            // if tags length more than 4, display 4 tags and show .... after that
                            particularAdsDetails.users.length > 4 ? (
                              particularAdsDetails.tags
                                .slice(0, 4)
                                .map((tag: any, index: any) => (
                                  <div
                                    key={index}
                                    className="tagAddedDivCampaignsPage"
                                  >
                                    <p>{tag}</p>
                                    {
                                      // add comma to all tags without last tag
                                      index !== 3 && (
                                        <p className="tagAddedDivCampaignsPageComma">
                                          ,
                                        </p>
                                      )
                                    }
                                    {/* now add ..... at last after adding 4 tags */}
                                    {index === 3 && (
                                      <p className="tagAddedDivCampaignsPageComma">
                                        {" "}
                                        ......
                                      </p>
                                    )}
                                  </div>
                                ))
                            ) : (
                              particularAdsDetails.users.map(
                                (user: any, index: any) => (
                                  <div
                                    key={index}
                                    className="tagAddedDivCampaignsPage"
                                  >
                                    <p>{user}</p>
                                    {
                                      // add comma to all tags without last tag
                                      index !==
                                        particularAdsDetails.tags.length -
                                          1 && (
                                        <p className="tagAddedDivCampaignsPageComma">
                                          ,
                                        </p>
                                      )
                                    }
                                  </div>
                                )
                              )
                            )
                          ) : (
                            <div className="notagsadded">
                              <p>No Users Reached so no data available</p>
                            </div>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="modalBodyCampaignsPageBottomDateSection">
                      <div className="startDateCampaignsPage">
                        <p className="startDateCampaignsPageTitle">
                          Start Date:-{" "}
                        </p>
                        <p className="startDateCampaignsPageContent">
                          {particularAdsDetails.startDate}
                        </p>
                      </div>
                      <div className="endDateCampaignsPage">
                        <p className="endDateCampaignsPageTitle">End Date:- </p>
                        <p className="endDateCampaignsPageContent">
                          {particularAdsDetails.endDate}
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
                </Box>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
