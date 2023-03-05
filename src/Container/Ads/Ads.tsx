import React, { useState } from "react";
import "./ads.css";
import Sidebar from "../../components/sidebar/Sidebar";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { ResponsiveContainer } from "recharts";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import data from "./data.json";
import CheckIcon from "@mui/icons-material/Check";
export default function Ads() {
  const [tick, setTick] = useState(false);
  return (
    <div>
      <>{Sidebar(5)}</>
      <div className="ads">
        <Box>
          <div className="adsBoxFlex">
            <div className="adsTitle">Ads</div>
            <div className="adsIconsBox">
              <button className="editIconAdsPage">
                <EditIcon /> Edit
              </button>

              <DeleteForeverOutlinedIcon
                className="delete"
                sx={{ fontSize: "6vh" }}
              />
            </div>
          </div>
          <div className="adsContent">
            <Box className="adsContentTitle">
              <div className="sno">S.No</div>
              <div className="campaignName">Campaign Name</div>
              <div className="tick">✓</div>
              <div className="campaignType">Campaign Type</div>
              <div className="adType">Ad Type</div>
              <div className="adBudget">Ad Budget/Day</div>
              <div className="timePeriod">Time Period</div>
            </Box>

            {data.map((item, index) => {
              return (
                <Box className="adsContentData" key={index}>
                  <div className="snoData">{item.sno}</div>
                  <div className="campaignNameData">{item.campaignName}</div>
                  <div className="tickData">
                    <div
                      className="tickDataIcon"
                      onClick={() => setTick(!tick)}
                    >
                      {tick === true ? <CheckIcon /> : <div> </div>}
                    </div>
                  </div>
                  <div className="campaignTypeData">{item.campaignType}</div>
                  <div className="adTypeData">{item.adType}</div>
                  <div className="adBudgetData">{item.adBudget}</div>
                  <div className="timePeriodData">{item.timePeriod}</div>
                </Box>
              );
            })}
            <div className="lastEntryAds"></div>
          </div>
        </Box>
      </div>
    </div>
  );
}
