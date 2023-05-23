import "./header.css";
import user from "../../assets/user.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDisconnect = async () => {
    // Disconnect from the provider when the button is clicked
    if ((window as any).ethereum) {
      (window as any).ethereum.removeAllListeners();
    }
    // Disconnect from the provider.
    console.log("Disconnecting the provider");

    // navigate to home page
    navigate("/");
  };
  return (
    <div className="header">
      <img src={user} alt="" className="user1" />
      <div className="head1">Username</div>
      <div
        className="drp"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => handleClick(e as any)}
      >
        <KeyboardArrowDownIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose()}>
          <div onClick={() => handleDisconnect()}>Logout</div>
        </MenuItem>
      </Menu>
    </div>
  );
}
