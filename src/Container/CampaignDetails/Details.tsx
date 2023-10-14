import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Details.css";
import MyLineChart from "../../components/LineChart/Line";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Details = () => {
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

  // use effect to logout the user if wallet is disconnected
  const navigate = useNavigate();
  const handleWalletDisconnect = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected
      navigate("/");
    }
  };
  const checkMetamaskConnection = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected, redirect to root route
      navigate("/");
    }
  };
  useEffect(() => {
    const _token =localStorage.getItem("tokenForClient");
    if(!_token){
      navigate("/");
    }
    checkMetamaskConnection();
    // Listen for changes in the selected address property
    if ((window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", handleWalletDisconnect);
    }
  }, [(window as any).ethereum]);

  return (
    <div>
      <>{Sidebar(4)}</>
      <div className="detailsOuterBox">
        <div className="detailsPageHeading">Campaign Details</div>
        <div className="detailsPageChart">
          <MyLineChart />
        </div>
        <div className="detailsPageTagsDiv">
          <div className="detailsPageTags">Tag1</div>
          <div className="detailsPageTags">Tag2</div>
          <div className="detailsPageTags">Tag3</div>
          <div className="detailsPageTags">Tag4</div>
          <div className="detailsPageTags">Tag5</div>
          <div className="detailsPageTags">Tag6</div>
          <div className="detailsPageTags">Tag7</div>
        </div>
        <div className="detailsPageDetailsDiv">
          <div className="detailsPageDetailsLeft">
            <div className="detailsPageCampaignsDetails">
              <div className="detailsPageCampaignsDetailsHeading">
                Campaign Name
              </div>
              <div className="detailsPageCampaignsDetailsColon">:</div>
              <div className="detailsPageCampaignsDetailsData">Campaign 1</div>
            </div>
            <div className="detailsPageCampaignsDetails">
              <div className="detailsPageCampaignsDetailsHeading">
                Campaign Type
              </div>
              <div className="detailsPageCampaignsDetailsColon">:</div>
              <div className="detailsPageCampaignsDetailsData">Engaagement</div>
            </div>
            <div className="detailsPageCampaignsDetails">
              <div className="detailsPageCampaignsDetailsHeading">Ad Name</div>
              <div className="detailsPageCampaignsDetailsColon">:</div>
              <div className="detailsPageCampaignsDetailsData">Ad 1</div>
            </div>
            <div className="detailsPageCampaignsDetails">
              <div className="detailsPageCampaignsDetailsHeading">
                Ad Content
              </div>
              <div className="detailsPageCampaignsDetailsColon">:</div>
              <div className="detailsPageCampaignsDetailsData">
                Ad Content upto 50 characters
              </div>
            </div>
          </div>
          <div className="detailsPageDetailsRight">
            <div className="detailsPageCampaignsDetails">
              <div className="detailsPageCampaignsDetailsHeading">
                Bid Amount
              </div>
              <div className="detailsPageCampaignsDetailsColon">:</div>
              <div className="detailsPageCampaignsDetailsData">23 DFT</div>
            </div>
            <div className="detailsPageCampaignsDetails">
              <div className="detailsPageCampaignsDetailsHeading">
                Users Assigned
              </div>
              <div className="detailsPageCampaignsDetailsColon">:</div>
              <div className="detailsPageCampaignsDetailsData">400</div>
            </div>
            <div className="detailsPageCampaignsDetails">
              <div className="detailsPageCampaignsDetailsHeading">
                Users Reached
              </div>
              <div className="detailsPageCampaignsDetailsColon">:</div>
              <div className="detailsPageCampaignsDetailsData">300 users</div>
            </div>
            <div className="detailsPageCampaignsDetails">
              <div className="detailsPageCampaignsDetailsHeading">
                Users Clicked
              </div>
              <div className="detailsPageCampaignsDetailsColon">:</div>
              <div className="detailsPageCampaignsDetailsData">40</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
