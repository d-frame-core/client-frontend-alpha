import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import user from "../../assets/userIcon.png";
import Grid from "@mui/material/Grid";
// import "./profile.css";
import "./profilep.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { MyContext } from "../../components/context/Context";
import axios from "axios";
import { async } from "@firebase/util";
import { Navigate, useNavigate } from "react-router-dom";
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export default function Profile() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState(user);
  const [image, setImage] = useState<string | null>(null);
  const {
    _id,
    companyAddress1,
    setCompanyAddress1,
    companyAddress2,
    setCompanyAddress2,
    companyName,
    setCompanyName,
    companyType,
    setCompanyType,
    companyEmail,
    setCompanyEmail,
    walletAddress,
    setWalletAddress,
    token,
  } = useContext(MyContext);
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files![0];
  //   setFiles(URL.createObjectURL(file));
  //   convertToBase64(file).then((base64String) => {
  //     localStorage.setItem("image", base64String);
  //     setImage(base64String);
  //   });
  // };
  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    // console.log(file);
    // Read the file as a buffer
    setFiles(URL.createObjectURL(file));
    // console.log(files);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // Create a new Blob object from the buffer
      const blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);

      // Create a new FormData object and append the blob to it
      const formData = new FormData();
      formData.append("image", file);

      // Send the image to the backend using Axios
      axios
        .post("http://localhost:3000/profile/uploadProfilePicture", formData)
        .then((response) => {
          // console.log(response.data.data._id);
          // console.log("image called");
          // setImage(URL.createObjectURL(file));
          localStorage.setItem("imageID", response.data.data._id);
        })
        .catch((error) => {
          console.log("image error");
          console.error(error);
        });
    };
  };
  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleSave = async () => {
    setEdit(!edit);
    // console.log("save");
    const id = _id || localStorage.getItem("id");
    // console.log(id);
    await axios
      .patch(`http://localhost:3000/users/${id}`, {
        companyName,
        companyType,
        companyEmail,
        companyAddress1,
        companyAddress2,
        walletAddress,
      })
      .then((response) => {
        console.log("Data has been sent to the server");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(token);
  useEffect(() => {
    const id = _id || localStorage.getItem("id");
    const _token = token || localStorage.getItem("token");

    axios
      .get("http://localhost:3000/users/proctedroute", {
        headers: {
          Authorization: `Bearer ${_token}`,
        },
      })
      .then((response) => {
        if (response.data.message === "Welcome to protected routes") {
          const imageId = localStorage.getItem("imageID");
          axios
            .get(`http://localhost:3000/profile/${imageId}`)
            .then((response) => {
              console.log(response.data.data.profileImage);
              // setImage(response.data.data.profileImage.imageURL);
            });
          axios
            .get(`http://localhost:3000/users/data/${id}`)
            .then((response) => {
              const data = response.data.User;
              setCompanyName(data.companyName);
              setCompanyType(data.companyType);
              setCompanyEmail(data.companyEmail);
              setCompanyAddress1(data.companyAddress1);
              setCompanyAddress2(data.companyAddress2);
              setWalletAddress(data.walletAddress);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("Login Again. Session Expired");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);
  return (
    <div>
      <>{Sidebar(1)}</>
      <div className="Profile">
        <Box>
          <div className="profileTitle">Profile</div>
          {!edit && (
            <Box className="profileBox">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <div className="profileImage">
                    {image ? (
                      <img
                        src={image}
                        alt="user"
                        className="img"
                        id="profilePicture"
                      />
                    ) : (
                      <img
                        src={files}
                        alt="user"
                        className="img"
                        id="profilePicture"
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={7} sm={3}>
                  <div className="profileEntries">
                    <div className="profileEntriesData">Company Name </div>
                    <div className="profileEntriesData">Company Type </div>
                    <div className="profileEntriesData">Company Email </div>
                    <div className="profileEntriesData">Company Address 1 </div>
                    <div className="profileEntriesData">Company Address 2 </div>
                    <div className="profileEntriesData">Wallet Address </div>
                  </div>
                </Grid>
                <Grid item xs={0.5} sm={0.5}>
                  <div className="semiColon">
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                  </div>
                </Grid>
                <Grid item xs={5} sm={5.5}>
                  <div className="profileDetails">
                    <div className="profileDetailsData">{companyName}</div>
                    <div className="profileDetailsData">{companyType}</div>
                    <div className="profileDetailsData">{companyEmail}</div>
                    <div className="profileDetailsData">
                      {companyAddress1.length > 30
                        ? companyAddress1.slice(0, 25) + "..."
                        : companyAddress1}
                    </div>
                    <div className="profileDetailsData">{companyAddress2}</div>
                    <div className="profileDetailsData">
                      {walletAddress.slice(0, 10)}...{walletAddress.slice(27)}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <button className="editButton" onClick={() => handleEdit()}>
                Edit
              </button>
            </Box>
          )}
          {edit && (
            <Box className="profileBox">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <div className="profileImage">
                    {image ? (
                      <img src={image} alt="Stored" className="imgInEditMode" />
                    ) : (
                      <img src={files} alt="user" className="imgInEditMode" />
                    )}
                    <div className="editIMG">
                      <label className="editIcon" htmlFor="files">
                        <CreateOutlinedIcon />
                      </label>
                      <input
                        type="file"
                        className="hidden"
                        id="files"
                        onChange={handleFileChange2}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={7} sm={3}>
                  <div className="profileEntries">
                    <div className="profileEntriesData">Company Name </div>
                    <div className="profileEntriesData">Company Type </div>
                    <div className="profileEntriesData">Company Email </div>
                    <div className="profileEntriesData">Company Address 1 </div>
                    <div className="profileEntriesData">Company Address 2 </div>
                    <div className="profileEntriesData">Wallet Address </div>
                  </div>
                </Grid>
                <Grid item xs={0.5} sm={0.5}>
                  <div className="semiColon">
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                  </div>
                </Grid>
                <Grid item xs={5} sm={4.2}>
                  <div className="profileDetailsEdit">
                    <input
                      className="profileDetailsDataEdit1"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <input
                      className="profileDetailsDataEdit1"
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                    />
                    <div className="profileDetailsDataEditState">
                      {companyEmail}
                    </div>
                    <input
                      className="profileDetailsDataEdit1"
                      value={companyAddress1}
                      onChange={(e) => setCompanyAddress1(e.target.value)}
                    />
                    <input
                      className="profileDetailsDataEdit1"
                      value={companyAddress2}
                      onChange={(e) => setCompanyAddress2(e.target.value)}
                    />
                    <div className="profileDetailsDataEditState">
                      {walletAddress.slice(0, 10)}...{walletAddress.slice(27)}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <button className="editButton" onClick={() => handleSave()}>
                Save
              </button>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
}
