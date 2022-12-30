import React from "react";
import "./help.css";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Help() {
  return (
    <div>
      <>
        <Sidebar />
      </>
      <div className="htext1">Help</div>
      <div className="htext2">Read More</div>
      <div className="htext3">Privacy Policy</div>
      <div className="htext4">Support</div>
      <div className="htext5">Terms of Service</div>
      <div className="htext6">FAQs</div>

      <button className="hrect1"></button>
      <button className="hrect2"></button>
      <button className="hrect3"></button>
      <button className="hrect4"></button>
      <button className="hrect5"></button>
      <div className="hrect6"></div>
    </div>
  );
}
