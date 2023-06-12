// RegisterForm.tsx

import React from "react";
import "./Register.css";
import logo from "../../assets/dframe.png";

const Register: React.FC = () => {
  return (
    <div className="container">
      <div className="headerRegistration">
        <img src={logo} width={80} alt="" />
        <h2>Welcome to D-Frame Client Registration Portal</h2>
      </div>
      <form className="form">
        <p className="title">Register</p>
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
          <input required placeholder="" type="email" className="input" />
          <span>Company Email</span>
          <button className="submitOTPVerify">Verify</button>
        </label>

        <label>
          <input required placeholder="" type="text" className="input" />
          <span>Contact Number</span>
          <button className="submitOTPVerify">Verify</button>
        </label>

        <button className="submitButtonRegistrationPage">Submit</button>
      </form>
    </div>
  );
};

export default Register;
