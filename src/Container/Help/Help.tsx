import React from "react";
import "./help.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Box } from "@mui/material";

export default function Help() {
  const content = [
    "Read More",
    "Privacy Policy",
    "Terms of Services",
    "FAQs",
    "Support",
  ];
  return (
    <div>
      <>{Sidebar()}</>
      <div className="helpBox">
        <Box>
          <div className="helpTitle">Help</div>
          <div className="helpContent">
            {content.map((item, index) => {
              return (
                <div className="helpItem" key={index}>
                  <div className="helpItemContent">{item}</div>
                </div>
              );
            })}
          </div>
        </Box>
      </div>
    </div>
  );
}
