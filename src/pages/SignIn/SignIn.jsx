import "./SignIn.scss";
import { FaUser, FaLock } from "react-icons/fa";


const SignIn = () => {
  return (
    <div className="main-container">
      <div className="form-container signIn">
        <form action="">
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
