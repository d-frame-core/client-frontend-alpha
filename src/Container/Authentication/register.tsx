import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
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
      const response = await axios.post(
        "http://localhost:3000/admin/register",
        { firstname, lastname, email, password }
      );

      console.log(response.data);

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.statusText);
          console.log(error.response.headers);
        }
      } else {
        // Handle other errors
        setErrorMessage("An error occurred while processing your request.");
      }
    }
  };

  return (
    <div>
      <h1>Let's create your account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            onChange={handleFirstNameChange}
            placeholder="First Name"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={handleLastNameChange}
            placeholder="Last Name"
          />
        </div>
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

export default Register;
