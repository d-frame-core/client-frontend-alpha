import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import "./Registration.css";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { MyContext } from "../../components/context/Context";
const firebaseConfig = {
  apiKey: "AIzaSyCYpkhlVsy1eO1vVuRNpa6l1CWONEKiXU8",
  authDomain: "client-dashboard-2.firebaseapp.com",
  projectId: "client-dashboard-2",
  storageBucket: "client-dashboard-2.appspot.com",
  messagingSenderId: "578943720826",
  appId: "1:578943720826:web:d6d52242c9743e540d0ac3",
};

const PhoneVerification = () => {
  const navigate = useNavigate();
  const { walletAddress, setId, _id } = useContext(MyContext);
  const details = [
    "Company Name",
    "Company Type",
    "Company Email",
    "Company Address1",
    "Company Address2",
    "Phone Number",
  ];
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  auth.languageCode = "en";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [companyAddress1, setCompanyAddress1] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyAddress2, setCompanyAddress2] = useState("");
  const [verified, setVerified] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(false);
  let appVerifier = window.recaptchaVerifier;
  const handleSubmitPhoneNumber = async (event) => {
    event.preventDefault();
    setRecaptchaVerifier(true);
    appVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth);
    console.log("appVerifier", appVerifier);
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      console.log(result);
      setConfirmationResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitOtp = async (event) => {
    event.preventDefault();

    try {
      const result = await confirmationResult.confirm(otp);
      console.log(result);
      alert("Phone number verified successfully");
      setVerified(true);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log("walletAddress", walletAddress);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/users/signup", {
        companyName,
        companyType,
        companyEmail,
        companyAddress1,
        companyAddress2,
        walletAddress,
      })
      .then((response) => {
        console.log(response.data.user._id);
        // do something with response, like display a success message
        // console.log("response ID", response.data.id);
        setId(response.data.user._id);
        localStorage.setItem("id", response.data.user._id);
        alert("Registration Successful, Please Login");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        // do something with error, like display an error message
      });
  };
  return (
    <div className="body">
      <div className="container">
        <div className="title">Client Profile</div>
        <div className="content">
          {details.map((detail, index) => {
            return (
              <div className="user-details" key={index}>
                <div className="detailTitle">{detail}</div>
                <div className="colon">:</div>
                <div>
                  {index === 0 && (
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="detailValue"
                      placeholder="Enter Company Name"
                    />
                  )}
                  {index === 1 && (
                    <input
                      type="text"
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      className="detailValue"
                      placeholder="Enter Company Type"
                    />
                  )}
                  {index === 2 && (
                    <input
                      type="email"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      className="detailValue"
                      placeholder="Enter Company Email"
                    />
                  )}
                  {index === 3 && (
                    <input
                      type="text"
                      value={companyAddress1}
                      onChange={(e) => setCompanyAddress1(e.target.value)}
                      className="detailValue"
                      placeholder="Enter Address"
                    />
                  )}
                  {index === 4 && (
                    <input
                      type="text"
                      value={companyAddress2}
                      onChange={(e) => setCompanyAddress2(e.target.value)}
                      className="detailValue"
                      placeholder="Enter Address contd."
                    />
                  )}
                  {/* {index === 5 && (
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="detailValue"
                      placeholder="Enter Wallet Address"
                    />
                  )} */}
                  {index === 5 && (
                    <>
                      {!confirmationResult ? (
                        <form onSubmit={handleSubmitPhoneNumber}>
                          {!recaptchaVerifier && (
                            <>
                              <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter phone number"
                                required
                                className="phoneVerify"
                              />
                              <button type="submit" className="otp">
                                Send OTP
                              </button>
                            </>
                          )}
                          <div id="recaptcha-container"></div>
                        </form>
                      ) : (
                        <form>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            required
                            className="phoneVerifyOtp"
                          />
                          <button
                            type="submit"
                            className="otp"
                            onClick={handleSubmitOtp}
                          >
                            Verify
                          </button>
                        </form>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="btndiv">
          <button
            className={verified ? "btn" : "btnDisabled"}
            disabled={verified ? false : true}
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
