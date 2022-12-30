import { Box, Button, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import user from "../../assets/userIcon.png";
import Grid from "@mui/material/Grid";
// import "./profile.css";
import "./profilep.css";

import Typography from "@mui/material/Typography";

// import "./profile.css";
import ImageUploading, { ImageListType } from "react-images-uploading";

import data from "./data.json";

export default function Profile() {
  const [editButton, setEditButton] = useState(false);
  const [name, setName] = useState(data["cname"]);
  const [type, setType] = useState(data["ctype"]);
  const [num, setNum] = useState(data["cnum"]);
  const [addr1, setAddr1] = useState(data["cadd1"]);
  const [addr2, setAddr2] = useState(data["cadd2"]);
  const [images, setImages] = React.useState([]);
  const [remove, setRemove] = useState(true);
  const removeImg = () => {
    setRemove(false);
  };

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };
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
    <>
      <div>
        <Sidebar />
      </div>
      <div>
        <div className="profileText">Profile</div>
        <Box
          bgcolor={"#DDE2EA"}
          sx={{
            position: "absolute",
            top: "14vh",
            height: "80vh",
            width: "70vw",
            left: "24vw",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.75)",
          }}
          className="box"
        >
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
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={onChange}
                      maxNumber={1}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <>
                          <img src={user} className="profileImg" />
                          <button
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                            className="uploadButton"
                            onClickCapture={removeImg}
                          >
                            Click
                          </button>
                          {/* {!remove && (
                            <div>
                              {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                  <img
                                    src={image["data_url"]}
                                    alt=""
                                    width="100"
                                    className="profileImg"
                                    style={{ zIndex: 10 }}
                                  />
                                </div>
                              ))}
                            </div>
                          )} */}
                        </>
                      )}
                    </ImageUploading>
                    {/* <ImageUploading
                      multiple
                      value={images}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <button
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            Click
                          </button>
                          {imageList.map((image, index) => (
                            <div key={index} className="image-item profileImg">
                              <img src={image["data_url"]} alt="" width="100" />
                            </div>
                          ))}
                        </div>
                      )}
                    </ImageUploading> */}
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
      </div>
    </>
  );
}
