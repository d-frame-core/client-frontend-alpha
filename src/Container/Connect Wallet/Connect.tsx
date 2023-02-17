import React from "react";
import { useNavigate } from "react-router-dom";
import "./Connect.css";
const Connect = () => {
  const navigate = useNavigate();
  const [address, setAddress] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(false);
  async function connectWallet(): Promise<void> {
    //to get around type checking
    (window as any).ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: string[]) => {
        setAddress(accounts[0]);
        setIsConnected(true);
      })
      .catch((error: any) => {
        alert(`Something went wrong: ${error}`);
      });
  }
  return (
    <div className="connectClientWallet">
      {!isConnected && (
        <div>
          <h1 className="connectClientWallet__heading">
            Connect Wallet To Login
          </h1>
          <button
            className="connectClientWallet__button"
            onClick={() => connectWallet()}
          >
            Connect to Metamask
          </button>
        </div>
      )}
      {isConnected && (
        <div>
          <p className="connectClientWallet__address">Connected to {address}</p>
          <button
            className="connectClientWallet__button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Connect;
