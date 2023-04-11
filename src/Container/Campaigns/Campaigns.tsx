import { Box } from "@mui/system";
import Sidebar from "../../components/sidebar/Sidebar";
import "./campaigns.css";
import Divider from "@mui/material/Divider";
import {
  Backdrop,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

const typesofads: any[] = [
  { value: "Image", label: "Image" },
  { value: "Video", label: "Video" },
];
const dataofcampaigns: any[] = [
  {
    camname: "ad1",
    act: "active",
    bid: "normal",
    budget: "500",
    reach: "5k",
    type: "video",
    time: "10",
  },
  {
    camname: "ad1",
    act: "active",
    bid: "normal",
    budget: "500",
    reach: "5k",
    type: "video",
    time: "10",
  },
];
export default function Campaigns() {
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
                </button>
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
                    // onChange={(e) => setcampaignName(e.target.value)}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="Campaign Type"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("campaignType")}
                    // onChange={(e) => setcampaignName(e.target.value)}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="Ad Name"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("Ad Name")}
                    // onChange={(e) => setcampaignName(e.target.value)}
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
                  >
                    {typesofads.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    id="standard-basic"
                    label="Ad Url"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%" }}
                    {...register("Ad URL")}
                    // onChange={(e) => setcampaignName(e.target.value)}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="Ad Content"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("Ad Content")}
                    // onChange={(e) => setcampaignName(e.target.value)}
                    required
                  />
                </div>
              )}
              {nextpage && (
                <div className="campaignsFormBody">
                  <TextField
                    id="standard-basic"
                    label="Ad Tags"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("Ad Tags")}
                    // onChange={(e) => setcampaignName(e.target.value)}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="Location"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("location")}
                    // onChange={(e) => setcampaignName(e.target.value)}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="Budget (DFT)"
                    variant="standard"
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("budget")}
                    // onChange={(e) => setcampaignName(e.target.value)}
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
                    // onChange={handleStartDateChange}
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="End Date"
                    variant="standard"
                    type={"date"}
                    sx={{ left: "2vw", width: "90%", marginTop: "1.5vh" }}
                    {...register("endDate")}
                    // onChange={handleEndDateChange}
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
                  // onClick={() => setNextpage(true)}
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
              <div className="statusCampaignHeading">Status</div>
              <div className="editCampaignHeading">Edit</div>
              <div className="typeHeading">Type</div>
              <div className="reachHeading">Reach</div>
              <div className="startDateCampaign">Start Date</div>
              <div className="endDateCampgin">End Date</div>
            </div>

            <div className="campaignsDetails">
              <div className="adDetails">
                <div className="campaignNameDetails">Campaign 1</div>
                <div className="bidStrategyDetails">Normal</div>
                <div className="budgetDFTDetails">34</div>
                <div className="statusCampaignDetailss">
                  <FormControlLabel
                    label=""
                    className="statusSwitch"
                    // onClick={() => setSurveyActive(item._id)}
                    control={<Switch />}
                  />
                </div>
                <div className="editCampaignDetails">
                  <EditIcon />
                </div>
                <div className="typeDetails">Active</div>
                <div className="reachDetails">5000</div>
                <div className="startDateCampaignDetails">12-03-2023</div>
                <div className="endDateCampginDetails">31-12-2023</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
