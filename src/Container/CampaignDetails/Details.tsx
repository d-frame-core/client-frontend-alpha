import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Details.css";
import MyLineChart from "../../components/LineChart/Line";
const Details = () => {
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];
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
