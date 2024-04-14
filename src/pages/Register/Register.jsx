import "./Register.scss";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Access form data from state: formData.username, formData.email, etc.

    console.log("Form data:", formData);

    // You can now send the data to your backend server using fetch or axios
    // ... (implement logic to send data to backend)
    navigate("/home")
  };

  return (
    <div className="main-container">
      <div className="form-container register">
        <form onSubmit={handleSubmit}>
          <h1>Registration</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-container">
            <input
              type="tel"
              placeholder="xxx-xxx-xxxx"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <FaPhone className="icon" />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label htmlFor="">
              <input type="checkbox" required/>I agree to the terms & conditions
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

export default Register;
