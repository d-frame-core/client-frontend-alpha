import React from "react";
import "./help.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Box } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  Modal,
} from "@mui/material";
import BasicModal from "../../components/modal/BasicModal";
export default function Help() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const Open1 = () => {
    window.open("Dframe.pdf");
  };
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
  const content = [
    {
      title: "Read More",
      text: "Details will be added in due time.",
    },
    {
      title: "Privacy Policy",
      text: "Here will be the Description for the Privacy policy.",
    },
    {
      title: "Support",
      text: "Here will be the Description for the Support.",
    },
    {
      title: "Terms of Service",
      text: "Details will be added in due time.",
    },
  ];
  return (
    <div>
      <>{Sidebar(0)}</>
      <div className="helpBox">
        <Box>
          <div className="helpTitle">Help</div>
          <div className="helpContent">
            <div className="helpItem">
              <BasicModal name={content[0].title} paragraph={content[0].text} />
            </div>
            <div className="helpItem">
              <BasicModal name={content[1].title} paragraph={content[1].text} />
            </div>
            <div className="helpItem">
              <BasicModal name={content[2].title} paragraph={content[2].text} />
            </div>
            <div className="helpItem">
              <BasicModal name={content[3].title} paragraph={content[3].text} />
            </div>
            <div onClick={handleClickOpen("paper")} className="helpItem">
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
