import "./NavBar.scss";
import logo from "../../images/pillpal-logo-cap.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useState } from "react";

export default function NavBar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <Link to="/home">
          <img className="logo" src={logo} alt="" />
        </Link>
        <div className="hiddenLinks">
          <Link to="/home">Home</Link>
          <Link to="/user">My Meds</Link>
          <Link to="/signIn">Sign Out</Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/home">Home</Link>
        <Link to="/user">My Meds</Link>
        <Link to="/signIn">Sign Out</Link>
        <button onClick={toggleNavbar}>
          {" "}
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}
