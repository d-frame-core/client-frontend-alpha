import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import "./ModalWithLink.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "0",
  p: 4,
  borderRadius: "1.1vh",
};

const BasicModal = (props: {
  name: string;
  paragraph: string;
  webLink: string;
  webLinkName: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div onClick={handleOpen}>{props.name}</div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div>
            <Typography id="modal-modal-title" variant="h6" component="div">
              {props.name}
            </Typography>
            <Divider />
          </div>
          <div>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, rowGap: "2vh" }}
              component="div"
            >
              {props.paragraph}
              <br />
            </Typography>
            <br />
            <Divider />
          </div>
          <div>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, rowGap: "2vh" }}
              component="div"
            >
              {props.webLinkName}
              <a href={props.webLink} target="_blank" rel="noreferrer">
                {props.webLink}
              </a>
              <br />
            </Typography>
            <br />
            {/* <Divider /> */}
          </div>
          <div>
            <button onClick={handleClose} className="btncl">
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default BasicModal;
