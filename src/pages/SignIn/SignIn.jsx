import "./SignIn.scss";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const SignIn = () => {
    const navigate = useNavigate();
    const [signinData, setSigninData] = useState({
        username: "",
        password: "",
    })


const handleChange = (event) => {
    setSigninData({...signinData, [event.target.name]: event.target.value});
};

const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/user")
}



  return (
    <div className="main-container">
      <div className="form-container signIn">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="input-container">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon"/>
          </div>
          <div className="input-container">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon"/>
          </div>

          <div className="remember-forgot">
            <label htmlFor="">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password</a>
          </div>

          <button type="submit">Sign In</button>

          <div className="register-link">
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
