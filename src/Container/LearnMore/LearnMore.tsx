import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Box } from "@mui/material";
import "./learnmore.css";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
export default function LearnMore() {
  const [open, setOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalText, setModalText] = React.useState("");
  const [openFAQ, setOpenFAQ] = React.useState(false);
  const [modalTitleFAQ, setModalTitleFAQ] = React.useState("");
  const [modalTextFAQ, setModalTextFAQ] = React.useState([
    {
      title: "",
      text: "",
    },
  ]);
  const handleOnClick = (n: number) => {
    setOpen(true);
    if (n === 1) {
      setModalTitle("Why Advertise on D-Frame?");
      setModalText(
        "Ad-frame is an advertising platform built on D frame, to help clients target users better. Through advanced functionalities like real time target audience analytics with matching interests and a general willingness to watch ads from the users, we hope for significantly higher Click Through Rates (CTR) through AD-frame. This should drastically reduce advertising expenditure for the Clients and help reach the users directly with an ability to offer incentives directly to their wallets. Hence, reliance on Influencers and promotional expenditure can be reduced too. Influencing users not Influences can be a win-win for both client and users but cutting out the middle men."
      );
    } else if (n === 2) {
      setModalTitle("How does campaigns pricing work?");
      setModalText(
        " The Campaign Pricing is decided via the Data Valuation Engine (DVE). This is discussed in Detail in the White Paper. Through general demand-supply dynamics for certain types of Data determined via tags and actual Ad spent, the pricing is calculated. A base price of different data types is set and further calculations are processed. To be explored in the Alpha version. https://dframe.org/d-frame-white-paper-v1-1/ "
      );
    } else if (n === 3) {
      setModalTitle("What is the reach of our campaigns");
      setModalText(
        "Theoretically, the reach of the campaigns would be determined by the user base of D frame. Overtime, through our Projection frame idea of a Real Time Data Analytics Platform for Clients connecting users for their Healthcare, Travel, Finance data etc. we hope for higher quality and quantity of data & users. Ad-frame would benefit from overall user growth of the D frame data ecosystem."
      );
    } else if (n === 4) {
      setModalTitle("How do you pay for a campaign?");
      setModalText(
        "Payment for the Campaigns would be done via DFT tokens. This is one of the major utlity of the DFT tokens, to get access to user data, with their permission. At the Alpha Release stage, we may decide to offer support for high volume Crypto. tokens like Stablecoins, Bitcoin, Ethereum etc. This is subject to the release and would be decided then."
      );
    }
  };
  const handleFAQ = () => {
    setModalTextFAQ([
      {
        title: "Where is D frame Registered?",
        text: "The D frame Foundation is registered in the Hague, Netherlands.",
      },
      {
        title: "What is D frame?",
        text: "D-frame is a decentralised data ecosystem to help people monetise their personal data with privacy, support businesses with dynamic value laden data and encourage developers to build for re-imagining the data ecosystem. Using Blockchain based smart contracts for trust and a D-frame token for value generation & distribution, the ecosystem aspires to be a community driven sustainable effort.",
      },
      {
        title: "What is Ad frame?",
        text: "Ad-frame is an advertising platform built on D frame, to help clients target users better. Through advanced functionalities like real time target audience analytics with matching interests and a general willingness to watch ads from the users, we hope for significantly higher Click Through Rates (CTR) through AD-frame.",
      },
      {
        title: "How many users does D frame have?",
        text: "Currently, D frame is at the prototype stage. Further, we would plan for an Alpha release for 50,000 to 100,000 users. Long term, a user base of atleast 10 million plus users is targeted.",
      },
      {
        title: "What is the D frame Token?",
        text: "D-frame token is a utility token for the D-frame ecosystem. It is used for various purposes like incentivising users, rewarding developers, paying for data, paying for advertising, etc.",
      },
      {
        title:
          "How many Clients use D frame? How can Clients be successful on D frame?",
        text: "Currently, D frame is at the Prototype stage and we do not have active partnership with any client. However, we are pursuing partnerships with some of the largest Advertising firms in the world.",
      },
      {
        title: "How does D frame compare to other Advertising platforms?",
        text: " D frame shows an active data pool size of all the relevant users. Further, User's are willing to view advertisements for making passive income for sharing their data. Finally, we would be working on integration with different metaverse platforms.",
      },
      {
        title: "How much money do users make?",
        text: "Currently, we hope to atleast share 50% of the revenue generated directly with the users. Based on community feedback and stakeholder dynamics, these numbers will evolve.",
      },
    ]);
    setOpenFAQ(true);
    setModalTitleFAQ("FAQ");
  };
  return (
    <div>
      <>{Sidebar()}</>
      <div className="learnBox">
        <Box>
          <div className="learnTitle">Learn More</div>
          <div className="learnContent">
            <div className="learnItemContent" onClick={() => handleOnClick(1)}>
              Why Advertise on D-Frame?
            </div>
            <div className="learnItemContent" onClick={() => handleOnClick(2)}>
              How does campaigns pricing work?
            </div>
            <div className="learnItemContent" onClick={() => handleOnClick(3)}>
              What is the reach of our campaigns
            </div>
            <div className="learnItemContent" onClick={() => handleOnClick(4)}>
              How do you pay for a campaign?
            </div>
            <div className="learnItemContent" onClick={() => handleFAQ()}>
              FAQs
            </div>
          </div>
        </Box>
      </div>
      <React.Fragment>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="modalContainer">
            <ModalClose
              variant="outlined"
              sx={{
                position: "relative",
                left: "50%",
                top: "1%",
                boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                borderRadius: "50%",
              }}
            />
            <div className="modalTitle" id="modal-title">
              {modalTitle}
            </div>
            <hr />
            <div id="modal-desc" className="modalText">
              {modalText}
            </div>
          </div>
        </Modal>
      </React.Fragment>
      <React.Fragment>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={openFAQ}
          onClose={() => setOpenFAQ(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="modalContainerFAQ">
            <ModalClose
              variant="outlined"
              sx={{
                position: "relative",
                left: "45%",
                top: "0",
                boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                borderRadius: "50%",
              }}
            />
            <div className="modalTitle" id="modal-title">
              {modalTitleFAQ}
            </div>
            <hr />
            {/* <div className="modalSubHeading"> {modalFAQSubheading} </div>
            <div id="modal-desc" className="modalText">
              {modalTextFAQ}
            </div> */}
            {modalTextFAQ.map((item) => {
              return (
                <>
                  <div className="modalSubHeading"> {item.title} </div>
                  <div id="modal-desc" className="modalTextFAQ">
                    {item.text}
                  </div>
                </>
              );
            })}
          </div>
        </Modal>
      </React.Fragment>
    </div>
  );
}
