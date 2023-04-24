// importing the packages
import { Box, Divider } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../components/context/Context";
import Sidebar from "../../components/sidebar/Sidebar";
import "./wallet.css";
import { Alert, Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import data from "./data.json";
import Web3 from "web3";
export default function Wallet() {
  const { walletAddress, walletBalance, setWalletBalance } =
    useContext(MyContext);
  const _walletAddress = walletAddress || localStorage.getItem("walletAddress");
  const [walletdata, setwalletdata] = useState(data);

  const [senderAddress, setSenderAddress] = useState("");
  const [dftAmount, setDftAmount] = useState("");
  const [transactionEvents, setTransactionEvents] = useState<any>([]);
  const [dftCA, setdftCA] = useState<any>("");

  const [contentCopiedSuccesfully, setContentCopiedSuccesfully] =
    useState(false);
  const copyContent = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard");
      setContentCopiedSuccesfully(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const handleSend = async () => {
    const web3 = new Web3((window as any).ethereum);

    // set the wallet address to query
    const _walletAddress =
      walletAddress || localStorage.getItem("walletAddress");
    // set the contract address of the MATIC token
    const dframeAddress = "0x0B6163c61D095b023EC3b52Cc77a9099f6231FCC";

    // set the ABI for the MATIC token contract
    const dframeABI = [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "Snapshot",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "snapshotId", type: "uint256" },
        ],
        name: "balanceOfAt",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "burnFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256",
          },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "snapshot",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "snapshotId", type: "uint256" },
        ],
        name: "totalSupplyAt",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    // get the MATIC token contract instance
    const dframeContract = new web3.eth.Contract(
      dframeABI as any,
      dframeAddress
    );
    const amount = web3.utils.toWei(dftAmount as any, "ether");
    await dframeContract.methods
      .transfer(senderAddress, amount)
      .send({ from: _walletAddress });

    getPastEvents();
    setSenderAddress("");
    setDftAmount("");
  };

  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setContentCopiedSuccesfully(false);
  };
  async function getPastEvents() {
    // initialize the Web3 provider
    const web3 = new Web3(
      "https://polygon-mainnet.g.alchemy.com/v2/Ygfvgz118Xr9j6j_F3ZIMFye6SNTgJr8"
    );
    // const web3 = new Web3((window as any).ethereum);

    // set the wallet address to query
    const _walletAddress =
      walletAddress || localStorage.getItem("walletAddress");
    // set the contract address of the MATIC token
    const dframeAddress = "0x0B6163c61D095b023EC3b52Cc77a9099f6231FCC";

    // set the ABI for the MATIC token contract
    const dframeABI = [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "Snapshot",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "snapshotId", type: "uint256" },
        ],
        name: "balanceOfAt",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "burnFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256",
          },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "snapshot",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "snapshotId", type: "uint256" },
        ],
        name: "totalSupplyAt",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    // get the MATIC token contract instance
    const dframeContract = new web3.eth.Contract(
      dframeABI as any,
      dframeAddress
    );
    setdftCA(dframeContract);
    //  get the balance of DFRAME tokens for the specified wallet address
    const balance = await dframeContract.methods
      .balanceOf(_walletAddress)
      .call();
    const balanceInEth = web3.utils.fromWei(balance, "ether");
    console.log(
      "DFRAME balance of wallet address " +
        _walletAddress +
        " is " +
        balanceInEth
    );
    const balanceInKFormat =
      ((balanceInEth as any) / 1000).toString() +
      "." +
      ((balanceInEth as any) % 1000).toString() +
      "K";
    setWalletBalance(balanceInKFormat);
    // get the transfer events of the MATIC token for the specified wallet address
    const transferFromEvents = await dframeContract.getPastEvents("Transfer", {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        from: _walletAddress,
      },
    });
    const eventFromPromises = transferFromEvents.map(async (event) => {
      const block = await web3.eth.getBlock(event.blockNumber);
      return {
        ...event,
        timestamp: block.timestamp,
      };
    });
    const eventsFromWithTimestamps = await Promise.all(eventFromPromises);
    const transferToEvents = await dframeContract.getPastEvents("Transfer", {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        to: _walletAddress,
      },
    });
    const eventToPromises = transferToEvents.map(async (event) => {
      const block = await web3.eth.getBlock(event.blockNumber);
      return {
        ...event,
        timestamp: block.timestamp,
      };
    });
    const eventsToWithTimestamps = await Promise.all(eventToPromises);
    const allEvents = [...eventsFromWithTimestamps, ...eventsToWithTimestamps];
    const sortedEvents = allEvents.sort(
      (a, b) => (b as any).timestamp - (a as any).timestamp
    );
    setTransactionEvents(sortedEvents);
  }
  useEffect(() => {
    getPastEvents();
  }, []);
  useEffect(() => {
    console.log(transactionEvents);
  }, [transactionEvents]);
  return (
    <div>
      <>{Sidebar(2)}</>
      <div className="Wallet">
        <Box>
          <div className="head">Wallet</div>
          <Box className="transactions">
            <div className="transactionHeader">Transactions</div>
            <Divider />
            <Box className="transactionBox">
              {transactionEvents.map((event: any) => {
                if (
                  event.returnValues.from.toString().toLowerCase() ===
                  _walletAddress.toString().toLowerCase()
                ) {
                  console.log("sent");
                  return (
                    <div
                      className="transactionList"
                      onClick={() => {
                        // redirect to the transaction details page
                        window.open(
                          "https://polygonscan.com/tx/" + event.transactionHash,
                          "_blank"
                        );
                      }}
                    >
                      <div className="transactionListTop">
                        <div className="transactionListTopLeft">
                          <p className="transactionListTopLeftText">
                            To: {event.returnValues.to.slice(0, 7)}....
                            {event.returnValues.to.slice(-7)}
                          </p>
                        </div>
                        <div className="transactionListTopRight">
                          <p className="transactionListTopRightText">
                            On:{" "}
                            {new Date(event.timestamp * 1000)
                              .toLocaleString()
                              .slice(0, 9)}
                          </p>
                        </div>
                      </div>
                      <div className="transactionListBottom">
                        <div className="transactionListBottomLeft">
                          <p className="transactionListBottomLeftText">
                            Amount:{" "}
                            {(Web3.utils.fromWei(
                              event.returnValues.value,
                              "ether"
                            ) as any) >= 1000
                              ? (Web3.utils.fromWei(
                                  event.returnValues.value,
                                  "ether"
                                ) as any) /
                                  1000 +
                                "K"
                              : Web3.utils.fromWei(
                                  event.returnValues.value,
                                  "ether"
                                )}{" "}
                            DFT
                          </p>
                        </div>
                        <div className="transactionListBottomCenter">
                          <p className="transactionListBottomCenterText">
                            At:{" "}
                            {new Date(event.timestamp * 1000)
                              .toLocaleString()
                              .slice(11)}
                          </p>
                        </div>
                        <div className="transactionListBottomRight">
                          <p className="transactionListBottomRightTextSent">
                            Sent
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  console.log("received");
                  return (
                    <div
                      className="transactionList"
                      onClick={() => {
                        // redirect to the transaction details page
                        window.open(
                          "https://polygonscan.com/tx/" + event.transactionHash,
                          "_blank"
                        );
                      }}
                    >
                      <div className="transactionListTop">
                        <div className="transactionListTopLeft">
                          <p className="transactionListTopLeftText">
                            From: {event.returnValues.from.slice(0, 7)}....
                            {event.returnValues.from.slice(-6)}
                          </p>
                        </div>
                        <div className="transactionListTopRight">
                          <p className="transactionListTopRightText">
                            On:{" "}
                            {new Date(event.timestamp * 1000)
                              .toLocaleString()
                              .slice(0, 9)}
                          </p>
                        </div>
                      </div>
                      <div className="transactionListBottom">
                        <div className="transactionListBottomLeft">
                          <p className="transactionListBottomLeftText">
                            Amount:{" "}
                            {(Web3.utils.fromWei(
                              event.returnValues.value,
                              "ether"
                            ) as any) >= 1000
                              ? (Web3.utils.fromWei(
                                  event.returnValues.value,
                                  "ether"
                                ) as any) /
                                  1000 +
                                "K"
                              : Web3.utils.fromWei(
                                  event.returnValues.value,
                                  "ether"
                                )}{" "}
                            DFT
                          </p>
                        </div>
                        <div className="transactionListBottomCenter">
                          <p className="transactionListBottomCenterText">
                            At:{" "}
                            {new Date(event.timestamp * 1000)
                              .toLocaleString()
                              .slice(11)}
                          </p>
                        </div>
                        <div className="transactionListBottomRight">
                          <p className="transactionListBottomRightTextreceived">
                            Received
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <p className="extraSpace"></p>
            </Box>
          </Box>
          <Box className="userWallet">
            <p>Wallet Balance : {walletBalance} DFT</p>
            {/* {walletAddress} */}
            <div>
              <p className="userAddress">{_walletAddress.slice(0, 20)}....</p>
              <div
                title="Copy your wallet address"
                onClick={() => copyContent(_walletAddress)}
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
                  type="walletPageInput"
                />
              </div>
              <div className="walletAddressInput">
                DFT Amount :
                <input
                  className="inputForm"
                  value={dftAmount}
                  onChange={(e) => setDftAmount(e.target.value)}
                  type="walletPageInput"
                />
              </div>
              <button className="sendButton" onClick={handleSend}>
                Send
              </button>
            </div>
          </Box>
        </Box>
      </div>
      {contentCopiedSuccesfully && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={contentCopiedSuccesfully}
          autoHideDuration={6000}
          onClose={() => {
            setContentCopiedSuccesfully(false);
          }}
        >
          <Alert
            onClose={handleToastClose}
            severity="info"
            sx={{ width: "25vw", height: "5vh", fontSize: "1rem" }}
          >
            Wallet Address Copied to Clipboard
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
