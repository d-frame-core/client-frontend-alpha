import { Box, Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import user from "../../assets/userIcon.png";
// import "./profile.css";
import "./profilep.css";
import data from "./data.json";

export default function Profile() {
  const l = [
    "Company Name",
    "Company Type",
    "Company Number",
    "Company E-mail",
    "Company Address1",
    "Company Address2",
    "Wallet Address",
  ];
  return (
    <div>
      <Sidebar />
      {/* <img className='pim1' src={user} alt=''/
      <div className='ptext1'>Profile</div>
      <div className='ptext2'>Company Name :</div>
      <div className='ptext3'>Company Type :</div>
      <div className='ptext4'>Company Number :</div>
      <div className='ptext5'>Company E-Mail :</div>
      <div className='ptext6'>Company Address 1:</div>
      <div className='ptext7'>Company Address 2:</div>
      <div className='ptext8'>Wallet Address :</div>
      <div className='ptext9'><b>Profile Improvement :</b>This enables us to know about you betterand show more relevent ads</div>
      <div className='ptext10'>History</div>
      <div className='ptext11'><b>Wallet Balance<br></br>
      345 DFT</b></div>

      <div><input className='pin1' placeholder=''/></div>
      <div><input className='pin2' placeholder=''/></div>
      <div><input className='pin3' placeholder=''/></div>
      <div><input className='pin4' placeholder=''/></div>
      <div><input className='pin5' placeholder=''/></div>
      <div><input className='pin6' placeholder=''/></div>
      <div><input className='pin7' placeholder=''/></div>
      
      

        <div className='prect1'></div>
        <div className='prect2'></div>
        <div className='prect3'></div>
        <div className='prect4'></div>
        <div className='prect5'></div>
        <div className='prect6'></div>
        <div className='prect7'></div>

        <button className='pb1'>Save</button>
        <button className='pb2'>More..</button> */}
      <Box className="outerBox">
        <h2
          className="profileTitle"
          style={{
            color: "#1C1F37",
            paddingLeft: "30px",

            fontWeight: 600,
            paddingBottom: 0,
            marginBottom: 0,
            fontSize: "30px",
          }}
        >
          Profile
        </h2>
        <Box
          sx={{
            top: "15%",
            left: "30%",

            height: "65vh",
            width: "50vw",
            // padding: "20px",
            margin: "auto",
            marginX: "auto",
            marginBottom: "30px",
            zIndex: 1,
            bgcolor: "white",
            borderRadius: "20px",
            display: "flex",
          }}
        >
          <div>
            <img src={user} className="profileImg" />
          </div>
          <div className="details">
            {/* {l.map((item) => {
              return (
                <div className="detailsDisplay">
                  <h3 className="cname">{item}:</h3>{" "}
                  <p className="cdetails">{data.waddr}</p>
                </div>
              );
            })} */}
            <div className="detailsDisplay">
              <h3 className="cname">Company Name:</h3>
              <p className="cdetails">{data["cname"]}</p>
            </div>
            <div className="detailsDisplay">
              <h3 className="cname">Company Type:</h3>
              <p className="cdetails">{data["cnum"]}</p>
            </div>
            <div className="detailsDisplay">
              <h3 className="cname">Company E-Mail:</h3>
              <p className="cdetails">{data["cmail"]}</p>
            </div>
            <div className="detailsDisplay">
              <h3 className="cname">Company Address1:</h3>
              <p className="cdetails">{data["cadd1"]}</p>
            </div>
            <div className="detailsDisplay">
              <h3 className="cname">Company Addrress2:</h3>
              <p className="cdetails">{data["cadd2"]}</p>
            </div>
            <div className="detailsDisplay">
              <h3 className="cname">Wallet Address:</h3>
              <p className="cdetails">{data["waddr"]}</p>
            </div>
            <button className="editButton">
              <p className="buttonText">Edit</p>
            </button>
          </div>
        </Box>
      </Box>
    </div>
  );
}
