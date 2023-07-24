import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
// import "./login.css";
const firebaseConfig = {
  apiKey: "AIzaSyCYpkhlVsy1eO1vVuRNpa6l1CWONEKiXU8",
  authDomain: "client-dashboard-2.firebaseapp.com",
  projectId: "client-dashboard-2",
  storageBucket: "client-dashboard-2.appspot.com",
  messagingSenderId: "578943720826",
  appId: "1:578943720826:web:d6d52242c9743e540d0ac3",
};

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const app = initializeApp(firebaseConfig); // initializing firebase app
  const auth = getAuth(); // getting auth object from firebase
  auth.languageCode = "en"; // setting language code to english

  const actionCodeSettings = {
    url: "http://localhost:3000/dashboard",
    // This must be true.
    handleCodeInApp: true,
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handling the form submission logic
    try {
      const response = await axios.post("http://localhost:3000/admin/login", {
        email,
        password,
      });

      console.log(response.data);

      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem("emailForSignIn", email);
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });

      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        // The login was successful, you can perform any additional actions here
        // For example, redirect the user to another page.
      }
    } catch (error) {
      console.error(error);

      // If there was an error with the request, extract the response data and status code
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data);
        }
      } else {
        // Handle other errors
        setErrorMessage("An error occurred while processing your request.");
      }
    }

    // For example, you can send the form data to a server or perform validation.
  };

  return (
    <div>
      <h1>Let's create your account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" onChange={handleEmailChange} placeholder="Email" />
        </div>
        <div>
          <input
            type="password"
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
