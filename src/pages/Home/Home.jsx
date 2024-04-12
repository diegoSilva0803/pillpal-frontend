import "./Home.scss";
import { Link } from "react-router-dom";
import backgroundImg from "../../images/pillpal-bgImg.jpg";

function Home() {
  return (
    <div className="home">
      <div
        className="headerContainer"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <h1 className="app-name">PILLPAL</h1>
        <p>YOUR HEALTHY REMINDER</p>
        <Link to="/user">
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
