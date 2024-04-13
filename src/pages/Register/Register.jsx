import "./Register.scss";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";

import React from "react";

function SignUp() {
  return (
    <div className="main-container">
      <div className="form-container register">
        <form action="">
          <h1>Registration</h1>
          <div className="input-container">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-container">
            <input type="email" placeholder="Email" required />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-container">
            <input type="tel" placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
            <FaPhone className="icon" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label htmlFor="">
              <input type="checkbox" />I agree to the terms & conditions
            </label>
          </div>

          <button type="submit">Register</button>

          <div className="register-link">
            <p>
              Already have an account? <a href="/signin">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
