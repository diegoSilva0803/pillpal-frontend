import "./Home.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
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
