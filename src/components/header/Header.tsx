import "./header.css";
import user from "../../assets/user.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Header() {
  return (
    <div className="header">
      <img src={user} alt="" className="user1" />
      <div className="head1">User Name</div>
      <div className="drp">
        <KeyboardArrowDownIcon />
      </div>
    </div>
  );
}
