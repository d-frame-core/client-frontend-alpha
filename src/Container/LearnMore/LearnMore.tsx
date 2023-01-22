import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Box } from "@mui/material";
import "./learnmore.css";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import BasicModal from "../../components/modal/BasicModal";
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
} from "@mui/material";
export default function LearnMore() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const [modalData, setModaData] = React.useState([
    {
      title: "Why Advertise on D-Frame?",
      text: "Ad-frame is an advertising platform built on D frame, to help clients target users better. Through advanced functionalities like real time target audience analytics with matching interests and a general willingness to watch ads from the users, we hope for significantly higher Click Through Rates (CTR) through AD-frame. This should drastically reduce advertising expenditure for the Clients and help reach the users directly with an ability to offer incentives directly to their wallets. Hence, reliance on Influencers and promotional expenditure can be reduced too. Influencing users not Influences can be a win-win for both client and users but cutting out the middle men.",
    },
    {
      title: "How does campaigns pricing work?",
      text: "The Campaign Pricing is decided via the Data Valuation Engine (DVE). This is discussed in Detail in the White Paper. Through general demand-supply dynamics for certain types of Data determined via tags and actual Ad spent, the pricing is calculated. A base price of different data types is set and further calculations are processed. To be explored in the Alpha version. https://dframe.org/d-frame-white-paper-v1-1/ ",
    },
    {
      title: "What is the reach of our campaigns",
      text: "Theoretically, the reach of the campaigns would be determined by the user base of D frame. Overtime, through our Projection frame idea of a Real Time Data Analytics Platform for Clients connecting users for their Healthcare, Travel, Finance data etc. we hope for higher quality and quantity of data & users. Ad-frame would benefit from overall user growth of the D frame data ecosystem.",
    },
    {
      title: "How do you pay for a campaign?",
      text: "Payment for the Campaigns would be done via DFT tokens. This is one of the major utlity of the DFT tokens, to get access to user data, with their permission. At the Alpha Release stage, we may decide to offer support for high volume Crypto. tokens like Stablecoins, Bitcoin, Ethereum etc. This is subject to the release and would be decided then.",
    },
  ]);

  return (
    <div>
      <>{Sidebar(0)}</>
      <div className="learnBox">
        <Box>
          <div className="learnTitle">Learn More</div>
          <div className="learnContent">
            <div className="learnItemContent">
              <BasicModal
                name={modalData[0].title}
                paragraph={modalData[0].text}
              />
            </div>
            <div className="learnItemContent">
              <BasicModal
                name={modalData[2].title}
                paragraph={modalData[2].text}
              />
            </div>
            <div className="learnItemContent">
              <BasicModal
                name={modalData[2].title}
                paragraph={modalData[2].text}
              />
            </div>
            <div className="learnItemContent">
              <BasicModal
                name={modalData[3].title}
                paragraph={modalData[3].text}
              />
            </div>
            <div
              className="learnItemContent"
              onClick={handleClickOpen("paper")}
            >
              FAQs
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle>FAQs</DialogTitle>
              <DialogContent dividers={scroll === "paper"}>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <strong>
                    1. Where is D Frame Registered?
                    <br />
                  </strong>
                  <Divider />
                  1. The D Frame Foundation is registered in the Hague,
                  Netherlands. <br />
                  <br />
                  <strong>
                    2. What is D Frame?
                    <br />
                  </strong>
                  <Divider />
                  2. D Frame is a decentralised data ecosystem to help people
                  monetise their personal data with privacy, support businesses
                  with dynamic value laden data and encourage developers to
                  build for re-imagining the data ecosystem. Using Blockchain
                  based smart contracts for trust and a D Frame token for value
                  generation & distribution, the ecosystem aspires to be a
                  community driven sustainable effort.
                  <br />
                  <br />
                  <strong>
                    3.What is Ad Frame? <br />
                  </strong>
                  <Divider />
                  3. Ad Frame is an advertising platform built on D Frame, to
                  help clients target users better. Through advanced
                  functionalities like real time target audience analytics with
                  matching interests and a general willingness to watch ads from
                  the users, we hope for significantly higher Click Through
                  Rates (CTR) through Ad Frame.
                  <br />
                  <br />
                  <strong>
                    4. How many users does D Frame have?
                    <br />
                  </strong>
                  <Divider />
                  4. Currently, D Frame is at the prototype stage. Further, we
                  would plan for an Alpha release for 50,000 to 100,000 users.
                  Long term, a user base of atleast 10 million plus users is
                  targeted.
                  <br />
                  <br />
                  <strong>
                    5. How many Clients use D Frame? How can Clients be
                    successful on D Frame? <br />
                  </strong>
                  <Divider />
                  5. Currently, D Frame is at the Prototype stage and we do not
                  have active partnership with any client. However, we are
                  pursuing partnerships with some of the largest Advertising
                  firms in the world.
                  <br />
                  <br />
                  <strong>
                    6. How does D Frame compare to other Advertising platforms?
                    <br />
                  </strong>
                  <Divider />
                  6. D Frame shows an active data pool size of all the relevant
                  users. Further, User's are willing to view advertisements for
                  making passive income for sharing their data. Finally, we
                  would be working on integration with different metaverse
                  platforms.
                  <br />
                  <br />
                  <strong>
                    7. How much money do users make?
                    <br />
                  </strong>
                  <Divider />
                  7.Currently, we hope to atleast share 50% of the revenue
                  generated directly with the users. Based on community feedback
                  and stakeholder dynamics, these numbers will evolve.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button onClick={handleClose} className="btncl1">
                  Close
                </button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      </div>
    </div>
  );
}
