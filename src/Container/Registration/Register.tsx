import React from "react";
import "./Register.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import image from "../../assets/dframe.png";
const Registration = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyA0W8Q-1GnDwxio_8kCogoa2LjVXHUhlk8",
    authDomain: "cd-1-2759c.firebaseapp.com",
    projectId: "cd-1-2759c",
    storageBucket: "cd-1-2759c.appspot.com",
    messagingSenderId: "838720677821",
    appId: "1:838720677821:web:d6cce76367cdaaabbb14d4",
    measurementId: "G-WQWP4HZ3W3",
  };
  const app = initializeApp(firebaseConfig);
  let appVerifier = (window as any).recaptchaVerifier;
  const auth = getAuth();
  auth.languageCode = "en";
  const countryId = "+91";
  return (
    <div>
      <script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      ></script>

      <div className="dframeHeadingAndImageDiv">
        <div className="dframeImageDivRegisterPage">
          <img
            src={image}
            alt="dframe logo"
            className="dframeImageRegisterPage"
          />
        </div>
        <div className="dframeHeadingRegisterPage">
          Welcome to D-Frame Client Registration Portal
        </div>
      </div>
      <div className="mainRegisterPage">
        <div className="registerFormDiv">
          <div className="registerFormOuterDiv">
            <div className="registerFormEntryDiv">
              <div className="registerFormHeading">Company Name</div>
              <div className="registerFormColon">:</div>
              <div className="registerFormInput">
                <input type="text" className="registerFormInputField" />
              </div>
            </div>
            <div className="registerFormEntryDiv">
              <div className="registerFormHeading">Company Type</div>
              <div className="registerFormColon">:</div>
              <div className="registerFormInput">
                <input type="text" className="registerFormInputField" />
              </div>
            </div>
            <div className="registerFormEntryDiv">
              <div className="registerFormHeading">Company Address1</div>
              <div className="registerFormColon">:</div>
              <div className="registerFormInput">
                <input type="text" className="registerFormInputField" />
              </div>
            </div>
            <div className="registerFormEntryDiv">
              <div className="registerFormHeading">Company Address2</div>
              <div className="registerFormColon">:</div>
              <div className="registerFormInput">
                <input type="text" className="registerFormInputField" />
              </div>
            </div>
            <div className="registerFormEntryDiv1">
              <div className="registerFormEntryDiv1Top">
                <div className="registerFormHeadingVerify">Company Email</div>
                <div className="registerFormColonVerify">:</div>
                <div className="registerFormInputVerify">
                  <input type="text" className="registerFormInputFieldVerify" />
                </div>
              </div>
              <div className="registerFormEntryDiv1Bottom">
                <button className="registerFormVerifyButton">
                  Verify Email
                </button>
              </div>
            </div>
            <div className="registerFormEntryDiv1">
              <div className="registerFormEntryDiv1Top">
                <div className="registerFormHeadingVerify">Company Phone</div>
                <div className="registerFormColonVerify">:</div>
                <div className="registerFormInputVerify">
                  <input type="text" className="registerFormInputFieldVerify" />
                </div>
              </div>
              <div className="registerFormEntryDiv1Bottom">
                <button className="registerFormVerifyButton">
                  Verify Phone
                </button>
                <div className="recaptcha-container">
                  <div id="recaptcha-container"></div>
                </div>
              </div>
            </div>
            <button
              className="registerFormSubmitButton"
              // onClick={handleSubmitPhoneNumber}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
