import React, { useState } from "react";
import firebase from "firebase/app";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import "./Registration.css";
import { initializeApp } from "firebase/app";
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
  const details = [
    "First Name",
    "Last Name",
    "UserName",
    "Email",
    "Address",
    "Phone Number",
  ];
  let u;
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "https://localhost0004.page.link/",
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.example.ios",
    },
    android: {
      packageName: "com.example.android",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "https://localhost0004.page.link/6RQi",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  auth.languageCode = "en";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [verified, setVerified] = useState(false);
  const handleSubmitEmail = async (event) => {
    console.log("email", email);
    event.preventDefault();
    try {
      console.log("inside try");
      const emailData = await sendSignInLinkToEmail(
        auth,
        email,
        actionCodeSettings
      );
      console.log("emailData", emailData);
    } catch (error) {
      console.error(error);
    }
  };
  let appVerifier = window.recaptchaVerifier;
  const handleSubmitPhoneNumber = async (event) => {
    event.preventDefault();
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
  const [value, setValue] = useState(localStorage.getItem("value") || "");

  const handleChange = (event) => {
    setValue(event.target.value);
    localStorage.setItem("value", event.target.value);
  };
  return (
    // <>

    //   <input type="text" value={value} onChange={handleChange} />
    //   <form onSubmit={handleSubmitEmail}>
    //     <input
    //       type="emal"
    //       name="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <button type="submit">Verify Email</button>
    //   </form>
    // </>
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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="detailValue"
                      placeholder="Enter First Name"
                    />
                  )}
                  {index === 1 && (
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="detailValue"
                      placeholder="Enter Last Name"
                    />
                  )}
                  {index === 2 && (
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="detailValue"
                      placeholder="Enter User Name"
                    />
                  )}
                  {index === 3 && (
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="detailValue"
                      placeholder="Enter Email"
                    />
                  )}
                  {index === 4 && (
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="detailValue"
                      placeholder="Enter Address"
                    />
                  )}
                  {index === 5 && (
                    <>
                      {!confirmationResult ? (
                        <form onSubmit={handleSubmitPhoneNumber}>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            required
                            className="phoneVerify"
                          />
                          <div id="recaptcha-container"></div>
                          <button type="submit" className="otp">
                            Send OTP
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleSubmitOtp}>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            required
                            className="phoneVerify"
                          />
                          <button type="submit" className="otp">
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
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
