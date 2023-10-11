import * as React from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  
export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the user data from local storage
    localStorage.removeItem("dframeAdmindata");
    navigate("/admin/login");
  };

  return (
    <Box
      style={{
        width: "93vw",
        background: "black",
        borderRadius: "40px",
        marginTop: "10px",
        marginLeft: "12px",
        padding: "10px",
      }}
    >
      <Box
        style={{
          padding: "8px",
          background: "white",
          borderRadius: "50px",
          width: "30px",
          marginLeft: "90vw",
          fontSize: "23px",
        }}
      >
        <span style={{ marginLeft: "8px", color: "#1f0691" }} onClick={handleLogout}>A</span>
      </Box>
    </Box>
  );
}
