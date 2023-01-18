import { Box, Container, Divider } from "@mui/material";
import React, { useState } from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import "./wallet.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
export default function Wallet() {
  const [walletdata, setwalletdata] = useState(data);

  const [senderAddress, setSenderAddress] = useState("");
  const [dftAmount, setDftAmount] = useState("");
  console.log(walletdata);
  const copyContent = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");
      alert("wallet address copied");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const handleSend = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    var timeCurrent =
      today.getHours() + "." + today.getMinutes() + "." + today.getSeconds();
    const formattedToday = dd + "/" + mm + "/" + yyyy;
    const newdata = {
      add: senderAddress,
      DFT: dftAmount,
      date: formattedToday,
      status: "Sent",
      time: timeCurrent,
    };
    userdata.dft = (parseInt(userdata.dft) - parseInt(dftAmount)).toString();
    console.log(userdata.dft);

    setwalletdata([...walletdata, newdata]);
    setSenderAddress("");
    setDftAmount("");
  };
  const userdata = {
    dft: "100 DFT",
    userad: "0x659664dd23937edee4f19391A5C355FdbD4c93e6",
  };
  return (
    <div>
      <>{Sidebar()}</>
      <div className="Wallet">
        <Box>
          <div className="head">Wallet</div>
          <Box className="transactions">
            <div className="transactionHeader">Transactions</div>
            <Divider />
            <Box className="transactionBox">
              {walletdata.map((item) => (
                <div className="transactionList">
                  {/* {data[0].add.slice(0, 5) + "..." + data[0].add.slice(22, 26)} */}
                  <p className="to">To :</p>
                  <p className="add">
                    {item.add.slice(0, 5) + "..." + item.add.slice(38, 42)}
                  </p>
                  <p className="date">On: {item.date}</p>
                  <p className="dft">{item.DFT} DFT</p>
                  <p className="time">{item.time}</p>
                  {item.status === "Sent" ? (
                    <p className="sent">{item.status}</p>
                  ) : (
                    <p className="status">{item.status}</p>
                  )}
                </div>
              ))}
              <p className="extraSpace"></p>
            </Box>
          </Box>
          <Box className="userWallet">
            <p>Wallet Balance {userdata.dft}</p>
            <div>
              <p className="userAddress">{userdata.userad.slice(0, 25)}....</p>
              <div
                title="Copy your wallet address"
                onClick={() => copyContent(userdata.userad)}
              >
                <ContentCopyIcon className="copyIcon" />
              </div>
            </div>
          </Box>
          <Box>
            <div className="transfertoken">
              <div className="transferTokenHeading">Transfer Tokens</div>
              <Divider />
              <div className="walletAddressInput">
                Wallet Address :
                <input
                  className="inputForm"
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  type="text"
                />
              </div>
              <div className="walletAddressInput">
                DFT Amount :
                <input
                  className="inputForm"
                  value={dftAmount}
                  onChange={(e) => setDftAmount(e.target.value)}
                  type="text"
                />
              </div>
              <button className="sendButton" onClick={handleSend}>
                Send
              </button>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
}
