import React from "react";
import { useNavigate } from "react-router-dom";
import "./Connect.css";
import axios from "axios";
import { MyContext } from "../../components/context/Context";
const Connect = () => {
  const navigate = useNavigate();
  const { walletAddress, setWalletAddress, setId } =
    React.useContext(MyContext);
  const [isConnected, setIsConnected] = React.useState(false);
  async function connectWallet(): Promise<void> {
    try {
      const accounts: string[] = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];

      const response = await axios.post("http://localhost:3000/users/signup", {
        walletAddress: address,
      });

      console.log(response.data);

      setWalletAddress(address);
      if (response.data.message === "Address already exists. Login instead.") {
        navigate("/profile");
      } else {
        setIsConnected(true);
      }
    } catch (error) {
      console.error(error);
    }
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
          <p className="connectClientWallet__address">
            Connected to {walletAddress}
          </p>
          <p className="connectClientWallet__message">
            You are NOT registered with us. Please register to continue
          </p>
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
