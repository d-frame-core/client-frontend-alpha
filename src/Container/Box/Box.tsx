import { Box, Button, Container, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Typography from "@mui/material/Typography";
import user from "../../assets/userIcon.png";
// import "./profile.css";
import "./box.css";
import data from "./data.json";
const Boxx = () => {
  const [editButton, setEditButton] = useState(false);
  const [name, setName] = useState(data["cname"]);
  const [type, setType] = useState(data["ctype"]);
  const [num, setNum] = useState(data["cnum"]);
  const [addr1, setAddr1] = useState(data["cadd1"]);
  const [addr2, setAddr2] = useState(data["cadd2"]);
  const handleEdit = () => {
    setEditButton(!editButton);
  };
  const handleSave = () => {
    setEditButton(!editButton);
    console.log(name);
    console.log(type);
    console.log(num);
    console.log(addr1);
    console.log(addr2);
  };
  return (
    <Box
      bgcolor={"#DDE2EA"}
      sx={{
        position: "absolute",
        top: "14vh",
        height: "80vh",
        width: "70vw",
        left: "25vw",
        borderRadius: "10px",
        boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.75)",
      }}
    >
      {/* <h2
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
          {l.map((item) => {
          return (
            <div className="detailsDisplay">
              <h3 className="cname">{item}:</h3>{" "}
              <p className="cdetails">{data.waddr}</p>
            </div>
          );
        })}
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
      </Box> */}
      <Typography
        style={{ margin: "20px" }}
        variant="h4"
        className="profileTitle"
      >
        Profile
      </Typography>
      {!editButton && (
        <Box
          bgcolor={"#FFFFFF"}
          sx={{
            position: "relative",
            height: "60vh",
            width: "50vw",
            margin: "auto",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.75)",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <div>
                <img src={user} className="profileImg" />
              </div>
            </Grid>
            <Grid item xs={3}>
              <p className="detailsTitle" style={{ lineHeight: 2.7 }}>
                Company Name
              </p>
              <p className="detailsTitle">Company Type</p>
              <p className="detailsTitle" style={{ lineHeight: 2.7 }}>
                Company E-mail
              </p>
              <p className="detailsTitle">Company Address1</p>
              <p className="detailsTitle" style={{ lineHeight: 2.7 }}>
                Company Address2
              </p>
              <p className="detailsTitle">Wallet Address</p>
            </Grid>
            <Grid item xs={1}>
              <p className="colon">:</p>
              <p className="colon">:</p>
              <p className="colon">:</p>
              <p className="colon">:</p>
              <p className="colon">:</p>
              <p className="colon">:</p>
            </Grid>
            <Grid item xs={4}>
              <p className="detailInfo" style={{ lineHeight: 2.5 }}>
                {data.cname}
              </p>
              <p className="detailInfo" style={{ lineHeight: 2.1 }}>
                {data.ctype}
              </p>
              <p className="detailInfo" style={{ lineHeight: 2.1 }}>
                {data.cnum}
              </p>
              <p className="detailInfo" style={{ lineHeight: 2 }}>
                {data["cadd1"]}
              </p>
              <p className="detailInfo" style={{ lineHeight: 2.7 }}>
                {data["cadd2"]}
              </p>
              <p className="detailInfo" style={{ lineHeight: 1.4 }}>
                {data["waddr"]}
              </p>
            </Grid>
          </Grid>
          <Button
            sx={{ left: "13vw" }}
            variant="contained"
            color="info"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Box>
      )}
      {editButton && (
        <Box
          bgcolor={"#FFFFFF"}
          sx={{
            position: "relative",
            height: "60vh",
            width: "50vw",
            margin: "auto",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.75)",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <div>
                <img src={user} className="profileImg" />
              </div>
            </Grid>
            <Grid item xs={3}>
              <p className="detailsTitle" style={{ lineHeight: 2.7 }}>
                Company Name
              </p>
              <p className="detailsTitle">Company Type</p>
              <p className="detailsTitle" style={{ lineHeight: 2.7 }}>
                Company E-mail
              </p>
              <p className="detailsTitle">Company Address1</p>
              <p className="detailsTitle" style={{ lineHeight: 2.7 }}>
                Company Address2
              </p>
              <p className="detailsTitle">Wallet Address</p>
            </Grid>
            <Grid item xs={1}>
              <p className="colon">:</p>
              <p className="colon">:</p>
              <p className="colon">:</p>
              <p className="colon">:</p>
              <p className="colon">:</p>
              <p className="colon">:</p>
            </Grid>
            <Grid item xs={4}>
              <p className="detailInfoInput" style={{ lineHeight: "3" }}>
                <input
                  type="text"
                  className="inputField"
                  value={name}
                  placeholder={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
              <p className="detailInfoInput">
                <input
                  type="text"
                  className="inputField"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </p>
              <p className="detailInfoInput" style={{ lineHeight: "2" }}>
                <input
                  type="text"
                  className="inputField"
                  value={num}
                  onChange={(e) => setNum(e.target.value)}
                />
              </p>
              <p className="detailInfoInput" style={{ lineHeight: "2.5" }}>
                <input
                  type="text"
                  className="inputField"
                  value={addr1}
                  onChange={(e) => setAddr1(e.target.value)}
                />
              </p>
              <p className="detailInfoInput" style={{ lineHeight: "2" }}>
                <input
                  type="text"
                  className="inputField"
                  value={addr2}
                  onChange={(e) => setAddr2(e.target.value)}
                />
              </p>
              <p className="detailInfoInput" style={{ lineHeight: "2.1" }}>
                {data["waddr"]}
              </p>
            </Grid>
          </Grid>
          <Button
            sx={{ left: "13vw" }}
            variant="contained"
            color="info"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Boxx;
