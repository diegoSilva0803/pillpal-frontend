import "./Footer.scss";
import InstaIcon from "@mui/icons-material/Instagram";
import FaceBookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <InstaIcon /> <FaceBookIcon /> <TwitterIcon /> <LinkedInIcon />
      </div>
      <p>&copy; 2024 diegorsilva</p>
    </div>
  );
}
