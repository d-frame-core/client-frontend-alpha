//  importing all necessary dependencies and modules
import React, { useState, useContext } from "react";
import "./Register.css";
import logo from "../../assets/dframe.png";
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

const Register: React.FC = () => {
  const navigate = useNavigate();
  // importing context
  const { walletAddress, setClientId, clientId } = useContext(MyContext);

  // initializing firebase
  const app = initializeApp(firebaseConfig); // initializing firebase app
  const auth = getAuth(); // getting auth object from firebase
  auth.languageCode = "en"; // setting language code to english

  //  defining state variables
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

  let appVerifier = (window as any).recaptchaVerifier; // defining recaptcha verifier

  //  function to handle submit phone number
  const handleSubmitPhoneNumber = async (event: any) => {
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
      setConfirmationResult(result as any);
      setRecaptchaVerifier(false);
    } catch (error) {
      console.error(error);
    }
  };

  //  function to handle submit otp
  const handleSubmitOtp = async (event: any) => {
    event.preventDefault();

    try {
      const result = await (confirmationResult as any).confirm(otp);
      console.log(result);
      alert("Phone number verified successfully");
      setVerified(true);
    } catch (error) {
      console.error(error);
    }
  };

  //  function to handle submit registration form
  const handleSubmit = (event: any) => {
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
        console.log("response", response.data.user._id);
        setClientId(response.data.user._id);
        localStorage.setItem("clientId", response.data.user._id);
        alert("Registration Successful, Please Login");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        // do something with error, like display an error message
      });
  };
  return (
    <div className="container">
      <div className="headerRegistration">
        <img src={logo} width={80} alt="" />
        <h2>Welcome to D-Frame Client Registration Portal</h2>
      </div>
      <form className="form">
        <p className="title">Registration Form</p>
        <div className="flex">
          <label>
            <input
              required
              placeholder=""
              type="text"
              className="inputInFlex"
            />
            <span>Company Name</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type="text"
              className="inputInFlex"
            />
            <span>Company Type</span>
          </label>
        </div>

        <label>
          <input required placeholder="" type="text" className="input" />
          <span>Company Address1</span>
        </label>

        <label>
          <input required placeholder="" type="text" className="input" />
          <span>Company Address2</span>
        </label>

        <label>
          <input required placeholder="" type="text" className="input" />
          <span>Company Email</span>
          <button className="submitOTPVerify">Verify</button>
        </label>

        {!confirmationResult ? (
          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <span>Contact Number (with Country Code)</span>
            <button
              className="submitOTPVerify"
              onClick={handleSubmitPhoneNumber}
            >
              Send Otp
            </button>
          </label>
        ) : (
          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <span>Enter OTP sent to your mobile</span>
            <button className="submitOTPVerify" onClick={handleSubmitOtp}>
              Verify
            </button>
          </label>
        )}

        {!confirmationResult && (
          <div className="recaptcha-container">
            <div id="recaptcha-container"></div>
          </div>
        )}
        {!recaptchaVerifier && (
          <button
            className="submitButtonRegistrationPage"
            disabled={verified ? false : true}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
