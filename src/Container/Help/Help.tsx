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
import ModalWithLink from "../../components/ModalWithLink/ModalWithLink";
import BasicModal from "../../components/modal/BasicModal";
import axios from "axios";
export default function Help() {
  const [faqData, setFaqData] = React.useState<any[]>([]);
  const [helpdata, setHelpData] = React.useState<any[]>([]);
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

  async function fetchDataFromBackend() {
    await axios
      .get("http://localhost:3000/Help")
      .then((res) => {
        setHelpData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function fetchFAQs() {
    await axios
      .get("http://localhost:3000/F&Q/faq/")
      .then((res) => {
        setFaqData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  React.useEffect(() => {
    fetchDataFromBackend();
  }, []);
  React.useEffect(() => {
    // console.log(helpdata);
  }, [helpdata]);
  React.useEffect(() => {
    fetchFAQs();
  }, []);
  React.useEffect(() => {
    // console.log(faqData);
  }, [faqData]);
  return (
    <div>
      <>{Sidebar(0)}</>
      <div className="helpBox">
        <Box>
          <div className="helpTitle">Help</div>
          <div className="helpContent">
            {helpdata.map((item) =>
              item.title != "Privacy Policy" ? (
                <div className="helpItem">
                  <BasicModal name={item.title} paragraph={item.text} />
                </div>
              ) : (
                <div className="helpItem">
                  <ModalWithLink
                    name={item.title}
                    paragraph={item.text}
                    webLink="https://dframe.org/privacy-policy/"
                    webLinkName="Privacy Policy"
                  />
                </div>
              )
            )}
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
                  {faqData.map((item) => {
                    return (
                      <div>
                        <strong>
                          {item.question}
                          <br />
                        </strong>
                        <Divider />
                        {item.answer}
                        <br />
                        <br />
                      </div>
                    );
                  })}
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
