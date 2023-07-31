import * as React from "react";
import Box from "@mui/material/Box";
import axios from "axios";

export default function Sidebar() {
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
        <span style={{ marginLeft: "8px", color: "#1f0691" }}>A</span>
        <button
          onClick={() => {
            try {
              const res = axios.get("http://localhost:3000/admin/logout");
              console.log(res);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Logout
        </button>
      </Box>
    </Box>
  );
}
