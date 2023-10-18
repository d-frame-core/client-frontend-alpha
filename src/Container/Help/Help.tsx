/** @format */

import React from 'react';
import './help.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { Box } from '@mui/material';
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
} from '@mui/material';
import { useEffect } from 'react';
import ModalWithLink from '../../components/ModalWithLink/ModalWithLink';
import BasicModal from '../../components/modal/BasicModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Drawer from '../../components/sidebar/Drawer';
export default function Help() {
  const [faqData, setFaqData] = React.useState<any[]>([]);
  const [helpdata, setHelpData] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
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
      .get('https://client-backend-402017.el.r.appspot.com/Help/userHelp/getAllHelp')
      .then((res) => {
        setHelpData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function fetchFAQs() {
    await axios
      .get('https://client-backend-402017.el.r.appspot.com/F&Q/userFAQ/getAllFAQ')
      .then((res) => {
        setFaqData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  React.useEffect(() => {
    const _token = localStorage.getItem('tokenForClient');
    if (!_token) {
      navigate('/');
    }
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

  // use effect to logout the user if wallet is disconnected
  const navigate = useNavigate();
  const handleWalletDisconnect = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected
      navigate('/');
    }
  };
  const checkMetamaskConnection = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected, redirect to root route
      navigate('/');
    }
  };
  useEffect(() => {
    checkMetamaskConnection();
    // Listen for changes in the selected address property
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleWalletDisconnect);
    }
  }, [(window as any).ethereum]);

  return (
    <div>
      <div className='smopen'>{Drawer(0)}</div>
      <>{Sidebar(0)}</>
      <div className='helpBox'>
        <Box>
          <div className='helpTitle'>Help</div>
          <div className='helpContent'>
            {helpdata.map((item) =>
              item.title != 'Privacy Policy' ? (
                <div className='helpItem'>
                  <BasicModal
                    name={item.title}
                    paragraph={item.text}
                  />
                </div>
              ) : (
                <div className='helpItem'>
                  <ModalWithLink
                    name={item.title}
                    paragraph={item.text}
                    webLink='https://dframe.org/privacy-policy/'
                    webLinkName=''
                  />
                </div>
              )
            )}
            <div
              onClick={handleClickOpen('paper')}
              className='helpItem'>
              FAQs
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby='scroll-dialog-title'
              aria-describedby='scroll-dialog-description'>
              <DialogTitle>FAQs</DialogTitle>
              <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                  id='scroll-dialog-description'
                  ref={descriptionElementRef}>
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
                <button
                  onClick={handleClose}
                  className='btncl1'>
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
