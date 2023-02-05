import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    window.ethereum.on("connect", async () => {
      const accounts = await window.ethereum.enable();
      setAddress(accounts[0]);
    });
    window.ethereum.on("disconnect", () => {
      setAddress(null);
    });
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.enable();
    setAddress(accounts[0]);
    await window.ethereum.connect();
  };

  const disconnectWallet = () => {
    setAddress(null);
    window.ethereum.disconnect();
  };
  return (
    <div className="connectDiv">
      {address ? (
        <div>
          <p className="title">Connected Wallet Address: {address}</p>
          <button
            className="connectButton1"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      ) : (
        <div>
          <p className="title">Not Connected to MetaMask</p>
          <div className="btn-div">
            <button onClick={connectWallet} className="connectButton">
              Connect Wallet
            </button>
          </div>
        </div>
      )}
      {address && <div className="btn-div"></div>}
    </div>
  );
}

export default App;
