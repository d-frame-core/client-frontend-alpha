import React, { useState } from "react";
import "./campaigns.css";
import Sidebar from "../../components/sidebar/Sidebar";
import CampaignForm from "./CampaignForm/CampaignForm";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";

export default function Campaigns() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log("open");
  };
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    zIndex: 1000,
  };
  return (
    <div>
      <>
        <>{Sidebar(4)} </>
      </>
      <div className="campaignsPage">Campaigns</div>
      <div className="campaignsBox">
        <div>
          <div className="campaignsTitle">Campaigns</div>
          <button className="createCampaign">
            <CampaignForm />
          </button>
        </div>
        <div className="campaignsPointer">
          <div className="element1">Campaign Name</div>
          <div className="element1">Activity &gt;</div>
          <div className="element1">Bid Strategy</div>
          <div className="element1">Budget</div>
          <div className="element1">Reach</div>
          <div className="element1">Type</div>
          <div className="element1">Time</div>
        </div>
        <div className="campaignsWhite"></div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
      {/* <div className="crect1"></div>
      <div className="crect2"></div>
      <div className="crect3"></div>

      <div className="c1">Campaigns</div>
      <div className="c2">Campaign Name</div>
      <div className="c3">Activity </div>
      <div className="c4">Bid strategy</div>
      <div className="c5">Budget</div>
      <div className="c6">Reach</div>
      <div className="c7">Type</div>
      <div className="c8">Time</div>
      <div className="c9">No Ads Generated yet</div> */}
      {/* 
      <button className="cbtn1">
        {" "}
        <CampaignForm />
      </button>
      <button className="cbtn2">Create Ad</button> */}
    </div>
  );
}
