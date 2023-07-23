import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      navigate("/dashboard");

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
          console.log(error.response.status);
          console.log(error.response.statusText);
          console.log(error.response.headers);
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
